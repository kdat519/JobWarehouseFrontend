import React from "react";
import NavBar from "../../components/NavBar";
import CardRecruit from "../../components/CardRecruitment";
import SearchForm from "../../components/SearchForm";
import styles from './styles.module.scss';
const RecruitmentPage = () => {
  return (
    <>
      <NavBar />
      <div className={`row justify-content-center ${styles["mt-6"]}`}>
					<div className="col-12 col-lg-8">
						<SearchForm />
					</div>
				</div>
      <div className={`${styles["mt-6"]} bg-light`}>
        <div className={`${styles["ml-10"]} ${styles["inline-block"]}`}>
          <CardRecruit />
          <CardRecruit />
          <CardRecruit />
          <CardRecruit />
          <CardRecruit />
        </div>
      </div>
    </>
  )
}

export default RecruitmentPage;