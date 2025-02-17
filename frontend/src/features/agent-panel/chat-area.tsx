import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/message-bubble";
import { Conversation, Message } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const schema = z.object({
  message: z.string().max(1000).min(1).trim(),
});

type Schema = z.infer<typeof schema>;
const defaultValues: Schema = {
  message: "",
};

type ChatAreaProps = {
  selectedClient: string | null;
  conversation?: Conversation;
  onSendMessage: (message: string) => void;
};

const ChatArea = ({
  selectedClient,
  conversation,
  onSendMessage,
}: ChatAreaProps) => {
  const { t } = useTranslation();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [localMessages, setLocalMessages] = useState<Message[]>(
    conversation?.messages || []
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  useEffect(() => {
    if (conversation?.messages) {
      setLocalMessages(conversation.messages);
    }
  }, [conversation]);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const isClose =
      target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setIsNearBottom(isClose);
  };

  useEffect(() => {
    if (isNearBottom) {
      scrollToBottom();
    }
  }, [localMessages]);

  useEffect(() => {
    scrollToBottom("auto");
  }, [selectedClient]);

  if (!selectedClient) {
    return (
      <div className="flex-1 h-full flex items-center justify-center text-muted-foreground text-center">
        <p>{t("selectChat")}</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const tempMessage: Message = {
      id: Date.now().toString(),
      text: data.message,
      clientId: selectedClient!,
      timestamp: new Date(),
      isFromAgent: true,
    };
    setLocalMessages((prev) => [...prev, tempMessage]);
    onSendMessage(data.message);
    form.setValue("message", "");
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-hidden relative"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <ScrollArea
          ref={scrollAreaRef}
          className="h-full p-4"
          onScroll={handleScroll}
        >
          {localMessages.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">
                {t("noMessagesYet")}
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {localMessages.map((msg: Message) => (
                <MessageBubble message={msg} viewMode="admin" key={msg.id} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {!isNearBottom && (
          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-4 right-4 rounded-full shadow-lg opacity-90 hover:opacity-100"
            onClick={() => scrollToBottom()}
          >
            ↓
          </Button>
        )}
      </div>

      <FormProvider {...form}>
        <form
          className="p-4 border-t flex gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Input<Schema>
            className="flex-1 h-12"
            name="message"
            placeholder={`${t("typeAMessage")}...`}
          />
          <Button className="h-12" type="submit">
            <div className="flex items-center gap-2">
              {t("send")}
              <SendHorizontal className="rtl:rotate-180" />
            </div>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export { ChatArea };
