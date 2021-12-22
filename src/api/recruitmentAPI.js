import axiosClient from "./axiosClient";

const recruitAPI = {
  showAll: (params) => {
    const url = "recruitment";
    return axiosClient.get(url, { params });
  },

  showOne: (id) => {
    const url = `recruitment/${id}`;
    return axiosClient.get(url);
  }
}

export default recruitAPI;