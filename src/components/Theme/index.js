import Styles from "./theme.module.css";
import { themes } from "../../constants/themes";
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
    <div
      className={Styles.theme}
      onClick={(e) => {
        setOpen(false);
      }}
    >
      <div className={Styles.themebox}>
        <b>Select Theme</b>
        {themes.map((value, ind) => {
          return <Theme ind={ind} key={ind} value={value} />;
        })}

        <div
          className={Styles.pallete}
          onClick={(e) => {
            const root = document.querySelector(":root");
            e.preventDefault();
            root.style.setProperty("--background", custom.background);
            root.style.setProperty("--primary", custom.primary);
            root.style.setProperty("--secondary", custom.secondary);
            setLocalStorage("theme", custom);
          }}
        >
          <div> Custom </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              type="color"
              id="body"
              name="background"
              value={custom.background}
              onChange={handleChange}
            />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              type="color"
              id="body"
              name="primary"
              value={custom.primary}
              onChange={handleChange}
            />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              type="color"
              id="body"
              name="secondary"
              value={custom.secondary}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Theme = ({ ind, value }) => {
  return (
    <div
      className={Styles.pallete}
      onClick={(e) => {
        const root = document.querySelector(":root");
        root.style.setProperty("--background", value.background);
        root.style.setProperty("--primary", value.primary);
        root.style.setProperty("--secondary", value.secondary);
        setLocalStorage("theme", value);
      }}
    >
      <div>Theme {ind} </div>
      <div
        style={{
          height: "25px",
          width: "25px",
          borderRadius: "50%",
          background: value.background,
        }}
      />
      <div
        style={{
          height: "25px",
          width: "25px",
          borderRadius: "50%",
          background: value.primary,
        }}
      />
      <div
        style={{
          height: "25px",
          width: "25px",
          borderRadius: "50%",
          background: value.secondary,
        }}
      />
    </div>
  );
};
export default Themes;
