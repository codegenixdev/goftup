import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
	socket: Socket | null;
	isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
});

type SocketProviderProps = {
	children: ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
		});

		newSocket.on("connect", () => {
			setIsConnected(true);
			// eslint-disable-next-line no-console
			console.log("Socket connected");
		});

		newSocket.on("disconnect", () => {
			setIsConnected(false);
			// eslint-disable-next-line no-console
			console.log("Socket disconnected");
		});

		newSocket.on("connect_error", (error) => {
			// eslint-disable-next-line no-console
			console.error("Connection error:", error);
		});

		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	);
};

export { SocketProvider, SocketContext };
