import { Message } from "@/types/types";

type MessageBubbleProps = {
  message: Message;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div
      className={`mb-2 p-2 rounded ${
        message.isFromAgent ? "bg-blue-100 ml-auto" : "bg-gray-100"
      }`}
      style={{ maxWidth: "70%" }}
    >
      <p>{message.text}</p>
      <span className="text-xs text-gray-500">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
};

export { MessageBubble };
