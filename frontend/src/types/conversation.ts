import { Message } from "@/types/message";

type Conversation = {
	clientId: string;
	messages: Message[];
	unread: number;
};

export { type Conversation };
