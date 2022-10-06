import axios from "axios";
import myInfo from "../myinfo.json";

const uploadImage = async (file) => {
  var formData = new FormData();
  formData.append("image", file);
  formData.append("key", myInfo.imgbbKey);
  const res = await axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload",
    data: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export { uploadImage };
