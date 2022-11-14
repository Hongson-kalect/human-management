import "./ChangePassword.scss";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function ChangePassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const { t } = useTranslation();

  const handleChangepass = async () => {
    if (email && oldPassword && password && checkPassword) {
      if (password !== checkPassword) {
        toast.error(
          t("code") === "vi"
            ? "2 mật khẩu mới không trùng khớp"
            : "2 new password not match"
        );
      } else if (oldPassword === password) {
        toast.error(
          t("code") === "vi"
            ? "Vui lòng nhập mật khẩu khác mật khẩu hiện tại"
            : "Please choose a new password diferent from current password"
        );
      } else {
        try {
          const res = await axios({
            url: "http://localhost:8080/api/v1/changepass",
            method: "PUT",
            data: {
              email,
              currentPassword: oldPassword,
              newPassword: password,
            },
          });
          if (res.data.errorCode === 1) {
            toast.success(res.data.message);
            navigate("/login");
          } else toast.error(res.data.message);
        } catch (error) {
          toast.error(
            t("code") === "vi"
              ? "Vui lòng kiểm tra lại kết nối mạng và thử lại!!!"
              : "Please check your connection and try again."
          );
        }
      }
    } else {
      toast.error(
        t("code") === "vi"
          ? "Vui lòng nhập đầy đủ thông tin!!"
          : "Please fill all the fields!!!"
      );
    }
  };

  return (
    <div className="changepass-wrap">
      <div className="changepass-container">
        <div className="changepass-contain">
          <div className="changepass-header">
            {t("code") === "vi" ? "Đổi mật khẩu" : "Change Password"}
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>
              {t("code") === "vi" ? "Mật khẩu hiện tại" : "Current password"}
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="current_pass"
              placeholder="Enter your current password..."
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <FontAwesomeIcon
              className="pass-icon"
              icon={showOldPassword ? faEyeSlash : faEye}
              onClick={() => setShowOldPassword(!showOldPassword)}
            />
          </div>

          <div className="input-group">
            <label>
              {t("code") === "vi" ? "Mật khẩu mới" : "New password"}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="new_pass"
              placeholder="Enter your new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              className="pass-icon"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="input-group">
            <label>
              {t("code") === "vi"
                ? "Nhập lại mật khẩu mới"
                : "Input again new password"}
            </label>
            <input
              type={showCheckPassword ? "text" : "password"}
              name="check_new_pass"
              placeholder="Enter your new password again..."
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
            <FontAwesomeIcon
              className="pass-icon"
              icon={showCheckPassword ? faEyeSlash : faEye}
              onClick={() => setShowCheckPassword(!showCheckPassword)}
            />
          </div>

          <div className="submit" onClick={handleChangepass}>
            {t("code") === "vi" ? "Đổi mật khẩu" : "Change Password"}
          </div>
          <div className="options">
            <p className="option forget-pass">
              {t("code") === "vi" ? "Quên mật khẩu?" : "Forget your password?"}
            </p>
            <p
              className="option change-pass"
              onClick={() => navigate("/login")}
            >
              {t("code") === "vi" ? "Đến đăng nhập" : "To login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
