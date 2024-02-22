import React, { useState, useEffect } from "react";

import socketIo from "socket.io-client";
import Message from "./components/message.component";
import "./App.css";

const socket = socketIo.connect("http://localhost:4000");

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      text: messageText,
    });
    setMessageText("");
  };
  return (
    <div className="chat__container">
      <header className="chat__heading">
        <h1>Open Chat</h1>
      </header>

      <div className="chat__messages">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} />
        ))}
      </div>
      <div className="chat__input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="type message"
        />
        <button onClick={sendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default App;
