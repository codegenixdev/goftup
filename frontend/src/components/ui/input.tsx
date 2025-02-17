import { cn } from "@/lib/utils";

import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type InputProps<T extends FieldValues> = {
	name: Path<T>;
	label?: string;
	widgetTheme?: boolean;
} & ComponentProps<"input">;

const Input = <T extends FieldValues>({
	className,
	type,
	name,
	label,
	widgetTheme,
	...props
}: InputProps<T>) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<T>();

	const error = errors[name];

	return (
		<div className="space-y-2 w-full">
			{label && (
				<label
					htmlFor={name}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{label}
				</label>
			)}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<div className="relative">
						<input
							{...field}
							type={type}
							id={name}
							aria-invalid={!!error}
							aria-describedby={`${name}-error`}
							data-slot="input"
							className={cn(
								"border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4",
								widgetTheme
									? "focus-visible:outline-widget-primary focus-visible:ring-widget-primary/20 dark:focus-visible:outline-widget-primary dark:focus-visible:ring-widget-primary/20"
									: "",
								className
							)}
							{...props}
						/>
					</div>
				)}
			/>
			{error && (
				<p
					className="text-sm text-destructive"
					id={`${name}-error`}
					role="alert"
				>
					{error.message?.toString()}
				</p>
			)}
		</div>
	);
};

export { Input };
