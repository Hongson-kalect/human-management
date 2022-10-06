import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "../../utils/fileUpload";
import { useTranslation } from "react-i18next";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

import "./PeopleModal.scss";

const workRoomList = [
  { value: "IT-01", viLabel: "Phòng IT số 1", enLabel: "IT no 1 office" },
  { value: "IT-02", viLabel: "Phòng IT số 2", enLabel: "IT no 2 office" },
  { value: "IT-03", viLabel: "Phòng IT số 3", enLabel: "IT no 3 office" },
  { value: "IT-04", viLabel: "Phòng IT số 4", enLabel: "IT no 4 office" },
];
function HomeModal({
  isModalShow,
  setIsModalShow = () => {},
  isEditMode = false,
  setIsEditMode = () => {},
  loadPeopleList = () => {},
  editTarget = 1,
}) {
  const imgField = useRef();
  const { t } = useTranslation();

  const [workRoom, setWorkRoom] = useState("IT-01");
  const [mainRoleList, setMainRoleList] = useState([]);
  const [subRoleList, setSubRoleList] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(20);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mainRole, setMainRole] = useState("MROLE0");
  const [subRole, setSubRole] = useState("SROLE0");
  const [salaryType, setSalaryType] = useState("count");
  const [avatar, setAvatar] = useState("");
  const [preAvatar, setPreAvatar] = useState("");
  const [isImageChange, setIsImageChange] = useState(false);
  const [peopleDescription, setPeopleDescription] = useState("");

  const [basicSalary, setBasicSalary] = useState("5200000");
  const [positionSalary, setPositionSalary] = useState("500000");
  const [laboriousBonus, setLaboriousBonus] = useState("500000");
  const [languageBonus, setLanguageBonus] = useState("250000");
  const [vehicleBonus, setVehicleBonus] = useState("200000");
  const [innBonus, setInnBonus] = useState("300000");
  const [insurance, setInsurance] = useState("10");
  const [other, setOther] = useState(0);
  const [salaryDescription, setSalaryDescription] = useState("");

  const [isImagePre, setIsImagePre] = useState(false);

  const handleAvatarChange = async (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setAvatar(e.target.value);
    setPreAvatar(url);
    setIsImageChange(true);
  };

  const handleAddPeople = async () => {
    let imgRes = false;
    if (isImageChange) imgRes = await uploadImage(imgField.current.files[0]);

    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/ps/add",
      data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        address: address,
        phoneNumber: phoneNumber,
        workRoom: workRoom,
        mainRole: mainRole,
        subRole: subRole,
        salaryType: salaryType,
        avatar: isImageChange ? imgRes.data.data.url : "",
        peopleDescription: peopleDescription,
        basicSalary: basicSalary,
        positionSalary: positionSalary,
        laboriousBonus: laboriousBonus,
        languageBonus: languageBonus,
        vehicleBonus: vehicleBonus,
        innBonus: innBonus,
        insurance: insurance,
        other: other,
        salaryDescription: salaryDescription,
      },
    });
    if (res.data.errorCode !== 1) {
      toast(res.data.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Create user successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      loadPeopleList();
      handleCloseModal();
    }
  };

  const handleEditPeople = async () => {
    let imgRes = false;
    if (isImageChange) {
      imgRes = await uploadImage(imgField.current.files[0]);
    }

    const res = await axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/ps/edit/${editTarget}`,
      data: {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        address: address,
        phoneNumber: phoneNumber,
        mainRole: mainRole,
        subRole: subRole,
        workRoom: workRoom,
        salaryType: salaryType,
        avatar: imgRes ? imgRes.data.data.url : preAvatar,
        peopleDescription: peopleDescription,
        basicSalary: basicSalary,
        positionSalary: positionSalary,
        laboriousBonus: laboriousBonus,
        languageBonus: languageBonus,
        vehicleBonus: vehicleBonus,
        innBonus: innBonus,
        insurance: insurance,
        other: other,
        salaryDescription: salaryDescription,
      },
    });
    if (res.data.errorCode !== 1) {
      toast(res.data.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Edit user successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      loadPeopleList();
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalShow(false);
    setIsEditMode(false);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setGender("Male");
    setAge(20);
    setAddress("");
    setPhoneNumber("");
    setMainRole("MROLE0");
    setSubRole("SROLE0");
    setSalaryType("count");
    setAvatar("");
    setPreAvatar("");
    setPeopleDescription("");
    setBasicSalary("5200000");
    setPositionSalary("500000");
    setLaboriousBonus("500000");
    setLanguageBonus("250000");
    setVehicleBonus("200000");
    setInnBonus("300000");
    setInsurance("10");
    setOther(0);
    setSalaryDescription("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/keyword/mainrole")
      .then((res) => setMainRoleList(res.data.data));
    axios
      .get("http://localhost:8080/api/v1/keyword/subrole")
      .then((res) => setSubRoleList(res.data.data));
  }, []);
  useEffect(() => {
    const qq = async () => {
      if (isEditMode) {
        await axios
          .get(`http://localhost:8080/api/v1/ps/${editTarget}`)
          .then((res) => {
            if (res.data.errorCode === 1) {
              const data = res.data.data;
              setEmail(data?.email || "undefined");
              setPassword(data?.password || "undefined");
              setFirstName(data?.firstName || "undefined");
              setLastName(data?.lastName || "undefined");
              setGender(data?.gender || "undefined");
              setAge(data?.age || 0);
              setAddress(data?.address || "undefined");
              setPhoneNumber(data?.phoneNumber || "undefined");
              setMainRole(data?.mainRole || "undefined");
              setSubRole(data?.subRole || "undefined");
              setSalaryType(data?.salaryType || "undefined");
              setPreAvatar(data?.avatar || "undefined");
              setPeopleDescription(data?.description || "");
              setBasicSalary(data?.["people-salaryatt"]?.basicSalary || "0");
              setPositionSalary(
                data?.["people-salaryatt"]?.positionSalary || "0"
              );
              setLaboriousBonus(
                data?.["people-salaryatt"]?.laboriousBonus || "0"
              );
              setLanguageBonus(
                data?.["people-salaryatt"]?.languageBonus || "0"
              );
              setVehicleBonus(data?.["people-salaryatt"]?.vehicleBonus || "0");
              setInnBonus(data?.["people-salaryatt"]?.innBonus || "0");
              setInsurance(data?.["people-salaryatt"]?.insurance || "0");
              setOther(data?.["people-salaryatt"]?.other || "0");
              setSalaryDescription(
                data?.["people-salaryatt"]?.description || ""
              );
            }
          });
      }
    };
    qq();
  }, [editTarget, isEditMode]);

  return (
    <div
      className={
        isModalShow ? "add-edit-modal-wrap" : "add-edit-modal-wrap d-none"
      }
    >
      <div className="overlay" onClick={handleCloseModal}></div>
      <div className="add-edit-modal">
        <div className="modal-title">
          {isEditMode
            ? t("code") === "vi"
              ? "Sửa thông tin nhân sự"
              : "Edit People Infomation"
            : t("code") === "vi"
            ? "Thêm mới nhân sự"
            : "Add new people"}
        </div>
        <div className="input-group">
          <div className="form-input-wrap p50">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email"
              readOnly={isEditMode ? true : false}
              type="text"
            />
          </div>
          <div className="form-input-wrap p50">
            <label htmlFor="password">{t("peoplemodal.password")}</label>
            <input
              value={isEditMode ? "********" : password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              readOnly={isEditMode ? true : false}
              className="password"
              type="text"
            />
          </div>
        </div>
        <div className="input-group">
          <div className="form-input-wrap p30">
            <label htmlFor="firstName">{t("peoplemodal.firstname")}</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
              className="first-name"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label htmlFor="lastName">{t("peoplemodal.lastname")}</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="lastName"
              className="last-name"
              type="text"
            />
          </div>
          <div className="form-input-wrap p25">
            <label htmlFor="gender">{t("peoplemodal.gender")}</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              className="gender"
            >
              <option value="Male">{t("peoplemodal.male")}</option>
              <option value="Female">{t("peoplemodal.female")}</option>
              <option value="Orther">{t("peoplemodal.other")}</option>
            </select>
          </div>
          <div className="form-input-wrap p15">
            <label htmlFor="age">{t("peoplemodal.age")}</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              name="age"
              className="age"
              type="number"
              min={10}
              max={100}
            />
          </div>
        </div>
        <div className="input-group">
          <div className="form-input-wrap p30">
            <label htmlFor="address">{t("peoplemodal.address")}</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              className="address"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label htmlFor="phoneNumber">{t("peoplemodal.phonenumber")}</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              className="phone-number"
              type="text"
            />
          </div>
          <div className="form-input-wrap p40">
            <label htmlFor="workRoom">{t("peoplemodal.room")}</label>
            <select
              value={workRoom}
              onChange={(e) => setWorkRoom(e.target.value)}
              className="work-room"
            >
              {workRoomList.map((room, index) => {
                return (
                  <option key={index} value={room.value}>
                    {t("code") === "vi" ? room.viLabel : room.enLabel}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="input-group">
          <div className="form-input-wrap p40">
            <label htmlFor="mainRole">{t("peoplemodal.mainrole")}</label>
            <select
              value={mainRole}
              onChange={(e) => setMainRole(e.target.value)}
              name="mainRole"
            >
              {mainRoleList.map((item, index) => {
                return (
                  <option value={item.key} key={index}>
                    {t("code") === "vi" ? item.viValue : item.enValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-input-wrap p40">
            <label htmlFor="subRole">{t("peoplemodal.subrole")}</label>
            <select
              value={subRole}
              onChange={(e) => setSubRole(e.target.value)}
            >
              {subRoleList.map((item, index) => {
                return (
                  <option value={item.key} key={index}>
                    {t("code") === "vi" ? item.viValue : item.enValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-input-wrap p20">
            <label htmlFor="salaryType">{t("peoplemodal.salarytype")}</label>
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="salary-type"
            >
              <option value="count">Count</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
        </div>
        <div className="input-group has-image">
          <div className="form-input-wrap">
            <label htmlFor="description">{t("peoplemodal.description")}</label>
            <input
              value={peopleDescription}
              onChange={(e) => setPeopleDescription(e.target.value)}
              className="description"
              type="text"
            />
          </div>
          <div className="form-input-wrap">
            <label htmlFor="avatar">{t("peoplemodal.avatar")}</label>
            <input
              ref={imgField}
              value={avatar}
              onChange={(e) => handleAvatarChange(e)}
              className="avatar"
              type="file"
            />
          </div>
          <div
            className="pre-avatar"
            style={{
              backgroundImage: `url(${preAvatar})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            onClick={() => {
              setIsImagePre(true);
            }}
          >
            {isImagePre && (
              <Lightbox
                mainSrc={preAvatar}
                // nextSrc={images[(photoIndex + 1) % images.length]}
                // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setIsImagePre(false)}
              />
            )}
          </div>
        </div>
        <div className="separator">{t("peoplemodal.separatorbar")}</div>

        <div className="input-group">
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.basicsalary")}</label>
            <input
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              className="basic-salary"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.positionsalary")}</label>
            <input
              value={positionSalary}
              onChange={(e) => setPositionSalary(e.target.value)}
              className="position-salary"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.laboriousbonus")}</label>
            <input
              value={laboriousBonus}
              onChange={(e) => setLaboriousBonus(e.target.value)}
              className="laborious-bonus"
              type="text"
            />
          </div>
        </div>
        <div className="input-group">
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.languagebonus")}</label>
            <input
              value={languageBonus}
              onChange={(e) => setLanguageBonus(e.target.value)}
              className="language-bonus"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.vehicalbonus")}</label>
            <input
              value={vehicleBonus}
              onChange={(e) => setVehicleBonus(e.target.value)}
              className="vehicle-bonus"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.innbonus")}</label>
            <input
              value={innBonus}
              onChange={(e) => setInnBonus(e.target.value)}
              className="inn-bonus"
              type="text"
            />
          </div>
        </div>
        <div className="input-group">
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.insurance")}</label>
            <input
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="insurance"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.other")}</label>
            <input
              value={other}
              onChange={(e) => setOther(e.target.value)}
              className="other"
              type="text"
            />
          </div>
          <div className="form-input-wrap p30">
            <label>{t("peoplemodal.description")}</label>
            <input
              value={salaryDescription}
              onChange={(e) => setSalaryDescription(e.target.value)}
              className="salary-description"
              type="text"
            />
          </div>
        </div>
        <div className="btn-group ">
          <button onClick={isEditMode ? handleEditPeople : handleAddPeople}>
            {isEditMode
              ? t("code") === "vi"
                ? "Sửa Thông tin"
                : "Edit Infomation"
              : t("code") === "vi"
              ? "Thêm nhân sự"
              : "Add new person"}
          </button>
          <button className="cancel-btn" onClick={handleCloseModal}>
            {t("peoplemodal.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeModal;
