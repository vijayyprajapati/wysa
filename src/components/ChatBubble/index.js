import Styles from "./chatbubble.module.css";
import { useLocation } from "react-router-dom";
const ChatBubble = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const delay = params.get("delay");
  return props.type === "bot" ? (
    <div
      className={Styles.system}
      style={{
        "--timeline": parseFloat(delay) * (props.ind + 0.4) + "s",
      }}
    >
      {props.value}
    </div>
  ) : (
    <div
      className={Styles.user}
      style={{
        "--timeline": parseFloat(delay) + "s",
      }}
    >
      {props.value}
    </div>
  );
};

export default ChatBubble;
