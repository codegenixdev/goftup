import { useSocket } from "@/components/socket-context";
import { ChatArea } from "@/features/agent-panel/chat-area";
import { ClientsList } from "@/features/agent-panel/client-list";
import { SOCKET_EVENTS } from "@/features/agent-panel/constants";
import { useAgentSocket } from "@/features/agent-panel/useAgentSocket";
import { useState } from "react";

const AgentPanel = () => {
  const { socket } = useSocket();
  const { conversations, clients } = useAgentSocket();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const handleSendMessage = (message: string) => {
    if (!socket || !selectedClient) return;
    socket.emit(SOCKET_EVENTS.AGENT_MESSAGE, {
      clientId: selectedClient,
      text: message,
    });
  };

  return (
    <div className="flex h-full">
      <ClientsList
        clients={clients}
        selectedClient={selectedClient}
        onClientSelect={setSelectedClient}
      />
      <ChatArea
        selectedClient={selectedClient}
        conversation={
          selectedClient ? conversations.get(selectedClient) : undefined
        }
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export { AgentPanel };
