import { cn } from "@/lib/utils";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ComponentProps } from "react";

type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> & {
	online?: boolean;
};

const Avatar = ({ className, online, ...props }: AvatarProps) => {
	return (
		<div className="relative">
			<AvatarPrimitive.Root
				data-slot="avatar"
				className={cn(
					"relative flex size-8 shrink-0 overflow-hidden rounded-full",
					className
				)}
				{...props}
			/>
			{online && (
				<div className="absolute top-[2px] right-[2px]">
					<span className="relative flex">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-500" />
						<span className="relative inline-flex rounded-full ring-2 ring-white bg-green-500 size-2" />
					</span>
				</div>
			)}
		</div>
	);
};

type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image>;

const AvatarImage = ({ className, ...props }: AvatarImageProps) => {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
};

type AvatarFallbackProps = ComponentProps<typeof AvatarPrimitive.Fallback>;

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-muted flex size-full items-center justify-center rounded-full",
				className
			)}
			{...props}
		/>
	);
};

export { Avatar, AvatarImage, AvatarFallback };
