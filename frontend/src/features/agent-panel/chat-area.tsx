import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/features/agent-panel/message-bubble";
import { MessageInput } from "@/features/agent-panel/message-input";
import { Conversation, Message } from "@/types";
import { useEffect, useRef, useState } from "react";

type ChatAreaProps = {
  selectedClient: string | null;
  conversation?: Conversation;
  onSendMessage: (message: string) => void;
};

const ChatArea = ({
  selectedClient,
  conversation,
  onSendMessage,
}: ChatAreaProps) => {
  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>(
    conversation?.messages || []
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update local messages when conversation changes
  useEffect(() => {
    if (conversation?.messages) {
      setLocalMessages(conversation.messages);
    }
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Create a temporary message for immediate display
    const tempMessage: Message = {
      id: Date.now().toString(),
      text: message,
      clientId: selectedClient!,
      timestamp: new Date(),
      isFromAgent: true,
    };

    // Update local messages immediately
    setLocalMessages((prev) => [...prev, tempMessage]);

    // Send message to server
    onSendMessage(message);
    setMessage("");
  };

  if (!selectedClient) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select a client to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="p-3">
        <h3 className="font-semibold">
          Chat with {conversation?.clientName || "Client"}
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {localMessages.map((msg: Message) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <MessageInput value={message} onChange={setMessage} onSend={handleSend} />
    </div>
  );
};

export { ChatArea };
