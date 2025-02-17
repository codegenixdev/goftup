import { useDateFormatters } from "@/hooks/useDateFormatters";

import { Message } from "@/types/message";

type MessageProps = {
	message: Message;
	viewMode: "admin" | "client";
};

const MessageBubble = ({ message, viewMode }: MessageProps) => {
	const { formatTime } = useDateFormatters();
	const { isFromAgent } = message;

	const getAlignment = () => {
		if (viewMode === "admin") {
			return isFromAgent ? "ms-auto" : "me-auto";
		}
		return isFromAgent ? "me-auto" : "ms-auto";
	};

	const getFlexDirection = () => {
		const shouldReverse =
			(viewMode === "admin" && !isFromAgent) ||
			(viewMode === "client" && isFromAgent);

		return shouldReverse ? "flex-row-reverse" : "";
	};

	const getBackgroundColor = () => {
		if (isFromAgent) {
			return "bg-background";
		}
		return viewMode === "admin" ? "bg-primary" : "bg-widget-primary";
	};

	return (
		<div
			className={`
        flex 
        items-center 
        gap-2 
        w-fit 
        ${getAlignment()} 
        ${getFlexDirection()}
      `}
		>
			<span className="text-xs text-muted-foreground">
				{formatTime(message.timestamp)}
			</span>
			<div
				className={`
          mb-2 
          p-2 
          rounded-lg 
          max-w-52 
          break-words 
          bg-foreground/10
          ${getBackgroundColor()}
        `}
			>
				<p className={`text-sm ${!isFromAgent && "text-gray-50"}`}>
					{message.text}
				</p>
			</div>
		</div>
	);
};

export { MessageBubble };
