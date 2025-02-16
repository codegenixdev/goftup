import { Chat } from "@/components/chat";
import { NameForm } from "@/components/name-form";
import { Button } from "@/components/ui/button";
import { useClientStore } from "@/useClientStore";
import { MessageCircleMore } from "lucide-react";
import { useTranslation } from "react-i18next";

const ClientPanel = () => {
  const { t } = useTranslation();
  const { isWidgetOpen, updateIsWidgetOpen, name } = useClientStore();

  const handleWidgetClick = () => {
    updateIsWidgetOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isWidgetOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[350px] h-[500px] flex flex-col overflow-hidden">
          {!name ? <NameForm /> : <Chat />}
        </div>
      ) : (
        <Button
          className="rounded-full size-14 shadow-lg bg-widget-primary hover:bg-widget-primary/90"
          onClick={handleWidgetClick}
          aria-label={t("openChat")}
        >
          <MessageCircleMore className="size-6" />
        </Button>
      )}
    </div>
  );
};

export { ClientPanel };
