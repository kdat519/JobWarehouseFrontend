import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobseekerAPI from "../../api/jobseekerAPI";
import recruitAPI from "../../api/recruitmentAPI";
import { Role, useAuth } from "../../components/auth/AuthProvider";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import NavBar from "../../components/navbar/NavBar";
import JobDescription from "./JobDescription";

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


    if (authContext.user_id) {
      let response;
      if (applicationStatus === null) {
        response = await jobseekerAPI.applyRecruit(id);
      } else {
        response = await jobseekerAPI.unapplyRecruit(id);
      }


      if (response.success) {

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

          setJobDescription(response);
        }
      } catch (error) {

      }
    }

    fetchJobDescription();
  }, [jobId]);

  return (
    <>
      <header>
        {(() => {
          switch (authContext.role) {
            case Role.Employer:
              return <EmployerNavBar />;
            default:
              return <NavBar dark />;
          }
        })()}
      </header>
      <main>
        <JobDescription
          {...jobDescription}
          handleFollowChange={handleFollowChange}
          handleStatusChange={handleStatusChange}
          editable={authContext.user_id === jobDescription.employer?.user_id}
        />
      </main>
    </>
  );
}

export default JobDescriptionPage;
