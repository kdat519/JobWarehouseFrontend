import axiosClient from "./axiosClient";

const reportAPI = {
  createReport: (params) => {
    const url = "report/create";
    const formData = new FormData();
    formData.append("detail", params.detail);
    formData.append("receiver_id", params.receiver_id);
    formData.append("status", "unseen");

    return axiosClient.post(url, formData);
  },
};

export default reportAPI;
