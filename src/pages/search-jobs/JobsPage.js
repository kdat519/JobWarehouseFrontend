import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jobseekerAPI from "../../api/jobseekerAPI";
import recruitAPI from "../../api/recruitmentAPI";
import doodle from "../../assets/empty-doodle.svg";
import { Role, useAuth } from "../../components/auth/AuthProvider";
import CardRecruit from "../../components/CardRecruitment";
import Pagination from "../../components/list/Pagination";
import NavBar from "../../components/navbar/NavBar";
import SearchForm from "../../components/search-form/SearchForm";
import { fireErrorMessage } from "../../components/swal-error-message";
import JobDescription from "./JobDescription";
import styles from "./styles.module.scss";

function RecruitmentPage({ interestOnly = false }) {
  const [recruitList, setRecruitList] = useState([]);
  const [listByPage, setListByPage] = useState([]);
  const [currentPage, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [jobDetail, setJobDetail] = useState({});
  const [totalRecruit, setTotalRecruit] = useState(0);

  const [filter, setFilter] = useState({
    address: "",
    job_name: "",
    min_salary: "",
    created_at: "",
  });

  const authContext = useAuth();

  let navigate = useNavigate();

  function handleFilterChange(newFilters) {
    setFilter({
      ...filter,
      address: newFilters.address,
      job_name: newFilters.category,
      min_salary: newFilters.min_salary,
      created_at: newFilters.create_at,
    });
  }

  function handleChooseJob(value) {
    console.log(JSON.stringify(value));
    if (window.innerWidth <= 992) {
      navigate(`/jobs/${value.recruitment.recruitment_id}`);
    }
    setJobDetail(value);
  }

  function handelPageChange(page) {
    setPage(page);
    setListByPage(recruitList.slice((page - 1) * 5, page * 5));
    setJobDetail(recruitList[(page - 1) * 5]);
  }

  useEffect(() => {
    async function fetchRecruitList() {
      try {
        const response = interestOnly
          ? await jobseekerAPI.showInterestRecruit()
          : await recruitAPI.showAll(filter);
        if (response) setRecruitList(response);
        else setRecruitList([]);
        // console.log(response);
        setPage(1);
        setJobDetail(response[0]);
        setListByPage(response.slice(0, 5));
        setLastPage(Math.ceil(response.length / 5));
        setTotalRecruit(response.length);
      } catch (error) {
        fireErrorMessage();
        // console.log("Failed to fetch user list: ", error);
      }
    }

    fetchRecruitList();
  }, [filter, interestOnly]);

  async function handleFollowChange(id, isFollowing) {
    if (authContext.role === Role.JobSeeker) {
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
            setJobDetail(recruit);
          }
        }
        setRecruitList(newRecruitList);
        setListByPage(
          newRecruitList.slice((currentPage - 1) * 5, currentPage * 5)
        );
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  }

  async function handleStatusChange(id, applicationStatus) {
    if (authContext.role === Role.JobSeeker) {
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
            recruit.applicationStatus =
              recruit.applicationStatus === null ? "pending" : null;
            setJobDetail(recruit);
          }
        }
        setRecruitList(newRecruitList);
        setListByPage(
          newRecruitList.slice((currentPage - 1) * 5, currentPage * 5)
        );
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  }

  return (
    <>
      <header className="mb-5">
        <NavBar />
      </header>
      <main className="container">
        {interestOnly ? (
          <h1 className="fw-bold mb-5 text-center">
            Tin tuyển dụng đang quan tâm
          </h1>
        ) : (
          <div className={`row justify-content-center mb-5`}>
            <div className="col-12 col-lg-8">
              <SearchForm onSearchFormChange={handleFilterChange} />
            </div>
          </div>
        )}

        {totalRecruit > 0 ? (
          <div className={`row justify-content-center`}>
            <div className={`col-12 col-lg-5`}>
              <div className={`${styles["ml-2"]} ${styles["size-08"]} `}>
                <p className="text-muted mb-1 mt-2">{totalRecruit} công việc</p>
                <p className="mb-0">Sắp xếp theo: Ngày đăng tin</p>
              </div>
              {listByPage.map((recruit) => (
                <div
                  key={recruit.recruitment.recruitment_id}
                  className="d-flex justify-content-center"
                >
                  <CardRecruit recruit={recruit} onClick={handleChooseJob} />
                </div>
              ))}
              <div>
                <Pagination
                  last_page={lastPage}
                  current_page={currentPage}
                  onPageChange={handelPageChange}
                />
              </div>
            </div>
            <div
              className={`col-12 col-lg-6 mt-2 d-none d-lg-block ${styles["position-sticky"]}`}
            >
              <div
                className={`shadow border-secondary card bg-white px-2 pt-3 pb-4 ${styles["vh-75"]}`}
              >
                <JobDescription
                  {...jobDetail}
                  handleFollowChange={handleFollowChange}
                  handleStatusChange={handleStatusChange}
                  isCard
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-12 col-md-5">
              <img src={doodle} alt="" />
              <h6 className="display-6 fs-2 text-center">
                Không có kết quả nào!
              </h6>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default RecruitmentPage;
