import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./PeopleFilter.scss";
import { useTranslation } from "react-i18next";

const workRoomList = [
  { value: "IT-01", viLabel: "Phòng IT số 1", enLabel: "IT no 1 office" },
  { value: "IT-02", viLabel: "Phòng IT số 2", enLabel: "IT no 2 office" },
  { value: "IT-03", viLabel: "Phòng IT số 3", enLabel: "IT no 3 office" },
  { value: "IT-04", viLabel: "Phòng IT số 4", enLabel: "IT no 4 office" },
];

function HeaderFilter({ setPeopleList = () => {}, room = "", role = "admin" }) {
  const [workRoom, setWorkRoom] = useState(room);
  const [searchVal, setSearchVal] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [sortType, setSortType] = useState("");
  const [limit, setLimit] = useState("");
  const [limitDebounce, setLimitDebounce] = useState("");
  const { t } = useTranslation();

  //workRoom take room for it initialValue but room start with '' value,
  // if want to take room in prop to state have to use this
  // And select value cannot get prop value to value that is reason i have to change it to state
  useEffect(() => {
    setWorkRoom(room);
  }, [room]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearchDebounce(searchVal);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [searchVal]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLimitDebounce(Math.floor(limit));
    }, 500);
    return () => clearTimeout(timeOut);
  }, [limit]);

  useEffect(() => {
    const search = async (searchDebounce, sortType) => {
      await axios
        .get(`http://localhost:8080/api/v1/ps`, {
          params: {
            s: searchDebounce,
            sort: sortType,
            limit: limitDebounce,
            room: workRoom,
          },
        })
        .then((res) => setPeopleList(res.data.data));
    };
    search(searchDebounce, sortType);
  }, [searchDebounce, sortType, limitDebounce, setPeopleList, workRoom]);
  return (
    <div className="header-filter">
      <div className="filter-search">
        <input
          className="filter-search-input"
          type="text"
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value);
          }}
          placeholder="Search..."
        />
        <FontAwesomeIcon className="filter-search-icon" icon={faSearch} />
      </div>

      {role === "admin" && (
        <div className="input-group filter-room">
          <label className="">{t("filter.room")}</label>
          <select
            value={workRoom}
            onChange={(e) => {
              setWorkRoom(e.target.value);
            }}
          >
            <option value="">----All room----</option>
            {workRoomList.map((room, index) => {
              return (
                <option value={room.value} key={index}>
                  {t("code") === "vi" ? room.viLabel : room.enLabel}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div className="filter-limit">
        <label htmlFor="">{t("filter.limit")}</label>
        <input
          className="filter-search-input"
          type="number"
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
          }}
          placeholder="Unlimited"
        />
      </div>

      <div className="filter-sort">
        <label className="filter-sort-label" htmlFor="filter-sort-select">
          {t("filter.order_by")}
        </label>
        <select
          value={sortType}
          onChange={(e) => {
            setSortType(e.target.value);
          }}
          className="filter-sort-select"
        >
          <option value="id-ASC">
            {t("code") === "vi" ? "ID tăng dần" : "ID Ascending"}
          </option>
          <option value="id-DESC">
            {t("code") === "vi" ? "ID giảm dần" : "ID Descending"}
          </option>
          <option value="lastName-ASC">
            {t("code") === "vi" ? "Tên tăng dần" : "Name Ascending"}
          </option>
          <option value="lastName-DESC">
            {t("code") === "vi" ? "Tên giảm dần" : "Name Descending"}
          </option>
          <option value="age-ASC">
            {t("code") === "vi" ? "Tuổi tăng dần" : "Age Ascending"}
          </option>
          <option value="age-DESC">
            {t("code") === "vi" ? "Tuổi giảm dần" : "Age Descending"}
          </option>
        </select>
      </div>
    </div>
  );
}

export default HeaderFilter;
