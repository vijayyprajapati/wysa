import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import Styles from "./navbar.module.css";

const NavBar = ({ setOpen, open }) => {
  const navigate = useNavigate();
  const profileImage = getLocalStorage("login-data").profileImage;

  return (
    <div className={Styles.navbar}>
      <div
        className={Styles.themeIcon}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className="material-symbols-outlined">format_color_fill</span>
      </div>
      <div className={Styles.profile}>
        {profileImage && (
          <img className={Styles.profileImage} src={profileImage} alt="Profile" />
        )}
        <div
          className={Styles.logout}
          onClick={() => {
            setLocalStorage("login-state", false);
            navigate("/login", { replace: true });
          }}
        >
          <span className="material-symbols-outlined">logout</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
