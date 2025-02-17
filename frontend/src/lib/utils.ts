import { type ClassValue, clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

const toPersianNumbers = (text: string) => {
	const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
	return text.replace(/[0-9]/g, (d) => persianNumbers[Number(d)]);
};

const generateClientId = () => `client-${nanoid(10)}`;

export { cn, toPersianNumbers, generateClientId };
