import { useSocket } from "@/components/socket-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SOCKET_EVENTS } from "@/features/agent-panel/constants";
import { Message } from "@/types";
import { useClientStore } from "@/useClientStore";
import { useLayoutStore } from "@/useLayoutStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const schema = z.object({
  message: z.string().max(1000),
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
      updateMessages([...messages, msg]);
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
      <div className="p-4 border-b flex justify-between items-center bg-widget-primary">
        <div className="flex items-center gap-2">
          <Avatar className="size-10" online>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-gray-50">
              {t("onlineSupport")}
            </h2>
            <p className="text-xs text-gray-100">
              {t("WeAreAnsweringYourQuestions")}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateIsWidgetOpen(false)}
          className="h-8 w-8 p-0"
          aria-label={t("close")}
        >
          <X />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded-lg ${
              msg.isFromAgent ? "bg-gray-100 mr-auto" : "bg-blue-100 ml-auto"
            }`}
            style={{ maxWidth: "80%" }}
          >
            <p className="text-sm">{msg.text}</p>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t">
        <FormProvider {...form}>
          <form
            className="flex gap-2 items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Input<Schema>
              name="message"
              placeholder={t("messagePlaceholder")}
              className="flex-1 text-sm h-12"
            />
            <Button
              className="bg-widget-primary hover:bg-widget-primary/90 rounded-full size-12"
              size="sm"
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
