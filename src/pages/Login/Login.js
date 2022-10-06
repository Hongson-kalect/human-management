import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./Login.scss";
function Login({ setUserStorage = false }) {
  const navagate = useNavigate();
  const [storedValue, setValue] = useLocalStorage("user", {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    try {
      const rawRespon = await axios.post("http://localhost:8080/api/v1/login", {
        email: email,
        password: password,
      });
      const respon = rawRespon?.data?.data;
      if (rawRespon.data.errorCode === 1) {
        setUserStorage ? setUserStorage(respon) : setValue(respon);
        respon.mainRole === "MROLE0" ||
        respon.mainRole === "MROLE1" ||
        respon.subRole === "SROLE1"
          ? navagate("/home")
          : respon?.mainRole === "MROLE2" || respon?.mainRole === "SROLE2"
          ? navagate("/daycheck")
          : navagate("/profile");
      } else {
        toast.warning("Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      toast.error("Lỗi mạng e ây");
    }
  };
  return (
    <div className="login-wrap">
      <div className="login-container">
        <div className="login-contain">
          <div className="login-header">Login</div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              className="pass-icon"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="submit" onClick={handleLogin}>
            Login
          </div>
          <div className="options">
            <p className="option forget-pass">Forget your password?</p>
            <p className="option change-pass">Change password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
