import { useGlobalStore } from "@/hooks/useGlobalStore";

import { toPersianNumbers } from "@/lib/utils";

import { format } from "date-fns";
import { enUS, faIR } from "date-fns/locale";

const useDateFormatters = () => {
	const { language } = useGlobalStore();

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
