import { useSocket } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types";
import { useEffect, useState } from "react";

const ClientPanel = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [clientId] = useState(
    () => `client-${Math.random().toString(36).substr(2, 9)}`
  );
  const [name] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    if (!socket) return;

    socket.emit("register-user", { clientId, name });

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.emit("get-client-conversations", { clientId }, (response: any) => {
      if (response.success) {
        setMessages(response.data.messages);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [socket, clientId, name]);

  const sendMessage = () => {
    if (!socket || !message.trim()) return;

    socket.emit("user-message", {
      clientId,
      text: message,
    });

    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Chat as {name}</h2>
        <p className="text-sm text-gray-500">ID: {clientId}</p>
      </div>

      <ScrollArea className="flex-1 mb-4">
        {messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${
              msg.isFromAgent ? "bg-gray-100" : "bg-blue-100 ml-auto"
            }`}
            style={{ maxWidth: "70%" }}
          >
            <p>{msg.text}</p>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export { ClientPanel };
