const SOCKET_EVENTS = {
  REGISTER_AGENT: "register-agent",
  EXISTING_CONVERSATIONS: "existing-conversations",
  NEW_USER_MESSAGE: "new-user-message",
  USER_CONNECTED: "user-connected",
  USER_DISCONNECTED: "user-disconnected",
  AGENT_MESSAGE: "agent-message",
} as const;

export { SOCKET_EVENTS };
