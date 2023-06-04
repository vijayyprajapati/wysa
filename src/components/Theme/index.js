import Styles from "./theme.module.css";
import { themes } from "../../Data/themes";
import { setLocalStorage } from "../../utils/localStorage";
import { useState } from "react";

const Themes = ({ setOpen }) => {
  const [custom, setCustom] = useState({
    background: "#e66465",
    primary: "#f6b73c",
    secondary: "#ffffff",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCustom({ ...custom, [name]: value });
  };

  return (
    <div className={Styles.theme} onClick={() => setOpen(false)}>
      <div className={Styles.themebox}>
        <b>Select Theme</b>
        {themes.map((value, ind) => (
          <Theme key={ind} value={value} />
        ))}

        <div
          className={Styles.dropdown}
          onClick={(e) => {
            e.stopPropagation();
            const root = document.querySelector(":root");
            root.style.setProperty("--background", custom.background);
            root.style.setProperty("--primary", custom.primary);
            root.style.setProperty("--secondary", custom.secondary);
            setLocalStorage("theme", custom);
          }}
        >
          <div className={Styles.customOption}>
            <input
              type="color"
              name="background"
              value={custom.background}
              onChange={handleChange}
            />
            <label>Background</label>
          </div>
          <div className={Styles.customOption}>
            <input
              type="color"
              name="primary"
              value={custom.primary}
              onChange={handleChange}
            />
            <label>Primary</label>
          </div>
          <div className={Styles.customOption}>
            <input
              type="color"
              name="secondary"
              value={custom.secondary}
              onChange={handleChange}
            />
            <label>Secondary</label>
          </div>
        </div>
      </div>
    </div>
  );
};

const Theme = ({ value }) => {
  const { background, primary, secondary } = value;

  return (
    <div
      className={Styles.option}
      onClick={(e) => {
        e.stopPropagation();
        const root = document.querySelector(":root");
        root.style.setProperty("--background", background);
        root.style.setProperty("--primary", primary);
        root.style.setProperty("--secondary", secondary);
        setLocalStorage("theme", value);
      }}
    >
      <div className={Styles.bullet} style={{ backgroundColor: background }}></div>
      <div className={Styles.optionCircle} style={{ backgroundColor: primary }}></div>
      <div className={Styles.optionCircle} style={{ backgroundColor: secondary }}></div>
    </div>
  );
};

export default Themes;
