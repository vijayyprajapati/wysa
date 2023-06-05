import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./chat.module.css";
import ChatBubble from "../../components/ChatBubble/chatbubble";
import { chats } from "../../Data/chat";
import NavBar from "../../components/NavBar/navbar";
import { getLocalStorage } from "../../utils/localStorage";
import Theme from "../../components/Theme/theme";

const Chat = () => {
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    const login = getLocalStorage("login-state");
    if (!login) navigate("/login", { replace: true });
  };

  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState(chats);
  const [open, setOpen] = useState(false);
  const theme = getLocalStorage("theme");

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatData]);

  if (theme) {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "") return;
    const data = {
      text: message,
      type: "user",
    };
    setChatData([...chatData, data]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = {
          image: reader.result,
          type: "image",
        };
        setChatData([...chatData, data]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={Styles.chatpage}>
      {open && <Theme setOpen={setOpen} />}
      <NavBar open={open} setOpen={setOpen} />
      <div className={Styles.chatbox} ref={chatBoxRef}>
        {chatData.map((value, ind) => {
          return (
            <ChatBubble
              ind={ind}
              key={ind}
              type={value.type}
              value={value.text}
              image={value.image}
            />
          );
        })}
      </div>
      <div className={Styles.typer}>
  <input
    type="text"
    name="message"
    placeholder="Message"
    value={message}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
  />
  <label htmlFor="imageUpload" className={Styles.fileInput}>
    <span className="material-symbols-outlined">attach_file</span>
    <input
      type="file"
      accept="image/*"
      id="imageUpload"
      onChange={handleImageUpload}
    />
  </label>
  <button onClick={handleSubmit} type="submit">
    <span className="material-symbols-outlined">send</span>
  </button>
</div>

    </div>
  );
};

export default Chat;
