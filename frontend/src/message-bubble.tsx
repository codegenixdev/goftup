import { Message } from "@/types/types";
import { useDateFormatters } from "@/useDateFormatters";

type MessageProps = {
  message: Message;
  viewMode: "admin" | "client";
};

const MessageBubble = ({ message, viewMode }: MessageProps) => {
  const { formatTime } = useDateFormatters();

  const alignmentMap = {
    admin: message.isFromAgent ? "ms-auto" : "me-auto",
    client: message.isFromAgent ? "me-auto" : "ms-auto",
  };

  return (
    <div className={`flex items-center gap-2 w-fit ${alignmentMap[viewMode]}`}>
      <span className="text-xs text-muted-foreground">
        {formatTime(message.timestamp)}
      </span>
      <div
        className={`mb-2 p-2 rounded-lg max-w-52 break-words ${
          message.isFromAgent
            ? "bg-background"
            : `${viewMode === "admin" ? "bg-primary" : "bg-widget-primary"}`
        }`}
      >
        <p className={`text-sm ${message.isFromAgent ? "" : "text-gray-50"}`}>
          {message.text}
        </p>
      </div>
    </div>
  );
};

export { MessageBubble };
