import { Conversation } from "@/types/conversation";

type UserConnectedPayload = {
	clientId: string;
	name: string;
	conversation: Conversation;
};

export { type UserConnectedPayload };
