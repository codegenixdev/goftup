const SOCKET_EVENTS = {
	REGISTER_AGENT: "register-agent",
	EXISTING_CONVERSATIONS: "existing-conversations",
	NEW_USER_MESSAGE: "new-user-message",
	USER_CONNECTED: "user-connected",
	USER_DISCONNECTED: "user-disconnected",
	AGENT_MESSAGE: "agent-message",
	REGISTER_USER: "register-user",
	MESSAGE: "message",
	GET_CLIENT_CONVERSATIONS: "get-client-conversations",
	USER_MESSAGE: "user-message",
	REMOVE_USER: "remove-user",
	USER_REMOVED: "user-removed",
} as const;

export { SOCKET_EVENTS };
