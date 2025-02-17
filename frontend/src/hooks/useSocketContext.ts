import { SocketContext } from "@/components/socket-context";

import { useContext } from "react";

const useSocketContext = () => useContext(SocketContext);

export { useSocketContext };
