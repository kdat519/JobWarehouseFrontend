import axiosClient from "./axiosClient";

const recruitAPI = {
  showAll: (params) => {
    const url = "recruitment";
    return axiosClient.get(url, { params });
  }

}

export default recruitAPI;