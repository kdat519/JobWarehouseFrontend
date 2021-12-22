import { React, useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import JobDescription from "./JobDescription";
import jobseekerAPI from "../../api/jobseekerAPI"
import { useAuth } from "../../components/auth/AuthProvider";
import { useParams } from "react-router-dom";
import recruitAPI from "../../api/recruitmentAPI";
import { useNavigate } from "react-router-dom";

function JobDescriptionPage() {
  const [jobDescrip, setJobDescrip] = useState({});
  const authContext = useAuth();
  const { userId } = useParams();

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
        let newJobDescrip = { ...jobDescrip };
        newJobDescrip.isFollowing = jobDescrip.isFollowing === 0 ? 1 : 0;
        localStorage.setItem("Recruit", JSON.stringify(newJobDescrip));
        setJobDescrip(newJobDescrip);
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  };

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
        let newJobDescrip = { ...jobDescrip };
        newJobDescrip.applicationStatus = jobDescrip.applicationStatus === null ? 'pending' : null;
        setJobDescrip(newJobDescrip);
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  }

  useEffect(() => {
    async function fetchJobDesCrip() {
      try {
        const response = await recruitAPI.showOne(userId);

        if (response.success) {
          console.log(response);
          setJobDescrip(response);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchJobDesCrip();
  }, [])

  return (
    <>
      <NavBar />
      <div
        className={`row justify-content-center w-100`}
      >
        <JobDescription recruitment={jobDescrip.recruitment} employer={jobDescrip.employer} isFollowing={jobDescrip.isFollowing} handleFollowChange={handleFollowChange} applicationStatus={jobDescrip.applicationStatus} handleStatusChange={handleStatusChange} KKey={1} />
      </div>
    </>
  )
}

export default JobDescriptionPage;