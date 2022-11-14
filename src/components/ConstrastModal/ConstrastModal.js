import {
  faArrowCircleDown,
  faArrowCircleUp,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExtendModal from "../ExtendModal";
import "./ConstrastModal.scss";

const date = new Date();
const workRoomList = [
  { value: "IT-01", label: "Phòng IT số 1" },
  { value: "IT-02", label: "Phòng IT số 2" },
  { value: "IT-03", label: "Phòng IT số 3" },
  { value: "IT-04", label: "Phòng IT số 4" },
];
let avoidEffect = true;

function ConstrastModal({
  peopleList = [],
  setPeopleList,
  emergencyList = [],
  setEmergencyList,
  count = 0,
}) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [isShowEmergencyList, setIsShowEmergencyList] = useState(() => {
    if (count > 0) return true;
    return false;
  });
  const [isExtendModalShow, setIsExtendModalShow] = useState(false);
  const [room, setRoom] = useState("");
  const [orderType, setOrderType] = useState("name-asc");
  const [renderList, setRenderList] = useState(() => {
    const list = count > 0 ? emergencyList : peopleList;
    return list || [];
  });
  const [extendId, setExtendId] = useState("");
  const [extendValue, setExtendValue] = useState("");

  const [dayInStart, setDayInStart] = useState(() => {
    let day = new Date();
    day.setFullYear(day.getFullYear() - 50);
    return day.toISOString().slice(0, 10);
  });
  const [dayInEnd, setDayInEnd] = useState(() => {
    let day = new Date();
    day.setFullYear(day.getFullYear() + 100);
    return day.toISOString().slice(0, 10);
  });
  const [dayOutStart, setDayOutStart] = useState(() => {
    let day = new Date();
    day.setFullYear(day.getFullYear() - 50);
    return day.toISOString().slice(0, 10);
  });
  const [dayOutEnd, setDayOutEnd] = useState(() => {
    let day = new Date();
    day.setFullYear(day.getFullYear() + 100);
    return day.toISOString().slice(0, 10);
  });

  const handleExtend = (e) => {
    const target = e.target.closest(".extend-label");
    setExtendId(target.dataset.id);
    setExtendValue(target.dataset.value);
    setIsExtendModalShow(true);
  };

  useEffect(() => {
    setRenderList(isShowEmergencyList ? emergencyList : peopleList);
  }, [emergencyList, isShowEmergencyList, peopleList]);
  console.log(isShowEmergencyList);
  useEffect(() => {
    if (!avoidEffect) {
      const callApiSearch = async () => {
        const res = await axios({
          url: "http://localhost:8080/api/v1/p",
          method: "get",
          params: {
            s: search,
            room,
            sort: orderType,
            dayInStart,
            dayInEnd,
            dayOutStart,
            dayOutEnd,
          },
        });
        setIsShowEmergencyList(false);
        setRenderList(res.data.data);
      };
      callApiSearch();
    }
  }, [dayInEnd, dayInStart, dayOutEnd, dayOutStart, orderType, room, search]);
  return (
    <>
      <div className="constrast-modal-contain">
        <div className="filter-section-wrapper p25">
          <div className="filter-section">
            <p className="header">Lọc thông tin</p>
            <div className="input-group">
              <label className="">Key word</label>
              <input
                value={search}
                onChange={(e) => {
                  if (avoidEffect) avoidEffect = false;
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="input-group">
              <label className="">Room</label>
              <select
                value={room}
                onChange={(e) => {
                  if (avoidEffect) avoidEffect = false;
                  setRoom(e.target.value);
                }}
              >
                <option value="">----All room----</option>
                {workRoomList.map((room, index) => {
                  return (
                    <option value={room.value} key={index}>
                      {room.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-group">
              <label className="">Order By</label>
              <select
                value={orderType}
                onChange={(e) => {
                  if (avoidEffect) avoidEffect = false;
                  setOrderType(e.target.value);
                }}
              >
                <option value="lastName-ASC">Tên ASC</option>
                <option value="lastName-DESC">Tên DESC</option>
                <option value="dayIn-ASC">Ngày vào ASC</option>
                <option value="dayIn-DESC">Ngày vào DESC</option>
                <option value="dayOut-ASC">Ngày hết hạn ASC</option>
                <option value="dayOut-DESC">Ngày hết hạn DESC</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="">Day In:</label>
            </div>
            <div className="input-group d-flex">
              <label className="time-label">From</label>
              <input
                type="date"
                className="day-in-start"
                value={dayInStart}
                onChange={(e) => {
                  if (avoidEffect) avoidEffect = false;
                  setDayInStart(e.target.value);
                }}
              />
              <label className="time-label">To</label>
              <input
                type="date"
                className="day-in-end"
                value={dayInEnd}
                onChange={(e) => {
                  if (avoidEffect) avoidEffect = false;
                  setDayInEnd(e.target.value);
                }}
              />
            </div>

            <div className="input-group  d-flex">
              <label htmlFor="">Day Out:</label>
            </div>
            <div className="input-group d-flex">
              <label className="time-label">From</label>
              <input
                type="date"
                className="day-out-start"
                value={dayOutStart}
                onChange={(e) => {
                  if (avoidEffect) avoidEffect = false;
                  setDayOutStart(e.target.value);
                }}
              />
              <label className="time-label">To</label>
              <input
                type="date"
                className="day-out-end"
                value={dayOutEnd}
                onChange={(e) => {
                  if (avoidEffect) avoidEffect = false;
                  setDayOutEnd(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="contain-wrapper p70">
          <div className="contain">
            <p className="constrast-header">
              {isShowEmergencyList
                ? "Danh sách sắp hết hợp đồng"
                : "danh sách hợp đồng"}
            </p>
            <p
              className="constrast-sub-header"
              onClick={() => setIsShowEmergencyList(!isShowEmergencyList)}
            >
              {isShowEmergencyList ? "Xem tất cả" : "Xem hợp đồng gần hết hạn"}
            </p>
            <table id="customers">
              <tbody>
                <tr>
                  <th>{t("table.email")}</th>
                  <th>{t("table.name")}</th>
                  <th>{t("table.mainrole")}</th>
                  <th>{t("table.subrole")}</th>
                  <th>{t("table.room")}</th>
                  <th>Ngày vào</th>
                  <th>Ngày hết hạn</th>
                  <th>{t("table.options")}</th>
                </tr>
                {renderList.map((person) => {
                  return (
                    <tr key={person.id}>
                      <td>{person.email}</td>
                      <td>{person.firstName + " " + person.lastName}</td>
                      <td>
                        {person?.["mainrole-keyword"]
                          ? t("code") === "vi"
                            ? person["mainrole-keyword"].viValue
                            : person["mainrole-keyword"].enValue
                          : "Undifined"}
                      </td>
                      <td>
                        {person?.["subrole-keyword"]
                          ? t("code") === "vi"
                            ? person["subrole-keyword"].viValue
                            : person["subrole-keyword"].enValue
                          : "Undifined"}
                      </td>
                      <td>{person.workRoom}</td>
                      <td>{person.dayIn.slice(0, 10)}</td>
                      <td>{person.dayOut.slice(0, 10)}</td>
                      <td>
                        <div className="icon-wrap">
                          <Tippy content={"Gia hạn"} delay={[500, 100]}>
                            <p
                              className="extend-label"
                              data-id={person.id}
                              data-value={person.dayOut.slice(0, 10)}
                              onClick={(e) => handleExtend(e)}
                            >
                              Gia hạn
                            </p>
                          </Tippy>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isExtendModalShow && (
        <div className="extend-modal">
          <div
            className="overlay level2"
            onClick={() => setIsExtendModalShow(false)}
          ></div>
          <ExtendModal
            id={extendId}
            value={extendValue}
            setPeopleList={setPeopleList}
            setEmergencyList={setEmergencyList}
            setIsExtendModalShow={setIsExtendModalShow}
          />
        </div>
      )}
    </>
  );
}

export default ConstrastModal;
