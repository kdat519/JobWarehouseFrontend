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

  getProfile: () => {
    const url = "auth/user-profile";

    return axiosClient.get(url);
  },

  updateEmployerProfile: (params) => {
    const url = "auth/user-profile";

    const formData = new FormData();
    formData.append("about_us", params.about_us);
    formData.append("num_employee", params.num_employee);
    formData.append("category", params.category);

    return axiosClient.post(url, formData);
  },

  updateJobSeekerProfile: (params) => {
    const url = "auth/user-profile";
    const formData = new FormData();
    formData.append("birthday", params.birthday);
    formData.append("gender", params.gender);
    formData.append("qualification", params.qualification);
    formData.append("work_experience", params.work_experience);
    formData.append("skill", params.skill);
    formData.append("education", params.education);
    return axiosClient.post(url, formData);
  },

  updatePassword: (params) => {
    const url = "auth/change-password";

    const formData = new FormData();
    formData.append("new_password", params.new_password);

    return axiosClient.post(url, formData);
  },
  
};

export default authApi;
