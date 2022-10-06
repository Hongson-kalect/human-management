import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./Profile.scss";

function Profile() {
  const [userInfo, setUserInfo] = useLocalStorage("user", {});
  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-title p100">Thông tin cá nhân</div>
        <div
          className="profile-avatar"
          style={{
            background: `url(${
              userInfo.avatar ? userInfo.avatar : "Undefined"
            }) center no-repeat`,
          }}
        ></div>
        <div className="input-group p90">
          <div className="form-input-wrap p100">
            <label htmlFor="email">Email:</label>
            <label
              // //onChange={(e) => setEmail(e.target.value)}
              className="email"
              //readOnly={isEditMode ? true : false}
              type="text"
            >
              {userInfo.email ? userInfo.email : "Undefined"}
            </label>
          </div>
        </div>
        <div className="input-group p90">
          <div className="form-input-wrap p30">
            <label htmlFor="firstName">First Name:</label>
            <label
              value={userInfo.firstName ? userInfo.firstName : "Undefined"}
              readOnly
              name="firstName"
              className="first-name"
              type="text"
            >
              {userInfo.firstName ? userInfo.firstName : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label htmlFor="lastName">Last Name:</label>
            <label
              value={userInfo.lastName ? userInfo.lastName : "Undefined"}
              readOnly
              name="lastName"
              className="last-name"
              type="text"
            >
              {userInfo.lastName ? userInfo.lastName : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p25">
            <label htmlFor="gender">Gender:</label>
            <label
              value={userInfo.gender ? userInfo.gender : "Undefined"}
              readOnly
              name="gender"
              className="gender"
            >
              {userInfo.gender ? userInfo.gender : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p15">
            <label htmlFor="age">Age:</label>
            <label
              value={userInfo.age ? userInfo.age : "Undefined"}
              ////onChange={(e) => setAge(e.target.value)}
              name="age"
              className="age"
              type="number"
              min={10}
              max={100}
            >
              {userInfo.age ? userInfo.age : "Undefined"}
            </label>
          </div>
        </div>
        <div className="input-group p90">
          <div className="form-input-wrap p30">
            <label htmlFor="address">Address:</label>
            <label
              value={userInfo.address ? userInfo.address : "Undefined"}
              ////onChange={(e) => setAddress(e.target.value)}
              name="address"
              className="address"
              type="text"
            >
              {userInfo.address ? userInfo.address : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <label
              value={userInfo.phoneNumber ? userInfo.phoneNumber : "Undefined"}
              ////onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              className="phone-number"
              type="text"
            >
              {userInfo.phoneNumber ? userInfo.phoneNumber : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p40">
            <label htmlFor="workRoom">Room:</label>
            <label
              value={userInfo.workRoom ? userInfo.workRoom : "Undefined"}
              // //onChange={(e) => setWorkRoom(e.target.value)}
              className="work-room"
              readOnly
            >
              {userInfo.workRoom ? userInfo.workRoom : "Undefined"}
            </label>
          </div>
        </div>
        <div className="input-group p90">
          <div className="form-input-wrap p40">
            <label htmlFor="mainRole">Main Role:</label>
            <label
              value={userInfo.mainRole ? userInfo.mainRole : "Undefined"}
              //onChange={(e) => setMainRole(e.target.value)}
              name="mainRole"
              readOnly
            >
              {userInfo?.["mainrole-keyword.enValue"]
                ? userInfo["mainrole-keyword.enValue"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p40">
            <label htmlFor="subRole">Sub Role:</label>
            <label
              readOnly
              //onChange={(e) => setSubRole(e.target.value)}
            >
              {userInfo?.["subrole-keyword.enValue"]
                ? userInfo["subrole-keyword.enValue"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p20">
            <label htmlFor="salaryType">Salary Type:</label>
            <label>
              {userInfo.salaryType ? userInfo.salaryType : "Undefined"}
            </label>
          </div>
        </div>
        <div className="separator p90">Salary and Bonus per month</div>

        <div className="input-group p100">
          <div className="form-input-wrap p30">
            <label>Basic Salary:</label>
            <label>
              {userInfo?.["people-salaryatt.basicSalary"]
                ? userInfo?.["people-salaryatt.basicSalary"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label>Position Salary:</label>
            <label>
              {userInfo?.["people-salaryatt.positionSalary"]
                ? userInfo?.["people-salaryatt.positionSalary"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label>Laborious Salary:</label>
            <label>
              {userInfo?.["people-salaryatt.laboriousBonus"]
                ? userInfo?.["people-salaryatt.laboriousBonus"]
                : "Undefined"}
            </label>
          </div>
        </div>
        <div className="input-group p100">
          <div className="form-input-wrap p30">
            <label>Language Bonus:</label>
            <label>
              {userInfo?.["people-salaryatt.languageBonus"]
                ? userInfo?.["people-salaryatt.languageBonus"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label>Vehicle Bonus:</label>
            <label>
              {userInfo?.["people-salaryatt.vehicleBonus"]
                ? userInfo?.["people-salaryatt.vehicleBonus"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label>Inn Bonus:</label>
            <label>
              {userInfo?.["people-salaryatt.innBonus"]
                ? userInfo?.["people-salaryatt.innBonus"]
                : "Undefined"}
            </label>
          </div>
        </div>
        <div className="input-group p100">
          <div className="form-input-wrap p30">
            <label>Insurance:</label>
            <label>
              {userInfo?.["people-salaryatt.insurance"]
                ? userInfo?.["people-salaryatt.insurance"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label>Other:</label>
            <label>
              {userInfo?.["people-salaryatt.other"]
                ? userInfo?.["people-salaryatt.other"]
                : "Undefined"}
            </label>
          </div>
          <div className="form-input-wrap p30">
            <label>Description:</label>
            <label>
              {userInfo?.["people-salaryatt.description"]
                ? userInfo?.["people-salaryatt.description"]
                : "Undefined"}
            </label>
          </div>
        </div>
        {/* <div className="input-group has-image">
      <div className="form-input-wrap">
        <label htmlFor="description">Description</label>
        <label
          value={userInfo.Description}
          //onChange={(e) => setPeopleDescription(e.target.value)}
          className="description"
          type="text"
        />
      </div>
      <div className="form-input-wrap">
        <label htmlFor="avatar">Avatar</label>
        <label
          ref={imgField}
          value={avatar}
          //onChange={(e) => handleAvatarChange(e)}
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
    <div className="separator">Salary and Bonus per month</div>

    <div className="input-group">
      <div className="form-input-wrap p30">
        <label>Basic Salary</label>
        <label
          value={basicSalary}
          //onChange={(e) => setBasicSalary(e.target.value)}
          className="basic-salary"
          type="text"
        />
      </div>
      <div className="form-input-wrap p30">
        <label>Position Salary</label>
        <label
          value={positionSalary}
          //onChange={(e) => setPositionSalary(e.target.value)}
          className="position-salary"
          type="text"
        />
      </div>
      <div className="form-input-wrap p30">
        <label>Laborious Salary</label>
        <label
          value={laboriousBonus}
          //onChange={(e) => setLaboriousBonus(e.target.value)}
          className="laborious-bonus"
          type="text"
        />
      </div>
    </div>
    <div className="input-group">
      <div className="form-input-wrap p30">
        <label>Language Bonus</label>
        <label
          value={languageBonus}
          //onChange={(e) => setLanguageBonus(e.target.value)}
          className="language-bonus"
          type="text"
        />
      </div>
      <div className="form-input-wrap p30">
        <label>Vehicle Bonus</label>
        <label
          value={vehicleBonus}
          //onChange={(e) => setVehicleBonus(e.target.value)}
          className="vehicle-bonus"
          type="text"
        />
      </div>
      <div className="form-input-wrap p30">
        <label>Inn Bonus</label>
        <label
          value={innBonus}
          //onChange={(e) => setInnBonus(e.target.value)}
          className="inn-bonus"
          type="text"
        />
      </div>
    </div>
    <div className="input-group">
      <div className="form-input-wrap p30">
        <label>Insurance</label>
        <label
          value={insurance}
          //onChange={(e) => setInsurance(e.target.value)}
          className="insurance"
          type="text"
        />
      </div>
      <div className="form-input-wrap p30">
        <label>Other</label>
        <label
          value={other}
          //onChange={(e) => setOther(e.target.value)}
          className="other"
          type="text"
        />
      </div>
      <div className="form-input-wrap p30">
        <label>Description</label>
        <label
          value={salaryDescription}
          //onChange={(e) => setSalaryDescription(e.target.value)}
          className="salary-description"
          type="text"
        />
      </div>
    </div>
    <div className="btn-group ">
      <button onClick={isEditMode ? handleEditPeople : handleAddPeople}>
        {isEditMode ? "Sửa Thông tin" : "Thêm nhân sự"}
      </button>
      <button className="cancel-btn" onClick={handleCloseModal}>
        Huỷ
      </button>
    </div>*/}
      </div>
    </div>
  );
}

export default Profile;
