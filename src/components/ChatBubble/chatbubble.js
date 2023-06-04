import Styles from "./chatbubble.module.css";
import { useLocation } from "react-router-dom";
import { getLocalStorage } from "../../utils/localStorage";
import botProfile from "../../assets/chatbot-profile-image.png";

const ChatBubble = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const delay = params.get("delay");

  const data = getLocalStorage("login-data");
  const profileImage = data.profileImage;
  console.log(profileImage);
  return props.type === "bot" ? (
    <div className={Styles.botMessage}>
      <img className={Styles.profileImage} src={botProfile} alt="Bot Profile" />
      <div
        className={Styles.system}
        style={{
          "--timeline": parseFloat(delay) * (props.ind + 0.4) + "s",
        }}
      >
        {props.value}
      </div>
    </div>
  ) : (
    <div className={Styles.userMessage}>
      <div className={Styles.user}>{props.value}</div>
      {profileImage ? (
        <img className={Styles.profileImage} src={profileImage} alt="User Profile" />
      ) : null}
    </div>
  );
};

export default ChatBubble;
