import { React, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import JobDescription from "./JobDescription";
import jobseekerAPI from "../../api/jobseekerAPI"
import { useAuth } from "../../components/auth/AuthProvider";

function JobDescriptionPage() {
  const [jobDescrip, setJobDescrip] = useState(JSON.parse(localStorage.getItem("Recruit")));
  const authContext = useAuth();

  async function handleFollowChange(id, isFollowing) {
    if (authContext.user_id) {
      let response;
      if (isFollowing === 0) {
        response = await jobseekerAPI.followRecruit(id);
      } else {
        response = await jobseekerAPI.unfollowRecruit(id);
      }

      if (response.success) {
        let newJobDescrip = jobDescrip;
        newJobDescrip.isFollowing = jobDescrip.isFollowing === 0 ? 1 : 0;
        setJobDescrip(newJobDescrip);
      }
    }
  };

  async function handleStatusChange(id, applicationStatus) {
    if (authContext.user_id) {
      let response;
      if (applicationStatus === null) {
        response = await jobseekerAPI.applyRecruit(id);
      } else {
        response = await jobseekerAPI.unapplyRecruit(id);
      }
      console.log(response);

      if (response.success) {
        let newJobDescrip = jobDescrip;
        newJobDescrip.applicationStatus = jobDescrip.applicationStatus === null ? 'pending' : null;
        setJobDescrip(newJobDescrip);
      }
    }
  }
  return (
    <>
      <NavBar />
      <div
        className={`row justify-content-center w-100`}
      >
        <JobDescription recruitment={jobDescrip.recruitment} emloyer={jobDescrip.emloyer} isFollowing={jobDescrip.isFollowing} handleFollowChange={handleFollowChange} applicationStatus={jobDescrip.applicationStatus} handleStatusChange={handleStatusChange} KKey={1} />
      </div>
    </>
  )
}

export default JobDescriptionPage;