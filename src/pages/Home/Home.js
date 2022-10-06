import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  faDoorOpen,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PeopleFilter from "../../components/PeopleFilter";
import PeopleTable from "../../components/PeopleTable";
import "./Home.scss";
import axios from "axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "react-toastify/dist/ReactToastify.css";
import PeopleModal from "../../components/PeopleModal/PeopleModal";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Pagination from "../../components/Pagination/Pagination";

function Home() {
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const [userInfo, setUserInfo] = useLocalStorage("user", {});
  const navigate = useNavigate();
  const [isModalShow, setIsModalShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState(false);

  const [peopleList, setPeopleList] = useState([]);

  const loadPeopleList = async () => {
    axios
      .get("http://localhost:8080/api/v1/ps")
      .then((respon) => setPeopleList(respon.data.data));
  };

  useEffect(() => {
    loadPeopleList();
  }, []);

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
    if (role !== "admin") {
      if (role === "manager") {
        navigate("/daycheck");
      } else if (role === "staff") navigate("/login");
    }
  }, [role, setRole, navigate, userInfo]);

  return (
    <div className="home-page">
      <div className="header">
        <h2 className="home-header">{t("personnel_list")}</h2>
        <div className="home-options">
          <div className="options-group options-group1">
            <button
              className="option-daycheck"
              onClick={() => navigate("/daycheck")}
            >
              <FontAwesomeIcon
                className="icon calender-icon"
                icon={faCalendarCheck}
              />
              <p className="daycheck-text">{t("options.timekeeping")}</p>
            </button>
          </div>

          <div className="options-group options-group2">
            <button className="option-add" onClick={() => setIsModalShow(true)}>
              <FontAwesomeIcon className="icon plus-icon" icon={faPlus} />
              <p className="plus-text">{t("options.addnew")}</p>
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
          <PeopleFilter setPeopleList={setPeopleList} />
        </div>
        <div className="header-table-wrap">
          <Pagination
            peopleList={peopleList}
            setIsModalShow={setIsModalShow}
            setIsEditMode={setIsEditMode}
            setEditTarget={setEditTarget}
            loadPeopleList={loadPeopleList}
            setPeopleList={setPeopleList}
          />
          {/* <PeopleTable
            peopleList={peopleList}
            setIsModalShow={setIsModalShow}
            setIsEditMode={setIsEditMode}
            setEditTarget={setEditTarget}
            loadPeopleList={loadPeopleList}
            setPeopleList={setPeopleList}
          /> */}
        </div>
      </div>
      <div className="container"></div>
      <div className="footer"></div>

      {isModalShow && (
        <PeopleModal
          isModalShow={isModalShow}
          setIsModalShow={setIsModalShow}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          editTarget={editTarget}
          loadPeopleList={loadPeopleList}
        />
      )}
    </div>
  );
}

export default Home;
