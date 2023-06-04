import { useNavigate } from "react-router-dom";
import Styles from "./login.module.css";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
const Login = () => {
  const navigate = useNavigate();
  const theme = getLocalStorage("theme");
  if (theme) {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalStorage("login-state", true);
    navigate("/chat/?delay=0.50", { replace: true });
  };
  return (
    <div className={Styles.loginpage}>
      <div className={Styles.logo}>
        <img src="logo.png" alt="Wysa Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
