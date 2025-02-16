import { ScrollArea } from "@/components/ui/scroll-area";
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

  return (
    <div className="w-1/4 border-r p-4">
      <h2 className="text-xl font-bold mb-4">{t("activeChats")}</h2>
      <ScrollArea className="h-[calc(100vh-100px)]">
        {Array.from(clients.values()).map((client) => (
          <div
            key={client.id}
            className={`p-2 cursor-pointer ${
              selectedClient === client.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            onClick={() => onClientSelect(client.id)}
          >
            <p className="font-medium">{client.name}</p>
            <p className="text-sm text-gray-500">ID: {client.id}</p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export { ClientsList };
