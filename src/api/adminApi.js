import axiosClient from "./axiosClient";

const adminApi = {
  getUserList: (params) => {
    const url = "admin/user";
    return axiosClient.get(url, { params });
  },

  getUser: (id) => {
    const url = `auth/user/${id}`;
    return axiosClient.get(url);
  },

  banUser: (id) => {
    const formData = new FormData();
    formData.append("status", 'banned');

    const url = `auth/user/${id}`;
    return axiosClient.post(url);
  },

  unbanUser: (id) => {
    const formData = new FormData();
    formData.append("status", 'active');

    const url = `auth/user/${id}`;
    return axiosClient.post(url);
  },
};

export default adminApi;
