import {
  faCalendar,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { memo } from "react";
import "./PeopleTable.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import Pagination from "../Pagination/Pagination";

function HomeTable({
  userInfo = {},
  daycheck,
  peopleList = [],
  setIsModalShow = () => {},
  setIsEditMode = () => {},
  setEditTarget = () => {},
  setDayCheckTarget = () => {},
  setIsDayCheck = () => {},
  loadPeopleList = () => {},
  setPeopleList = () => {},
}) {
  const { t } = useTranslation();
  const [workType, setWorkType] = useState("");
  const [workShift, setWorkShift] = useState("");
  const [dayType, setDayType] = useState("DType2");
  const [numberInput, setNumberInput] = useState(0);
  const [isSubmitable, setIsSubmitable] = useState(false);

  const handleDelete = (e) => {
    const yes = window.confirm(
      t("code") === "vi"
        ? "Bạn thực sự muốn xoá?"
        : "Are you sure you want to delete?"
    );
    if (yes) {
      const target = e.target.closest(".icon-trash");
      axios.delete("http://localhost:8080/api/v1/ps/del/" + target.dataset.id);
      toast.success("Delete successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      loadPeopleList();
    } else {
      toast.warning(t("code") === "vi" ? "Đã huỷ xoá" : "Action canceled!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDaycheck = async () => {
    if (
      window.confirm(t("code") === "vi" ? "Bạn đã chắc chưa?" : "Are you sure?")
    ) {
      const form = document.querySelector(".people-form");
      const formData = new FormData(form);
      const data = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/daycheck",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.data.errorCode === 1) {
        toast.success(data.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(data.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const handleDaycheckOne = async (id) => {
    if (dayType && workShift && workType) {
      if (
        window.confirm(
          t("code") === "vi" ? "Bạn đã chắc chưa?" : "Are you sure?"
        )
      ) {
        const data = await axios({
          method: "post",
          url: "http://localhost:8080/api/v1/daycheck/" + id,
          data: {
            id: id,
            dayType,
            workShift,
            workType,
          },
        });
        if (data.data.errorCode === 1) {
          toast.success(data.data.message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success(data.data.message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else {
      toast.error(
        t("code") === "vi"
          ? "Vui lòng chọn phương thức chấm công phía trên bảng này"
          : "Please choose the day check type in above of table",
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  const handleCheckBoxAllClick = (e) => {
    const checkAll = e.target.checked;
    const checkboxList = document.querySelectorAll(
      'input[type="checkbox"][name="peopleId[]"]'
    );
    for (const checkbox of checkboxList) {
      checkbox.checked = checkAll;
    }
    if (checkAll) setNumberInput(1);
    else setNumberInput(0);
  };
  const handleCheckBoxClick = (e) => {
    const checkAllbox = document.querySelector("#checkall-box");
    const checkboxList = document.querySelectorAll(
      'input[type="checkbox"][name="peopleId[]"]'
    );
    const checkedboxList = document.querySelectorAll(
      'input[type="checkbox"][name="peopleId[]"]:checked'
    );
    setNumberInput(checkedboxList.length);
    const isCheckAll = !!(checkboxList.length === checkedboxList.length);
    checkAllbox.checked = isCheckAll;
  };

  useEffect(() => {
    if (workType && workShift && dayType && numberInput) setIsSubmitable(true);
    else setIsSubmitable(false);
  }, [workType, workShift, dayType, numberInput]);

  return (
    <form
      method="POST"
      action="http://localhost:8080/api/v1/daycheck"
      className="people-form"
    >
      {daycheck && (
        <div className="daycheck-submit">
          <div className="select-group p20">
            <label htmlFor="work-type">{t("table.overtime")}:</label>
            <select
              value={workType}
              name="workType"
              id="work-type"
              onChange={(e) => {
                setWorkType(e.target.value);
              }}
            >
              <option value="">
                ----{t("code") === "vi" ? "Trống" : "Blank"}----
              </option>
              <option value="WType0">
                {t("code") === "vi" ? "Làm giờ hành chính" : "Official time"}
              </option>
              <option value="WType1">
                {t("code") === "vi" ? "Tăng ca 2 tiếng" : "2 hour overtime"}
              </option>
              <option value="WType2">
                {t("code") === "vi" ? "Tăng ca 4 tiếng" : "4 hour overtime"}
              </option>
            </select>
          </div>
          <div className="select-group p20">
            <label htmlFor="work-type">{t("table.shift")}:</label>
            <select
              value={workShift}
              name="workShift"
              onChange={(e) => {
                setWorkShift(e.target.value);
              }}
            >
              <option value="">
                ----{t("code") === "vi" ? "Trống" : "Blank"}----
              </option>
              <option value="day">
                {t("code") === "vi" ? "Ca ngày" : "Day shift"}
              </option>
              <option value="night">
                {t("code") === "vi" ? "Ca đêm" : "Night shift"}
              </option>
            </select>
          </div>
          <div className="select-group p20">
            <label>{t("table.daytype")}:</label>
            <select
              value={dayType}
              name="dayType"
              onChange={(e) => {
                setDayType(e.target.value);
              }}
            >
              <option value="DType0">
                {t("code") === "vi" ? "Ngày thường" : "Normal day"}
              </option>
              <option value="DType1">
                {t("code") === "vi" ? "Chủ nhật" : "Sunday"}
              </option>
              <option value="DType2">
                {t("code") === "vi" ? "Ngày lễ" : "Holiday"}
              </option>
            </select>
          </div>
          {isSubmitable ? (
            <div className="button" onClick={handleDaycheck}>
              {t("table.daycheck")}
            </div>
          ) : (
            <div className="button disabled">{t("table.daycheck")}</div>
          )}
        </div>
      )}
      <table id="customers">
        <tbody>
          <tr>
            {daycheck && (
              <th className="center">
                <input
                  type="checkbox"
                  id="checkall-box"
                  onClick={handleCheckBoxAllClick}
                />
              </th>
            )}
            <th>{t("table.email")}</th>
            <th>{t("table.name")}</th>
            <th>{t("table.age")}</th>
            <th>{t("table.gender")}</th>
            <th>{t("table.address")}</th>
            <th>{t("table.mainrole")}</th>
            <th>{t("table.subrole")}</th>
            <th>{t("table.room")}</th>
            <th>{t("table.options")}</th>
          </tr>
          {peopleList.map((person) => {
            return (
              <tr key={person.id}>
                {daycheck && (
                  <td className="center">
                    <input
                      type="checkbox"
                      name="peopleId[]"
                      value={person.id}
                      onClick={handleCheckBoxClick}
                    />
                  </td>
                )}
                <td>{person.email}</td>
                <td>{person.firstName + " " + person.lastName}</td>
                <td>{person.age}</td>
                <td>{person.gender}</td>
                <td>{person.address}</td>
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
                <td>
                  <div className="icon-wrap">
                    <Tippy
                      content={daycheck ? "Day Check" : "Edit"}
                      delay={[500, 100]}
                    >
                      <FontAwesomeIcon
                        className="icon icon-pencil"
                        icon={daycheck ? faPenToSquare : faPencil}
                        data-id={person.id}
                        onClick={(e) => {
                          const target = e.target.closest(".icon-pencil");
                          !daycheck && setEditTarget(target.dataset.id);
                          !daycheck && setIsEditMode(true);
                          !daycheck && setIsModalShow(true);
                          daycheck && handleDaycheckOne(target.dataset.id);
                        }}
                      />
                    </Tippy>
                    {!daycheck && (
                      <Tippy content={"Delete"} delay={[500, 100]}>
                        <FontAwesomeIcon
                          className="icon icon-trash"
                          data-id={person.id}
                          onClick={handleDelete}
                          icon={faTrash}
                        />
                      </Tippy>
                    )}
                    {daycheck && (
                      <Tippy content={"Check Payroll"} delay={[500, 100]}>
                        <FontAwesomeIcon
                          className="icon icon-calendar"
                          icon={faCalendar}
                          data-id={person.id}
                          onClick={(e) => {
                            const target = e.target.closest(".icon-calendar");
                            setDayCheckTarget(target.dataset.id);
                            setIsDayCheck(true);
                          }}
                        />
                      </Tippy>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </form>
  );
}

export default memo(HomeTable);
