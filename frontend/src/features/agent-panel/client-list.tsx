import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/types";
import { useTranslation } from "react-i18next";

interface ClientsListProps {
  clients: Map<string, Client>;
  selectedClient: string | null;
  onClientSelect: (clientId: string) => void;
}

const ClientsList = ({
  clients,
  selectedClient,
  onClientSelect,
}: ClientsListProps) => {
  const { t } = useTranslation();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">{t("activeChats")}</h2>
      <ScrollArea className="h-[calc(100vh-100px)]">
        {Array.from(clients.values()).map((client, index) => (
          <div key={client.id}>
            <div
              className={`p-2 rounded-lg cursor-pointer flex items-center gap-3 ${
                selectedClient === client.id
                  ? "bg-primary/10"
                  : "hover:bg-primary/5"
              }`}
              onClick={() => onClientSelect(client.id)}
            >
              <Avatar>
                <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{client.name}</p>
              </div>
            </div>
            {index < Array.from(clients.values()).length - 1 && (
              <Separator className="my-2" />
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export { ClientsList };
