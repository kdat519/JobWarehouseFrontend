import axiosClient from "./axiosClient";

const adminApi = {
  getUserList: (params) => {
    const url = "admin/user";
    return axiosClient.get(url, { params });
  },

  getUser: (id) => {
    const url = `user/${id}`;
    return axiosClient.get(url);
  },

  banUser: (id) => {
    const formData = new FormData();
    formData.append("status", 'banned');
    const url = `admin/user/${id}`;
    return axiosClient.post(url, formData);
  },

  unbanUser: (id) => {
    const formData = new FormData();
    formData.append("status", 'active');

    const url = `admin/user/${id}`;
    return axiosClient.post(url, formData);
  },
};

export default adminApi;
