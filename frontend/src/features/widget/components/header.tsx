import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useClientStore } from "@/features/widget/hooks/useClientStore";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { t } = useTranslation();
  const { updateIsWidgetOpen } = useClientStore();

  const handleClose = () => {
    updateIsWidgetOpen(false);
  };

  return (
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
        onClick={handleClose}
        variant="ghost"
        className="rounded-full hover:bg-gray-700/50 transition-colors size-10"
        aria-label={t("close")}
      >
        <X className="size-5 text-gray-50" />
      </Button>
    </div>
  );
};

export { Header };
