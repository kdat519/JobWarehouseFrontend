import axiosClient from "./axiosClient";

const jobseekerAPI = {
  followRecruit: (params) => {
    const url = "jobseeker/follow";
    const formData = new FormData();
    formData.append('recruitment_id', params);
    return axiosClient.post(url, formData);
  },

  unfollowRecruit: (params) => {
    const url = "jobseeker/unfollow";
    const formData = new FormData();
    formData.append('recruitment_id', params);
    return axiosClient.post(url, formData);
  },

  applyRecruit: (params) => {
    const url = "jobseeker/apply";
    const formData = new FormData();
    formData.append('recruitment_id', params);
    return axiosClient.post(url, formData);
  },

  unapplyRecruit: (params) => {
    const url = "jobseeker/unApply";
    const formData = new FormData();
    formData.append('recruitment_id', params);
    return axiosClient.post(url, formData);
  }
}

export default jobseekerAPI;