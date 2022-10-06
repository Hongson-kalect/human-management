import {
  faCalendar,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { memo } from "react";
import "./PeopleDayCheck.scss";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import { useEffect } from "react";
import PaginationVer2 from "../PaginationVer2/PaginationVer2";

const date = new Date();

const workRoomList = [
  { value: "IT-01", label: "Phòng IT số 1" },
  { value: "IT-02", label: "Phòng IT số 2" },
  { value: "IT-03", label: "Phòng IT số 3" },
  { value: "IT-04", label: "Phòng IT số 4" },
];

function PeopleDayCheck({
  setIsDayCheck = () => {},
  dayCheckTarget = "",
  setCheckDayTarget = () => {},
}) {
  const [spreadList, setSpreadList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDounce, setSearchDounce] = useState("");
  const [room, setRoom] = useState("");
  const [dayTo, setDayTo] = useState(date.toISOString().slice(0, 10));
  const [dayFrom, setDayFrom] = useState(() => {
    const arr = date.toISOString().slice(0, 10).split("-");
    const month = (Number(arr[1]) - 1).toString();
    arr[1] = month.length < 2 ? "0" + month : month;
    return arr[0] + "-" + arr[1] + "-" + arr[2];
  });
  useEffect(() => {
    dayCheckTarget
      ? axios
          .get("http://localhost:8080/api/v1/daycheck/" + dayCheckTarget)
          .then((res) => setPeopleList(res.data.data))
      : axios
          .get("http://localhost:8080/api/v1/daycheck", {
            params: {
              s: searchDounce,
              room,
              from: dayFrom,
              to: dayTo,
            },
          })
          .then((res) => setPeopleList(res.data.data));
  }, [dayCheckTarget, searchDounce, room, dayFrom, dayTo]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearchDounce(search);
    }, 700);
    return () => {
      clearTimeout(timeOut);
    };
  }, [search]);
  useEffect(() => {
    let arr = [];
    let stt = 1;
    peopleList.map((people) => {
      people["people-timekeeping"].map((item) => {
        item.stt = stt;
        item.updatedAt = new Date(item.updatedAt).toLocaleString();
        item.email = people.email;
        item.firstName = people.firstName;
        item.lastName = people.lastName;
        item.workRoom = people.workRoom;
        item.email = people.email;
        item.email = people.email;
        item.mainRole = people?.["mainrole-keyword"]
          ? people["mainrole-keyword"]
          : "Undifined";
        item.subRole = people?.["subrole-keyword"]
          ? people["subrole-keyword"]
          : "Undifined";
        stt++;
        arr.push(item);
        return null;
      });
      return null;
    });

    setSpreadList(arr);
    console.log(arr);
  }, [peopleList]);
  return (
    <div
      onScrollCapture={(e) => e.stopPropagation()}
      className="daycheck-modal"
    >
      <div
        className="overlay"
        onClick={() => {
          setIsDayCheck(false);
          setCheckDayTarget("");
        }}
      ></div>
      <div className="modal-wrap">
        <h2 className="header">Bảng công</h2>
        {!dayCheckTarget && (
          <div className="filter-daycheck">
            <div className="input-group p25">
              <label className="">Key word</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="input-group p25">
              <label className="">Room</label>
              <select
                value={room}
                onChange={(e) => {
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
            <div className="input-group p20">
              <label htmlFor="">From day</label>
              <input
                type="date"
                className="day-from"
                value={dayFrom}
                onChange={(e) => setDayFrom(e.target.value)}
              />
            </div>
            <div className="input-group p20">
              <label htmlFor="">To</label>
              <input
                type="date"
                className="day-to"
                value={dayTo}
                onChange={(e) => setDayTo(e.target.value)}
              />
            </div>
          </div>
        )}
        <table id="customers">
          <tbody>
            <tr>
              <th>STT</th>
              <th>Email</th>
              <th>Name</th>
              <th>Main role</th>
              <th>Sub role</th>
              <th>Room</th>
              <th>Shift</th>
              <th>Time work</th>
              <th>Day type</th>
              <th>Checked at</th>
            </tr>
            {renderList.map((dayInfo, index) => {
              return (
                <tr key={dayInfo.id}>
                  <td>{index + 1}</td>
                  <td>{dayInfo.email}</td>
                  <td>{dayInfo.firstName + " " + dayInfo.lastName}</td>
                  <td>
                    {dayInfo?.["mainRole"]?.viValue
                      ? dayInfo["mainRole"].viValue
                      : "Undifined"}
                  </td>
                  <td>
                    {dayInfo?.["subRole"]?.viValue
                      ? dayInfo["subRole"].viValue
                      : "Undifined"}
                  </td>
                  <td>{dayInfo.workRoom}</td>
                  <td>{dayInfo.workShift}</td>
                  <td>{dayInfo.workType}</td>
                  <td>{dayInfo.dayType}</td>
                  <td>{dayInfo.day}</td>
                </tr>
              );
            })}
            {/* {renderList.map((person, index) => {
              return person?.["people-timekeeping"].map((day) => {
                return (
                  <tr key={day.id}>
                    <td>{person.email}</td>
                    <td>{person.firstName + " " + person.lastName}</td>
                    <td>
                      {person?.["mainrole-keyword"]?.viValue
                        ? person["mainrole-keyword"].viValue
                        : "Undifined"}
                    </td>
                    <td>
                      {person?.["subrole-keyword"]?.viValue
                        ? person["subrole-keyword"].viValue
                        : "Undifined"}
                    </td>
                    <td>{person.workRoom}</td>
                    <td>{day.workShift}</td>
                    <td>{day.workType}</td>
                    <td>{day.dayType}</td>
                    <td>{day.day}</td>
                  </tr>
                );
              });
            })} */}
          </tbody>
        </table>
        <PaginationVer2
          list={spreadList}
          setRenderList={setRenderList}
          itemPerPage={10}
        />
      </div>
    </div>
  );
}

export default memo(PeopleDayCheck);
