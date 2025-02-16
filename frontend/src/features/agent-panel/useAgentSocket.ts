import { useSocket } from "@/components/socket-context";
import { useState, useEffect } from "react";
import { Client, Conversation } from "@/types/types";
import { SOCKET_EVENTS } from "@/features/agent-panel/constants";

const useAgentSocket = () => {
  const { socket } = useSocket();
  const [conversations, setConversations] = useState<Map<string, Conversation>>(
    new Map()
  );
  const [clients, setClients] = useState<Map<string, Client>>(new Map());

  useEffect(() => {
    if (!socket) return;

    socket.emit(SOCKET_EVENTS.REGISTER_AGENT);

    const handleExistingConversations = ({
      conversations: convs,
      clients: clnts,
    }) => {
      const conversationsMap = new Map(
        convs.map((conv) => [conv.clientId, conv])
      );
      const clientsMap = new Map(clnts.map((client) => [client.id, client]));
      setConversations(conversationsMap);
      setClients(clientsMap);
    };

    const handleNewUserMessage = ({ message, conversation }) => {
      setConversations((prev) =>
        new Map(prev).set(conversation.clientId, conversation)
      );
    };

    const handleUserConnected = ({ clientId, name, conversation }) => {
      setClients((prev) =>
        new Map(prev).set(clientId, { id: clientId, name, socketId: "" })
      );
      setConversations((prev) => new Map(prev).set(clientId, conversation));
    };

    const handleUserDisconnected = ({ clientId }) => {
      setClients((prev) => {
        const newMap = new Map(prev);
        newMap.delete(clientId);
        return newMap;
      });
      setConversations((prev) => {
        const newMap = new Map(prev);
        newMap.delete(clientId);
        return newMap;
      });
    };

    socket.on(
      SOCKET_EVENTS.EXISTING_CONVERSATIONS,
      handleExistingConversations
    );
    socket.on(SOCKET_EVENTS.NEW_USER_MESSAGE, handleNewUserMessage);
    socket.on(SOCKET_EVENTS.USER_CONNECTED, handleUserConnected);
    socket.on(SOCKET_EVENTS.USER_DISCONNECTED, handleUserDisconnected);

    return () => {
      socket.off(SOCKET_EVENTS.EXISTING_CONVERSATIONS);
      socket.off(SOCKET_EVENTS.NEW_USER_MESSAGE);
      socket.off(SOCKET_EVENTS.USER_CONNECTED);
      socket.off(SOCKET_EVENTS.USER_DISCONNECTED);
    };
  }, [socket]);

  const sendMessage = (clientId: string, text: string) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.AGENT_MESSAGE, { clientId, text });
  };

  return {
    conversations,
    clients,
    sendMessage,
  };
};

export { useAgentSocket };
