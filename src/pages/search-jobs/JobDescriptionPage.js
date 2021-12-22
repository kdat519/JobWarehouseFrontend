import { React, useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import JobDescription from "./JobDescription";
import jobseekerAPI from "../../api/jobseekerAPI";
import { useAuth } from "../../components/auth/AuthProvider";
import { useParams } from "react-router-dom";
import recruitAPI from "../../api/recruitmentAPI";
import { useNavigate } from "react-router-dom";

function JobDescriptionPage() {
  const [jobDescription, setJobDescription] = useState({});
  const authContext = useAuth();
  const { jobId } = useParams();

  let navigate = useNavigate();

  async function handleFollowChange(id, isFollowing) {
    if (authContext.user_id) {
      let response;
      if (isFollowing === 0) {
        response = await jobseekerAPI.followRecruit(id);
      } else {
        response = await jobseekerAPI.unfollowRecruit(id);
      }

      if (response.success) {
        let newJobDescription = { ...jobDescription };
        newJobDescription.isFollowing =
          jobDescription.isFollowing === 0 ? 1 : 0;
        localStorage.setItem("Recruit", JSON.stringify(newJobDescription));
        setJobDescription(newJobDescription);
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  }

  async function handleStatusChange(id, applicationStatus) {
    console.log(id);
    console.log(applicationStatus);
    if (authContext.user_id) {
      let response;
      if (applicationStatus === null) {
        response = await jobseekerAPI.applyRecruit(id);
      } else {
        response = await jobseekerAPI.unapplyRecruit(id);
      }
      console.log(response);

      if (response.success) {
        console.log("thay doi application status");
        let newJobDescription = { ...jobDescription };
        newJobDescription.applicationStatus =
          jobDescription.applicationStatus === null ? "pending" : null;
        setJobDescription(newJobDescription);
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  }

  useEffect(() => {
    async function fetchJobDescription() {
      try {
        const response = await recruitAPI.showOne(jobId);

        if (response.success) {
          console.log(response);
          setJobDescription(response);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchJobDescription();
  }, [jobId]);

  return (
    <>
      <header>
        <NavBar dark />
      </header>
      <main>
        <JobDescription
          {...jobDescription}
          handleFollowChange={handleFollowChange}
          handleStatusChange={handleStatusChange}
        />
      </main>
    </>
  );
}

export default JobDescriptionPage;
