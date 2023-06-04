import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./login.module.css";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      profileImage: profileImage ? URL.createObjectURL(profileImage) : null,
    };
    setLocalStorage("login-state", true);
    setLocalStorage("login-data", formData);
    navigate("/chat/?delay=0.50", { replace: true });
  };
  

  return (
    <div className={Styles.loginpage}>
      <div className={Styles.logo}>
        <img src="wysa.png" alt="Wysa Logo" />
      </div>
      <form onSubmit={handleSubmit}>
      <label className={Styles.profileImageLabel}>
 
  <div
    className={Styles.profileImagePreview}
    style={{ backgroundImage: `url(${profileImage ? URL.createObjectURL(profileImage) : ""})` }}
  >
    <input
      type="file"
      name="profileImage"
      accept="image/*"
      onChange={handleProfileImageChange}
    />
  </div>
</label>

        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
