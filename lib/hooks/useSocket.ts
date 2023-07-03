import { websocketServer } from "@lib/common";
import { GlobalContext } from "pages/_app";
import { useContext, useEffect } from "react";
import SocketIOClient from "socket.io-client";

export default function useSocket() {
  const { websocket, setWebSocket } = useContext(GlobalContext);

  // socket client connect
  useEffect(() => {
    if (websocket === undefined) {
      // @ts-ignore
      const socket = SocketIOClient.connect(websocketServer, {
        path: "/api/socketio",
      });

      setWebSocket && setWebSocket(socket);

      // 연결
      socket.on("connect", () => {
        console.log("SOCKET CONNECTED!", socket.id);
      });
    }
  }, [setWebSocket, websocket]);
}
