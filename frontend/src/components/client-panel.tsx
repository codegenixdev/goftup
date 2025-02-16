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
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  useEffect(() => {
    if (!socket || !isNameSubmitted) return;

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
  }, [socket, clientId, name, isNameSubmitted]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsNameSubmitted(true);
    }
  };

  const sendMessage = () => {
    if (!socket || !message.trim()) return;

    socket.emit("user-message", {
      clientId,
      text: message,
    });

    setMessage("");
  };

  const renderNameForm = () => (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Welcome to Chat Support</h2>
      <p className="text-sm text-gray-500">
        Please enter your name to continue
      </p>
      <form onSubmit={handleNameSubmit} className="flex flex-col gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="flex-1"
        />
        <Button type="submit">Start Chat</Button>
      </form>
    </div>
  );

  const renderChat = () => (
    <>
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold">Chat with Support</h2>
          <p className="text-xs text-gray-500">{name}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0"
        >
          ✕
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded-lg ${
              msg.isFromAgent ? "bg-gray-100 mr-auto" : "bg-blue-100 ml-auto"
            }`}
            style={{ maxWidth: "80%" }}
          >
            <p className="text-sm">{msg.text}</p>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 text-sm"
          />
          <Button size="sm" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[350px] h-[500px] flex flex-col">
          {!isNameSubmitted ? renderNameForm() : renderChat()}
        </div>
      ) : (
        <Button
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          💬
        </Button>
      )}
    </div>
  );
};

export { ClientPanel };
