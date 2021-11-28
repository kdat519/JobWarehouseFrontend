import axiosClient from "./axiosClient";

const authApi = {
  login: (email, password) => {
    const url = "auth/login";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    return axiosClient.post(url, formData);
  },
};

export default authApi;