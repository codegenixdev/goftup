import { useSocket } from "@/components/socket-context";
import { ChatArea } from "@/features/agent-panel/chat-area";
import { ClientsList } from "@/features/agent-panel/client-list";
import { SOCKET_EVENTS } from "@/features/agent-panel/constants";
import { useAgentSocket } from "@/features/agent-panel/useAgentSocket";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const AgentPanel = () => {
  const { t } = useTranslation();
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
    <div className="flex h-full gap-4">
      <div
        className={`${
          selectedClient ? "hidden md:block" : "block"
        } w-full md:w-96 shadow-2xl rounded-lg`}
      >
        <ClientsList
          clients={clients}
          selectedClient={selectedClient}
          onClientSelect={setSelectedClient}
        />
      </div>

      <div
        className={`${
          !selectedClient ? "hidden md:block" : "block"
        } w-full shadow-2xl rounded-lg h-full`}
      >
        {selectedClient && (
          <div className="h-14 border-b flex items-center justify-between px-4">
            <span className="font-medium">{t("chat")}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedClient(null)}
              className="size-8"
            >
              <X className="size-4" />
            </Button>
          </div>
        )}
        <ChatArea
          selectedClient={selectedClient}
          conversation={
            selectedClient ? conversations.get(selectedClient) : undefined
          }
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export { AgentPanel };
