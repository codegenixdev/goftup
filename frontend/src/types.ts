type Message = {
  id: string;
  text: string;
  clientId: string;
  timestamp: Date;
  isFromAgent: boolean;
};

type Conversation = {
  clientId: string;
  messages: Message[];
  unread: number;
};

type Client = {
  id: string;
  socketId: string;
  name: string;
};

export { type Message, type Conversation, type Client };
