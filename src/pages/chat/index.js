import Styles from "./chat.module.css";
import ChatBubble from "../../components/ChatBubble";
import { chats } from "../../constants/chat";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import Theme from "../../components/Theme";
import { getLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
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
  if (theme) {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
  }

  const handleChange = (e) => {
    e.preventDefault();
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

  return (
    <div className={Styles.chatpage}>
      {open && <Theme setOpen={setOpen}></Theme>}
      <NavBar open={open} setOpen={setOpen} />
      <div className={Styles.chatbox}>
        {chatData.map((value, ind) => {
          return (
            <ChatBubble
              ind={ind}
              key={ind}
              type={value.type}
              value={value.text}
            />
          );
        })}
      </div>
      <div className={Styles.typer}>
        <input
          type="text"
          name="message"
          placeholder="message"
          value={message}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
