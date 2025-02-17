import { useSocketContext } from "@/hooks/useSocketContext";

import { SOCKET_EVENTS } from "@/lib/constants";
import { Client } from "@/types/client";
import { Conversation } from "@/types/conversation";
import { ExistingConversationsPayload } from "@/types/existingConversationPayload";
import { Message } from "@/types/message";
import { NewUserMessagePayload } from "@/types/newUserMessagePayload";
import { UserConnectedPayload } from "@/types/userConnectedPayload";
import { UserDisconnectedPayload } from "@/types/userDisconnectedPayload";

import { useEffect, useState } from "react";

const useSocket = () => {
	const { socket } = useSocketContext();
	const [conversations, setConversations] = useState<Map<string, Conversation>>(
		new Map()
	);
	const [clients, setClients] = useState<Map<string, Client>>(new Map());
	const [lastDisconnectedClient, setLastDisconnectedClient] = useState<
		string | null
	>(null);

	useEffect(() => {
		if (!socket) return;

		socket.emit(SOCKET_EVENTS.REGISTER_AGENT);

		const handleExistingConversations = ({
			conversations: convs,
			clients: clnts,
		}: ExistingConversationsPayload) => {
			const conversationsMap = new Map(
				convs.map((conv) => [conv.clientId, conv])
			);
			const clientsMap = new Map(clnts.map((client) => [client.id, client]));
			setConversations(conversationsMap);
			setClients(clientsMap);
		};

		const handleNewUserMessage = ({ conversation }: NewUserMessagePayload) => {
			setConversations((prev) => {
				const newMap = new Map(prev);
				const existingConversation = newMap.get(conversation.clientId);
				if (existingConversation) {
					const updatedMessages = [
						...new Set(
							[...existingConversation.messages, ...conversation.messages].map(
								(msg) => JSON.stringify(msg)
							)
						),
					].map((msg) => JSON.parse(msg) as Message);

					newMap.set(conversation.clientId, {
						...conversation,
						messages: updatedMessages,
					});
				} else {
					newMap.set(conversation.clientId, conversation);
				}
				return newMap;
			});
		};

		const handleUserConnected = ({
			clientId,
			name,
			conversation,
		}: UserConnectedPayload) => {
			setClients((prev) =>
				new Map(prev).set(clientId, { id: clientId, name, socketId: "" })
			);
			setConversations((prev) => new Map(prev).set(clientId, conversation));
		};

		const handleUserDisconnected = ({ clientId }: UserDisconnectedPayload) => {
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
			setLastDisconnectedClient(clientId);
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

	const sendMessage = (clientId: string, text: string): void => {
		if (!socket) return;
		socket.emit(SOCKET_EVENTS.AGENT_MESSAGE, { clientId, text });
	};

	return {
		conversations,
		clients,
		sendMessage,
		lastDisconnectedClient,
	};
};

export { useSocket };
