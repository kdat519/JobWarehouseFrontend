import axiosClient from "./axiosClient";

const adminReportApi = {
  getReports: (params) => {
    const url = "/review";
    return axiosClient.get(url, { params });
  },

  getReportsTo: (id, params) => {
    const url = `review/to/${id}`;
    return axiosClient.get(url, { params });
  },

  getReportsFrom: (id, params) => {
    const url = `review/from/${id}`;
    return axiosClient.get(url, { params });
  },

  creatReport: (params) => {
    const url = "/review/create";

    const formData = new FormData();
    formData.append("detail", params.detail);
    formData.append("status", "unseen");
    formData.append("receiver_id", params.receiver_id);

    return axiosClient.post(url, formData);
  },
};

export default adminReportApi;
