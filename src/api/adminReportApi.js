import axiosClient from "./axiosClient";

const adminReportApi = {
  getReportList: (params) => {
    const url = "/report";
    return axiosClient.get(url, {params});
  },

  getReportTo: (id) => {
    const url = `report/to/${id}`;
    return axiosClient.get(url);
  },

};

export default adminReportApi;
