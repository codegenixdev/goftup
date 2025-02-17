import { useSocket } from "@/components/socket-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SOCKET_EVENTS } from "@/features/agent-panel/constants";
import { useClientStore } from "@/features/widget/hooks/useClientStore";
import { MessageBubble } from "@/message-bubble";
import { Message } from "@/types/types";
import { useLayoutStore } from "@/useLayoutStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const schema = z.object({
  message: z.string().max(1000).min(1),
});
type Schema = z.infer<typeof schema>;
const defaultValues: Schema = { message: "" };

const Chat = () => {
  const { t } = useTranslation();
  const { direction } = useLayoutStore();
  const { socket } = useSocket();

  const {
    clientId,
    isWidgetOpen,
    updateIsWidgetOpen,
    name,
    messages,
    updateMessages,
    addMessage,
  } = useClientStore();

  const form = useForm<Schema>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isWidgetOpen) {
        updateIsWidgetOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isWidgetOpen]);

  useEffect(() => {
    if (!socket || !name) return;

    socket.emit(SOCKET_EVENTS.REGISTER_USER, { clientId, name });

    socket.on(SOCKET_EVENTS.MESSAGE, (msg: Message) => {
      addMessage(msg);
    });

    socket.emit(
      SOCKET_EVENTS.GET_CLIENT_CONVERSATIONS,
      { clientId },
      (response: any) => {
        if (response.success) {
          updateMessages(response.data.messages);
        }
      }
    );

    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE);
    };
  }, [socket, clientId, name]);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (!socket || !data.message.trim()) return;

    socket.emit(SOCKET_EVENTS.USER_MESSAGE, {
      clientId,
      text: data.message,
    });

    form.setValue("message", "");
  };

  return (
    <>
      <ScrollArea className="flex-1 p-4 overflow-y-auto md:max-h-[400px] relative">
        {messages.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500 text-sm">{t("noMessagesYet")}</span>
          </div>
        ) : (
          messages.map((msg: Message) => (
            <MessageBubble message={msg} viewMode="client" key={msg.id} />
          ))
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t">
        <FormProvider {...form}>
          <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <Input<Schema>
              className="text-sm h-12"
              widgetTheme
              name="message"
              placeholder={t("messagePlaceholder")}
            />
            <Button
              className="bg-widget-primary hover:bg-widget-primary/90 rounded-full size-12"
              type="submit"
            >
              <SendHorizontal
                className={`size-6 ${direction === "rtl" ? "rotate-180" : ""}`}
              />
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export { Chat };
