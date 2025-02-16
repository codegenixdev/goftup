import { toPersianNumbers } from "@/lib/utils";
import { useLayoutStore } from "@/useLayoutStore";
import { format } from "date-fns";
import { faIR, enUS } from "date-fns/locale";

const useDateFormatters = () => {
  const { language } = useLayoutStore();

  const formatTime = (date: Date) => {
    const formattedTime = format(date, "hh:mm a", {
      locale: language === "fa" ? faIR : enUS,
    });

    if (language === "fa") {
      const [time, meridiem] = formattedTime.split(" ");
      const persianTime = toPersianNumbers(time);
      return `${persianTime} ${meridiem}`;
    }

    return formattedTime;
  };

  return { formatTime };
};

export { useDateFormatters };
