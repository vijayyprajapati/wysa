import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/localStorage";
import Styles from "./navbar.module.css";
const NavBar = ({ setOpen, open }) => {
  const navigate = useNavigate();
  return (
    <div className={Styles.navbar}>
      <div
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        Change Theme
      </div>
      <div
        onClick={(e) => {
          setLocalStorage("login-state", false);
          navigate("/login", { replace: true });
        }}
      >
        {" "}
        Logout{" "}
      </div>
    </div>
  );
};
export default NavBar;
