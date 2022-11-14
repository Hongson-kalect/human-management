import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const rawRespon = await axios.post(
          "http://localhost:8080/api/v1/login",
          {
            email: email,
            password: password,
          }
        );
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
          toast.warning(
            t("code") === "vi"
              ? "Sai tài khoản hoặc mật khẩu"
              : "Password or Account not correctlly"
          );
        }
      } catch (error) {
        toast.error(
          t("code") === "vi"
            ? "Vui lòng kiểm tra lại kết nối mạng và thử lại!!!"
            : "Please check your connection and try again."
        );
      }
    } else
      toast.error(
        t("code") === "vi"
          ? "Vui lòng nhập đầy đủ thông tin!!"
          : "Please fill all the fields!!!"
      );
  };
  return (
    <div className="login-wrap">
      <div className="login-container">
        <div className="login-contain">
          <div className="login-header">
            {t("code") === "vi" ? "Đăng nhập" : "Login"}
          </div>
          <div className="input-group p100">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group p100">
            <label>{t("code") === "vi" ? "Mật khẩu" : "Password"}</label>
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
            {t("code") === "vi" ? "Đăng nhập" : "Login"}
          </div>
          <div className="options">
            <p className="option forget-pass">
              {t("code") === "vi" ? "Quên mật khẩu?" : "Forget your password?"}
            </p>
            <p
              className="option change-pass"
              onClick={() => navagate("/changepass")}
            >
              {t("code") === "vi" ? "Đổi mật khẩu?" : "Change password?"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
