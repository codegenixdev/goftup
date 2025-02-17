import { useSocketContext } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { Chat } from "@/features/widget/components/chat";
import { Header } from "@/features/widget/components/header";
import { NameForm } from "@/features/widget/components/name-form";
import { useClientStore } from "@/features/widget/hooks/useClientStore";
import { SOCKET_EVENTS } from "@/lib/constants";
import { MessageCircleMore } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useOnClickOutside } from "usehooks-ts";

const Widget = () => {
  const { t } = useTranslation();
  const { socket } = useSocketContext();

  const { isWidgetOpen, updateIsWidgetOpen, name, updateName, resetClientId } =
    useClientStore();

  const widgetRef = useRef<HTMLDivElement | null>(null);

  // @ts-ignore
  useOnClickOutside(widgetRef, () => {
    if (isWidgetOpen) {
      updateIsWidgetOpen(false);
    }
  });

  useEffect(() => {
    if (!socket) return;

    const handleUserRemoved = () => {
      updateIsWidgetOpen(false);
      updateName("");
      resetClientId();
    };

    socket.on(SOCKET_EVENTS.USER_REMOVED, handleUserRemoved);

    return () => {
      socket.off(SOCKET_EVENTS.USER_REMOVED);
    };
  }, [socket]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isWidgetOpen) {
        updateIsWidgetOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isWidgetOpen, updateIsWidgetOpen]);

  const handleWidgetClick = () => {
    updateIsWidgetOpen(true);
  };

  return (
    <div
      className={`fixed ${
        isWidgetOpen
          ? "bottom-0 start-0 md:bottom-4 md:start-4"
          : "bottom-4 start-4"
      } z-50`}
    >
      {isWidgetOpen ? (
        <div
          className="bg-card rounded-lg shadow-lg w-screen h-screen md:w-[350px] md:h-[500px] flex flex-col overflow-hidden"
          ref={widgetRef}
        >
          <Header />
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

export { Widget };
