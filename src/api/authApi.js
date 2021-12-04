import axiosClient from "./axiosClient";

const authApi = {
  login: (params) => {
    const url = "auth/login";

    const formData = new FormData();
    formData.append("email", params.email);
    formData.append("password", params.password);

    return axiosClient.post(url, formData);
  },

  register: (params) => {
    const url = "auth/register";

    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("email", params.email);
    formData.append("password", params.password);
    formData.append("password_confirmation", params.password_confirmation);
    formData.append("phonenumber", params.phonenumber);
    formData.append("address", params.address);
    formData.append("role", params.role);

    return axiosClient.post(url, formData);
  },
};

export default authApi;