import axiosClient from "./axiosClient";

export const readEmployers = async (search = "", page = 1) => {
  const response = await axiosClient.get("employers", {
    params: { searchContent: search, page: page },
  });
  return response.success
    ? {
        employers: response.employers.data.map((employer) => ({
          imgSrc:
            process.env.REACT_APP_API_URL + "/get-image/" + employer.user_id,
          url: "/profile/" + employer.user_id,
          name: employer.name,
          category: employer.category,
          numOfEmployees: employer.num_employee,
          about: employer.about_us,
        })),
        currentPage: response.employers.current_page,
        lastPage: response.employers.last_page,
      }
    : Promise.reject();
};
