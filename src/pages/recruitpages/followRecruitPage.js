import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import CardRecruit from "../../components/CardRecruitment";
import styles from "./styles.module.scss";
import JobDescription from "./JobDescription";
import jobseekerAPI from "../../api/jobseekerAPI";
import Pagination from "../../components/UserList/Pagination";
import { useAuth } from "../../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";


function FollowRecruitPage() {
  const [recruitList, setRecruitList] = useState([]);
  const [listByPage, setListByPage] = useState([]);
  const [currentPage, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [jobDescrip, setJobDescrip] = useState({});
  const [totalRecruit, setTotalRecruit] = useState(0);

  const authContext = useAuth();

  let navigate = useNavigate();

  function handleJobDescripChange(value) {
    console.log(JSON.stringify(value));
    if (window.innerWidth <= 1200) {
      navigate(`/jobdescrips/${value.recruitment.recruitment_id}`, { replace: true });
    }
    setJobDescrip(value);
  }

  function handelPageChange(page) {
    setPage(page);
    setListByPage(recruitList.slice((page - 1) * 5, page * 5));
    setJobDescrip(recruitList[(page - 1) * 5]);
  }

  useEffect(() => {
    async function fetchRecruitList() {
      try {
        const response = await jobseekerAPI.showInterestRecruit();
        setRecruitList(response.data);
        console.log(response.data.slice(0, 5));
        setPage(1);
        setJobDescrip(response.data[0]);
        setListByPage(response.data.slice(0, 5));
        setLastPage(Math.ceil(response.data.length / 5));
        setTotalRecruit(response.data.length);
      } catch (error) {
        console.log("Failed to fetch user list: ", error);
      }
    }

    fetchRecruitList();
  }, []);

  async function handleFollowChange(id, isFollowing) {
    if (authContext.user_id) {
      let response;
      if (isFollowing === 0) {
        response = await jobseekerAPI.followRecruit(id);
      } else {
        response = await jobseekerAPI.unfollowRecruit(id);
      }
      if (response.success) {
        let newRecruitList = [...recruitList];
        for (const recruit of newRecruitList) {
          if (recruit.recruitment.recruitment_id === id) {
            recruit.isFollowing = recruit.isFollowing === 0 ? 1 : 0;
            setJobDescrip(recruit);
          }
        }
        setRecruitList(newRecruitList);
        setListByPage(newRecruitList.slice((currentPage - 1) * 5, currentPage * 5));
      }
    } else {
      navigate(`/login`, { replace: true });
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
      if (response.success) {
        let newRecruitList = [...recruitList];
        for (const recruit of newRecruitList) {
          if (recruit.recruitment.recruitment_id === id) {
            recruit.applicationStatus = recruit.applicationStatus === null ? 'pending' : null;
            setJobDescrip(recruit);
          }
        }
        setRecruitList(newRecruitList);
        setListByPage(newRecruitList.slice((currentPage - 1) * 5, currentPage * 5));
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  }

  return (
    <>
      <NavBar />
      <div
        className={`row justify-content-center ${styles["mt-6"]} bg-light w-100`}
      >
        <div className={`col-12 col-lg-5 mt-5 `}>
          <div className={`${styles["ml-1"]} ${styles["size-08"]} `}>
            <p className="text-muted mb-1 mt-2">{totalRecruit} công việc</p>
            <p className="mb-0">Sắp xếp theo: Ngày đăng tin</p>
          </div>
          {listByPage.map((recruit) => (
            <div key={recruit.recruitment.recruitment_id} className="d-flex d-xl-block justify-content-center">
              <CardRecruit recruit={recruit} onClick={handleJobDescripChange} />
            </div>
          ))}
          <div className={`container ${styles["ml--2"]}`}>
            <Pagination
              last_page={lastPage}
              current_page={currentPage}
              onPageChange={handelPageChange}
            />
          </div>
        </div>
        <JobDescription recruitment={jobDescrip.recruitment} employer={jobDescrip.employer} isFollowing={jobDescrip.isFollowing} handleFollowChange={handleFollowChange} applicationStatus={jobDescrip.applicationStatus} handleStatusChange={handleStatusChange} />
      </div>
    </>
  );
};

export default FollowRecruitPage;
