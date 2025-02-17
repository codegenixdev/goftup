import { Client } from "@/types/client";
import { Conversation } from "@/types/conversation";

type ExistingConversationsPayload = {
  conversations: Conversation[];
  clients: Client[];
};

export { type ExistingConversationsPayload };
