import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClientStore } from "@/features/widget/hooks/useClientStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const schema = z.object({
  name: z.string().max(255).min(1),
});
type Schema = z.infer<typeof schema>;
const defaultValues: Schema = {
  name: "",
};

const NameForm = () => {
  const { t } = useTranslation();
  const { updateName } = useClientStore();

  const [autoAnimateRef] = useAutoAnimate();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    updateName(data.name);
  };

  return (
    <div className="p-4 flex flex-col gap-4" ref={autoAnimateRef}>
      <p className="text-sm">{t("enterName")}</p>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Input<Schema>
            className="flex-1"
            name="name"
            placeholder={t("namePlaceholder")}
            widgetTheme
            autoFocus
          />
          <Button
            className="bg-widget-primary hover:bg-widget-primary/90"
            type="submit"
          >
            {t("startChat")}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export { NameForm };
