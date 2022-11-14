import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "./ExtendModal.scss";

function ExtendModal({
  id,
  value,
  setPeopleList,
  setIsExtendModalShow,
  setEmergencyList,
}) {
  const [expiredDay, setExpiredDay] = useState(value);
  const handleClick = async () => {
    const res = await axios({
      url: "http://localhost:8080/api/v1/extend",
      method: "put",
      data: {
        id,
        dayOut: expiredDay,
      },
    });

    if (res.data.errorCode === 1) toast.success("Thực hiện thành công");
    await handleCloseModal();
  };
  const handleCloseModal = async () => {
    setIsExtendModalShow(false);
    await axios.get("http://localhost:8080/api/v1/ps").then((respon) => {
      console.log(respon);
      setPeopleList(respon.data.data);
    });
    axios
      .get("http://localhost:8080/api/v1/p/expired")
      .then((respon) => setEmergencyList(respon.data.data));
  };
  return (
    <div className="extend-modal-container">
      <p className="title">Ngày hết hạn hợp đồng</p>
      <input type="text" value={id} className="d-none" readOnly />
      <input
        type="date"
        value={expiredDay}
        onChange={(e) => {
          setExpiredDay(e.target.value);
        }}
      />
      <button onClick={handleClick}>Xác nhận</button>
    </div>
  );
}

export default ExtendModal;
