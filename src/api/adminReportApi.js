import axiosClient from "./axiosClient";

const adminReportApi = {
  getReports: (params) => {
    const url = "/report";
    return axiosClient.get(url, {params});
  },

  getReportsTo: (id, params) => {
    const url = `report/to/${id}`;
    return axiosClient.get(url, {params});
  },

  getReportsFrom: (id, params) => {
    const url = `report/from/${id}`;
    return axiosClient.get(url, {params});
  },

  creatReport: (params) => {
    const url = "/report/create";

    const formData = new FormData();
    formData.append("detail", params.detail);
    formData.append("status", "unseen");
    formData.append("receiver_id", params.receiver_id);

    return axiosClient.post(url, formData);
  },
};

export default adminReportApi;
