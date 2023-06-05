import React from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import Styles from "./navbar.module.css";
import { defaultTheme } from "../../Data/themes";

const NavBar = ({ setOpen, open }) => {
  const navigate = useNavigate();
  const profileImage = getLocalStorage("login-data").profileImage;

  const handleLogout = () => {
    setLocalStorage("login-state", false);
    setLocalStorage("theme", defaultTheme); // Reset theme to default

    // Reset CSS variables to default theme
    const root = document.querySelector(":root");
    root.style.setProperty("--background", defaultTheme.background);
    root.style.setProperty("--primary", defaultTheme.primary);
    root.style.setProperty("--secondary", defaultTheme.secondary);

    navigate("/login", { replace: true });
  };

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
        <div className={Styles.logout} onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
