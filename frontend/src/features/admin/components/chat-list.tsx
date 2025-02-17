import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/types/client";

import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

type ChatListProps = {
	clients: Map<string, Client>;
	selectedClient: string | null;
	onClientSelect: (clientId: string) => void;
	onRemoveClient: (clientId: string) => void;
};

const ChatList = ({
	clients,
	selectedClient,
	onClientSelect,
	onRemoveClient,
}: ChatListProps) => {
	const { t } = useTranslation();

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div className="flex flex-col p-4 h-full">
			<h2 className="text-xl font-bold mb-4">{t("chats")}</h2>
			<div className="flex-1 relative overflow-hidden">
				<ScrollArea className="h-[calc(100vh-124px)] absolute inset-0">
					{clients.size === 0 ? (
						<>
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
								{t("noChats")}
							</div>
						</>
					) : (
						Array.from(clients.values()).map((client, index) => (
							<div className="w-full" key={client.id}>
								<div
									className={`p-2 rounded-lg cursor-pointer flex items-center justify-between gap-3 ${
										selectedClient === client.id
											? "bg-primary/10"
											: "hover:bg-primary/5"
									}`}
									onClick={() => {
										onClientSelect(client.id);
									}}
								>
									<div className="flex items-center gap-3 w-full overflow-hidden">
										<Avatar className="flex-shrink-0">
											<AvatarFallback>
												{getInitials(client.name)}
											</AvatarFallback>
										</Avatar>
										<div className="overflow-hidden">
											<p className="font-medium truncate max-w-[150px]">
												{client.name}
											</p>
										</div>
									</div>

									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-8 flex-shrink-0"
												onClick={(e) => {
													e.stopPropagation();
												}}
											>
												<X className="size-4" />
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
												<AlertDialogDescription>
													{t("deleteChatWarning")}
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
												<AlertDialogAction
													onClick={(e) => {
														e.stopPropagation();
														onRemoveClient(client.id);
													}}
												>
													{t("continue")}
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
								{index < Array.from(clients.values()).length - 1 && (
									<Separator className="my-2" />
								)}
							</div>
						))
					)}
				</ScrollArea>
			</div>
		</div>
	);
};

export { ChatList };
