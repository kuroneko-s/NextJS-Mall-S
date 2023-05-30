import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "./chat.d";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method === "POST") {
    console.log("listen");
    const message = {
      user: "server user",
      message: "test msg",
    };

    // 브로드캐스트
    if (res.socket.server.io) {
      console.log("broadcase");
      res.socket.server.io.emit("with-binary", message);
    }

    res.status(201).json(message);
  }
}
