import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Styles from "./login.module.css";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const theme = getLocalStorage("theme");
    if (theme) {
      const { background, primary, secondary } = theme;
      const root = document.querySelector(":root");
      root.style.setProperty("--background", background);
      root.style.setProperty("--primary", primary);
      root.style.setProperty("--secondary", secondary);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalStorage("login-state", true);
    navigate("/chat/?delay=0.50", { replace: true });
  };

  return (
    <div className={Styles.loginpage}>
      <div className={Styles.logo}>
        <img src="wysa.png" alt="Wysa Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
         
          <input type="email" name="email" placeholder="Email" required />
        </label>
        <label>
         
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
