import { useSocketContext } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { Chat } from "@/features/admin/components/chat";
import { ChatList } from "@/features/admin/components/chat-list";
import { SOCKET_EVENTS } from "@/lib/constants";
import { useSocket } from "@/hooks/useSocket";
import { usePageTitle } from "@/hooks/usePageTitle";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Page = () => {
  usePageTitle("adminTitle");

  const { t } = useTranslation();
  const { socket } = useSocketContext();
  const { conversations, clients, lastDisconnectedClient } = useSocket();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  useEffect(() => {
    if (lastDisconnectedClient && lastDisconnectedClient === selectedClient) {
      setSelectedClient(null);
    }
  }, [lastDisconnectedClient, selectedClient]);

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
        } w-full md:w-96 shadow-2xl rounded-lg bg-card`}
      >
        <ChatList
          clients={clients}
          selectedClient={selectedClient}
          onClientSelect={setSelectedClient}
        />
      </div>

      <div
        className={`${
          !selectedClient ? "hidden md:block" : "block"
        } w-full shadow-2xl rounded-lg h-full bg-card`}
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
        <Chat
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

export { Page as Admin };
