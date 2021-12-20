import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import CardRecruit from "../../components/CardRecruitment";
import SearchForm from "../../components/search-form/SearchForm";
import styles from "./styles.module.scss";
import JobDescription from "./JobDescription";
import recruitAPI from "../../api/recruitmentAPI";
import jobseekerAPI from "../../api/jobseekerAPI";
import Pagination from "../../components/UserList/Pagination";
import { useAuth } from "../../components/auth/AuthProvider";


function RecruitmentPage() {
  const [recruitList, setRecruitList] = useState([]);
  const [listByPage, setListByPage] = useState([]);
  const [currentPage, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [jobDescrip, setJobDescrip] = useState({});
  const [totalRecruit, setTotalRecruit] = useState(0);

  const [filter, setFilter] = useState({
    address: "",
    category: "",
    min_salary: "",
    create_at: "",
  })

  const authContext = useAuth();

  function handleFilterChange(newFilters) {

    setFilter({
      ...filter,
      address: newFilters.address,
      category: newFilters.category,
      min_salary: newFilters.min_salary,
      create_at: newFilters.create_at
    })
  }

  function handleJobDescripChange(value) {
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
        const response = await recruitAPI.showAll(filter);
        setRecruitList(response);
        console.log(response);
        setPage(1);
        setJobDescrip(response[0]);
        setListByPage(response.slice(0, 5));
        setLastPage(Math.ceil(response.length / 5));
        setTotalRecruit(response.length);
      } catch (error) {
        console.log("Failed to fetch user list: ", error);
      }
    }

    fetchRecruitList();
  }, [filter]);

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
    }
  }

  return (
    <>
      <NavBar />
      <div className={`row justify-content-center ${styles["mt-6"]} w-100`}>
        <div className="col-12 col-lg-8">
          <SearchForm onSearchFormChange={handleFilterChange} />
        </div>
      </div>

      <div
        className={`row justify-content-center ${styles["mt-6"]} bg-light w-100`}
      >
        <div className={`col-12 col-lg-5 mt-5 `}>
          <div className={`${styles["ml-1"]} ${styles["size-08"]} `}>
            <p className="text-muted mb-1 mt-2">{totalRecruit} công việc</p>
            <p className="mb-0">Sắp xếp theo: Ngày đăng tin</p>
          </div>
          {listByPage.map((recruit) => (
            <div key={recruit.recruitment.recruitment_id}>
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
        <JobDescription recruitment={jobDescrip.recruitment} emloyer={jobDescrip.emloyer} isFollowing={jobDescrip.isFollowing} handleFollowChange={handleFollowChange} applicationStatus={jobDescrip.applicationStatus} handleStatusChange={handleStatusChange} />
      </div>
    </>
  );
};

export default RecruitmentPage;
