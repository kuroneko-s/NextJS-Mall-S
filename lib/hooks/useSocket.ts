import { websocketServer } from "@lib/common";
import { GlobalContext } from "pages/_app";
import { useContext, useEffect } from "react";
import SocketIOClient from "socket.io-client";

export default function useSocket() {
  const { setWebSocket } = useContext(GlobalContext);

  // socket client connect
  useEffect(() => {
    // @ts-ignore
    const socket = SocketIOClient.connect(websocketServer, {
      path: "/api/socketio",
    });

    setWebSocket && setWebSocket(socket);

    // 연결
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });
  }, [setWebSocket]);

  useContext;
}
