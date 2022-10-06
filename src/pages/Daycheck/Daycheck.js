import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  faDoorOpen,
  faPlus,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PeopleFilter from "../../components/PeopleFilter";
import PeopleTable from "../../components/PeopleTable";
import "./Daycheck.scss";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PeopleDayCheck from "../../components/PeopleDayCheck/PeopleDayCheck";
import Tippy from "@tippyjs/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function Home() {
  const { t } = useTranslation();
  const [userRoom, setUserRoom] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useLocalStorage("user", {});

  const [dayCheckTarget, setDayCheckTarget] = useState("");
  const [isDayCheck, setIsDayCheck] = useState(false);
  const [peopleList, setPeopleList] = useState([]);

  const loadPeopleList = async () => {
    axios
      .get("http://localhost:8080/api/v1/ps")
      .then((respon) => setPeopleList(respon.data.data));
  };

  useEffect(() => {
    loadPeopleList();
    setUserRoom(userInfo.workRoom);
  }, [userInfo, setUserRoom]);

  useLayoutEffect(() => {
    if (
      userInfo.mainRole === "MROLE0" ||
      userInfo.mainRole === "MROLE1" ||
      userInfo.subRole === "SROLE1"
    )
      setRole("admin");
    else if (userInfo.mainRole === "MROLE2" || userInfo.subRole === "SROLE1")
      setRole("manager");
    else setRole("staff");
    if (role !== "manager" && role === "staff") navigate("/login");
  }, [role, setRole, userInfo, navigate]);

  return (
    <div className="daycheck-page">
      <div className="header">
        <h2 className="home-header">{t("timekeeping")}</h2>
        <div className="home-options">
          <div className="options-group options-group1">
            {(userInfo.mainRole === "MROLE0" ||
              userInfo.mainRole === "MROLE1" ||
              userInfo.subRole === "SROLE1") && (
              <button
                className="option-daycheck"
                onClick={() => navigate("/home")}
              >
                <FontAwesomeIcon className="icon calender-icon" icon={faUser} />
                <p className="daycheck-text">{t("options.personnel")}</p>
              </button>
            )}
          </div>
          <div className="options-group options-group2">
            <button
              className="option-add"
              onClick={() => {
                setIsDayCheck(true);
                setDayCheckTarget("");
              }}
            >
              <FontAwesomeIcon className="icon plus-icon" icon={faPlus} />
              <p className="plus-text">{t("options.checkmerit")}</p>
            </button>
            <p className="option-help">{t("options.help")}</p>
            <div className="options-language">
              <p
                className={
                  t("code") === "vi"
                    ? "option-language vi active"
                    : "option-language vi "
                }
                onClick={() => i18next.changeLanguage("vi")}
              >
                VI
              </p>
              <p
                className={
                  t("code") === "en"
                    ? "option-language en active"
                    : "option-language en "
                }
                onClick={() => i18next.changeLanguage("en")}
              >
                EN
              </p>
            </div>
            <Tippy content="Profile" delay={[500, 100]}>
              <div
                className="profile"
                onClick={() => navigate("/profile")}
                style={{
                  background: `url(${userInfo.avatar}),url("https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419") center center `,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </Tippy>
            <Tippy content="Log out" delay={[500, 100]}>
              <div className="log-out" onClick={() => navigate("/login")}>
                <FontAwesomeIcon
                  className="icon plus-icon"
                  icon={faRightFromBracket}
                />
              </div>
            </Tippy>
          </div>
        </div>
        <div className="header-filter-wrap">
          <PeopleFilter
            setPeopleList={setPeopleList}
            room={userRoom}
            role={role}
          />
        </div>
        <div className="header-table-wrap">
          <PeopleTable
            userInfo={userInfo}
            daycheck
            peopleList={peopleList}
            setPeopleList={setPeopleList}
            setIsDayCheck={setIsDayCheck}
            setDayCheckTarget={setDayCheckTarget}
          />
        </div>
      </div>
      <div className="container"></div>
      <div className="footer"></div>

      {isDayCheck && (
        <PeopleDayCheck
          setIsDayCheck={setIsDayCheck}
          dayCheckTarget={dayCheckTarget}
          setDayCheckTarget={setDayCheckTarget}
        />
      )}
    </div>
  );
}

export default Home;
