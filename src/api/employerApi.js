import axiosClient from "./axiosClient";

export const readEmployers = async (search = "") => {
  const response = await axiosClient.get("employers", {
    params: { searchContent: search },
  });
  return response.success
    ? response.employers.map((employer) => ({
        imgSrc: employer.image_link,
        url: "",
        name: employer.name,
        category: employer.category,
        numOfEmployees: employer.num_employee,
        about: employer.about_us,
      }))
    : Promise.reject();
};
