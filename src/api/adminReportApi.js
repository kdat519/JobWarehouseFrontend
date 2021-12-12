import axiosClient from "./axiosClient";

const adminReportApi = {
  getReportList: (params) => {
    const url = "/report";
    return axiosClient.get(url, {params});
  },
};

export default adminReportApi;
