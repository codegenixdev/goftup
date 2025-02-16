import { useSocket } from "@/components/socket-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types";
import { useStore } from "@/useStore";
import { MessageCircleMore, SendHorizontal } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next"; // Add this import

const ClientPanel = () => {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [clientId] = useState(
    () => `client-${Math.random().toString(36).substr(2, 9)}`
  );
  const { direction } = useStore();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  // Add ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

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
      <h2 className="text-lg font-semibold">{t("welcome")}</h2>
      <p className="text-sm text-gray-500">{t("enterName")}</p>
      <form onSubmit={handleNameSubmit} className="flex flex-col gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("namePlaceholder")}
          required
          className="flex-1"
        />
        <Button
          className="bg-widget-primary hover:bg-widget-primary/90"
          type="submit"
        >
          {t("startChat")}
        </Button>
      </form>
    </div>
  );

  const renderChat = () => (
    <>
      <div className="p-4 border-b flex justify-between items-center bg-widget-primary">
        <div className="flex items-center gap-2">
          <Avatar className="size-10" online>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-gray-50">
              {t("onlineSupport")}
            </h2>
            {/* <p className="text-xs text-gray-500">{name}</p> */}
            <p className="text-xs text-gray-100">
              {t("WeAreAnsweringYourQuestions")}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0"
          aria-label={t("close")}
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
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2 items-center">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t("messagePlaceholder")}
            className="flex-1 text-sm h-12"
          />
          <Button
            className="bg-widget-primary hover:bg-widget-primary/90 rounded-full size-12"
            size="sm"
            onClick={sendMessage}
          >
            <SendHorizontal
              className={`size-6 ${direction === "rtl" ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[350px] h-[500px] flex flex-col overflow-hidden">
          {!isNameSubmitted ? renderNameForm() : renderChat()}
        </div>
      ) : (
        <Button
          className="rounded-full size-14 shadow-lg bg-widget-primary hover:bg-widget-primary/90"
          onClick={() => setIsOpen(true)}
          aria-label={t("openChat")}
        >
          <MessageCircleMore className="size-6" />
        </Button>
      )}
    </div>
  );
};

export { ClientPanel };
