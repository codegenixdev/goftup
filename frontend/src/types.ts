interface Message {
  id: string;
  text: string;
  clientId: string;
  timestamp: Date;
  isFromAgent: boolean;
}

interface Conversation {
  clientId: string;
  messages: Message[];
  unread: number;
}

interface Client {
  id: string;
  socketId: string;
  name: string;
}

export { type Message, type Conversation, type Client };
