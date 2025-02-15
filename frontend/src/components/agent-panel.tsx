import { useSocket } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Client, Conversation, Message } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AgentPanel = () => {
  const { t } = useTranslation();

  const { socket } = useSocket();
  const [conversations, setConversations] = useState<Map<string, Conversation>>(
    new Map()
  );
  const [clients, setClients] = useState<Map<string, Client>>(new Map());
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.emit("register-agent");

    socket.on(
      "existing-conversations",
      ({ conversations: convs, clients: clnts }) => {
        const conversationsMap = new Map(
          convs.map((conv) => [conv.clientId, conv])
        );
        const clientsMap = new Map(clnts.map((client) => [client.id, client]));
        setConversations(conversationsMap);
        setClients(clientsMap);
      }
    );

    socket.on("new-user-message", ({ message, conversation }) => {
      setConversations((prev) =>
        new Map(prev).set(conversation.clientId, conversation)
      );
    });

    socket.on("user-connected", ({ clientId, name, conversation }) => {
      setClients((prev) =>
        new Map(prev).set(clientId, { id: clientId, name, socketId: "" })
      );
      setConversations((prev) => new Map(prev).set(clientId, conversation));
    });

    socket.on("user-disconnected", ({ clientId }) => {
      setClients((prev) => {
        const newMap = new Map(prev);
        newMap.delete(clientId);
        return newMap;
      });
    });

    return () => {
      socket.off("existing-conversations");
      socket.off("new-user-message");
      socket.off("user-connected");
      socket.off("user-disconnected");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !selectedClient || !message.trim()) return;

    socket.emit("agent-message", {
      clientId: selectedClient,
      text: message,
    });

    setMessage("");
  };

  return (
    <div className="flex h-screen">
      {/* Clients List */}
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl font-bold mb-4">{t("activeChats")}</h2>
        <ScrollArea className="h-[calc(100vh-100px)]">
          {Array.from(clients.values()).map((client) => (
            <div
              key={client.id}
              className={`p-2 cursor-pointer ${
                selectedClient === client.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedClient(client.id)}
            >
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-gray-500">ID: {client.id}</p>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedClient ? (
          <>
            <div className="flex-1 p-4 overflow-auto">
              {conversations
                .get(selectedClient)
                ?.messages.map((msg: Message) => (
                  <div
                    key={msg.id}
                    className={`mb-2 p-2 rounded ${
                      msg.isFromAgent ? "bg-blue-100 ml-auto" : "bg-gray-100"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a client to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { AgentPanel };
