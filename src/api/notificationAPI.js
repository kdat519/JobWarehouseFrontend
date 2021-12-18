import axiosClient from "./axiosClient";

const notifiactionAPI = {
  showAll: (params) => {
    const url = "notification";
    return axiosClient.get(url, { params });
  },

  create: (params) => {
    const url = "notification/create";
    return axiosClient.post(url, { params });
  },

  update: (params) => {
    const url = "notification/update";
    const formData = new FormData();
    console.log(params.notification_id);
    formData.append("status", params.status);
    formData.append("notification_id", params.notification_id);
    //console.log(formData);
    return axiosClient.post(url, formData);
  },

  showUserNoti: (params) => {
    const url = "notification/user/status";
    return axiosClient.get(url, { params });
  },

  countNoti: (params) => {
    const url = "notification/user/status/count";
    return axiosClient.get(url, { params });
  }
}

export default notifiactionAPI;