import { CandidateType } from "../pages/employer-jobs/CandidatesForJob";
import axiosClient from "./axiosClient";

const createOrUpdateJob = async (job, url) => {
  const formData = new FormData();
  formData.append("address", job.address);
  formData.append("category", job.category);
  formData.append("detail", job.detail);
  formData.append("job_name", job.jobName);
  formData.append("min_salary", job.minSalary);
  formData.append("requirement", job.requirement);
  const response = await axiosClient.post(url, formData);
  return response.success ? Promise.resolve() : Promise.reject();
};

export const createJob = (job) => {
  return createOrUpdateJob(job, "employer/createRecruitment");
};

export const updateJob = (id, job) => {
  return createOrUpdateJob(job, "recruitment/" + id);
};

export const updateJobStatus = async (id, status) => {
  const formData = new FormData();
  formData.append("status", status);
  const response = await axiosClient.post("recruitment/" + id, formData);
  return response.success ? Promise.resolve() : Promise.reject();
};

const ISO8601ToDate = (dateString) => {
  dateString = dateString.split("T")[0].split("-");
  return new Date(dateString[0], dateString[1] - 1, dateString[2]);
};

export const readJobs = async () => {
  const jobsUrl = "employer/recruitments";
  const candidatesUrl = "employer/getApplications";

  const responses = await Promise.all([
    axiosClient.get(jobsUrl),
    axiosClient.get(candidatesUrl),
  ]);

  const candidates = responses[1].data.flat();
  return responses[0].recruitments.map((job) => ({
    jobName: job.job_name,
    id: job.recruitment_id,
    createdAt: ISO8601ToDate(job.created_at),
    status: job.status,
    ...candidates
      .filter((candidate) => candidate.recruitment_id === job.recruitment_id)
      .reduce(
        (previousValue, currentValue) => {
          switch (currentValue.type) {
            case CandidateType.AwaitReview:
            case CandidateType.Reviewed:
              ++previousValue.candidates;
              return previousValue;
            case CandidateType.Hired:
              ++previousValue.hired;
              return previousValue;
            default:
              return previousValue;
          }
        },
        { candidates: 0, hired: 0 }
      ),
  }));
};

export const readJobDetail = async (id) => {
  const response = await axiosClient.get("recruitment/" + id);
  const job = response.recruitment;
  return {
    jobName: job.job_name,
    category: job.category,
    address: job.address,
    minSalary: job.min_salary,
    detail: job.detail.replace(/(\r\n|\r|\n)/g, "\n"),
    requirement: job.requirement.replace(/(\r\n|\r|\n)/g, "\n"),
    updatedAt: ISO8601ToDate(job.updated_at),
  };
};

export const readCandidatesForJob = async (jobId) => {
  const response = await axiosClient.get("employer/getApplications", {
    params: { recruitment_id: jobId },
  });
  return response.data[0].map((candidate) => ({
    id: candidate.job_seeker_id,
    userId: candidate.user_id,
    name: candidate.name,
    type: candidate.type,
    imgSrc: process.env.REACT_APP_API_URL + "/get-image/" + candidate.user_id,
    qualification: candidate.qualification,
  }));
};

export const updateCandidateType = async (jobId, candidateId, type) => {
  const formData = new FormData();
  formData.append("recruitment_id", jobId);
  formData.append("status", type);
  formData.append("job_seeker_id", candidateId);
  const response = await axiosClient.post("employer/recruitments", formData);
  return response.success ? readCandidatesForJob(jobId) : Promise.reject();
};
