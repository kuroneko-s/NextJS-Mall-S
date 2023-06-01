import { server } from "@lib/common";
import React, { useState, useEffect, useRef } from "react";

// * Socket.io
import SocketIOClient, { Manager, io } from "socket.io-client";

// * MUI
/* 
import { Stack, TextField, Alert, Button, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"; 
*/

interface IMessage {
  user: string;
  message: string;
}

const Chatting: React.FC = () => {
  const [sendMessage, setSendMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMessage[]>([]);

  const username = "sendUser";

  useEffect(() => {
    const socket = io("ws://localhost:3000/api/chat");
    console.log("socket - ", socket);

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("msg", (message: IMessage) => {
      console.log("receive - ", message);
      setChat((cur) => [...cur, message]);
    });

    socket.emit("msg", (message: IMessage) => {
      console.log("receive - ", message);
      setChat((cur) => [...cur, message]);
    });

    // socket disconnect on component unmount if exists
    if (socket)
      return () => {
        socket.disconnect();
      };
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendMessage(event.target.value);
  };

  const enterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitSendMessage();
    }
  };

  const submitSendMessage = async () => {
    if (sendMessage) {
      const message: IMessage = {
        user: username,
        message: sendMessage,
      };

      const response = await fetch(`${server}/api/socketio`, {
        method: "POST",
        body: JSON.stringify({ message }),
      }).then((res) => res.json());
      console.log(response);

      setSendMessage("");
    }
  };

  return (
    <>
      <div>
        <p>채팅 기능은 로그인된 유저에게만 제공됩니다.</p>
        {/* 채팅 메시지 출력 영역 */}
        <div>
          <div>
            {chat.length ? (
              chat.map((chat, index) => (
                <div className="chat-message" key={index}>
                  {chat.user === username ? "Me" : chat.user} : {chat.message}
                </div>
              ))
            ) : (
              <div className="alert-message">No Chat Messages</div>
            )}
          </div>
        </div>
        {/* 채팅 메시지 입력 영역 */}
        <div onKeyDown={enterKeyPress}>
          <input type="text" value={sendMessage} onChange={onChangeHandler} />
          <button type="submit" onClick={submitSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatting;
