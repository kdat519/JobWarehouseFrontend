import React from "react";
import NavBar from "../../components/NavBar";
import CardRecruit from "../../components/CardRecruitment";
import SearchForm from "../../components/SearchForm";
import styles from './styles.module.scss';

const Paligation = () => {
  return (
    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  )
}

const JobDescription = () => {
  return (
    <div className={`col-12 col-lg-5 mt-5 ${styles["position-sticky"]}`}>
      <div className={`shadow border-bottom-0 border-secondary card px-2 pt-4 pb-2 bg-white ${styles["border-radius-top"]}`}>
        <div className="card-body">
          <h5 className={`card-title ${styles["font-weight-bold"]} mb-4`}>Primary Phase Leader</h5>
          <h6 className="card-subtitle mb-2 text-muted">Nord Anglia Education</h6>
          <h6 className="card-subtitle mb-2 text-muted">Hà Nội</h6>
          <button type="button" className={`btn btn-primary px-5 ${styles["font-weight-bold"]} mt-1`}>Đăng ký xin việc</button>
          <button type="button" className={`btn btn-secondary mt-1 ${styles["ml-1"]}`}>
            <i className={`bi bi-heart ${styles["font-size-25"]} px-1 mt-1`} ></i>
          </button>
        </div>
      </div>
      <div className={`shadow border-top-0 border-secondary card bg-white px-2 pb-5 ${styles["border-radius-bot"]} overflow-auto ${styles["h-25"]}`}>
        <div className="card-body">
          <p><b>Phase Leader with a Class Responsibility in the Primary School.</b></p>
          <p>British International School Hanoi is looking to appoint a Primary Phase Leader to join our talented and dedicated team of educators from August 2022.</p>
          <p>The Primary School at BIS is a collaborative, forward-thinking team consisting of highly motivated teachers who deliver the highest quality learning to our students. Students commence their learning aged 2-3 in our EYFS and progress through to Year 6. At the end of their Primary phase of education, students transition into their Secondary education, as BIS Hanoi is a through school</p>
          <p>The ideal candidate already has middle leadership experience and is a forward-thinker, committed to the students’ learning and their own continued professional development. They build excellent relationships with staff and understand the importance of a high performing team. Being an outstanding role model in the classroom means they can provide support and challenge to develop other staff in the team. A strong understanding of both the academic and pastoral skills needed to carry out this role is crucial. Phase Leaders support student wellbeing and also lead on pupil progress as they are responsible for all learners in their phase. The successful candidate will work alongside two other phase leaders, Assistant Head, Deputy Head and Head of Primary as a member of the Primary Leadership Team.</p>
          <p><b>Our teachers</b></p>
          <ul>
            <li>Deliver outstanding teaching and learning so that every student is challenged, makes progress, and thrives in a safe, inclusive, and stimulating learning environment.</li>
            <li>Commit to knowing students well, ensuring that learning is personalised so students can take their own next step in their learning progress</li>
            <li>Continually look for opportunities for innovation, trying new teaching and learning strategies in the classroom, contributing to a culture of experimentation and risk-taking</li>
            <li>Always promote the well-being of students, and proactively safeguard students according to school safeguarding policies and procedures, following them at all times.</li>
            <li>Skillfully integrate learning technology into practice, selecting the most appropriate tools to enhance the learning experience.</li>
          </ul>
          <p>For full details of the position, please see job description attached below.</p>
          <p>The closing date for application is Friday 10th December 2021 at 8am Hanoi time although we reserve the right to interview and make an appointment before the advertised closing date for the role. Therefore, an early application is recommended.</p>
          <p><b>Interviews:</b> will be conducted online</p>
          <p><b>Start Date:</b> August 2022</p>
          <p><b>To apply for this position, please click the ‘Apply’ button below</b></p>
          <p>Nord Anglia Education</p>
          <p>3 days ago</p>
        </div>
      </div>
    </div>
  )
}



const RecruitmentPage = () => {
  return (
    <>
      <NavBar />
      <div className={`row justify-content-center ${styles["mt-6"]} w-100`}>
        <div className="col-12 col-lg-8">
          <SearchForm />
        </div>
      </div>

      <div className={`row justify-content-center ${styles["mt-6"]} bg-light w-100`}>
        <div className={`col-12 col-lg-5 mt-5 `}>
          <div className={`${styles["ml-1"]} ${styles["size-08"]} `}>
            <p className="text-muted mb-1 mt-2">999 công việc</p>
            <p className="mb-0">Sắp xếp theo: Ngày đăng tin</p>
          </div>
          <CardRecruit />
          <CardRecruit />
          <CardRecruit />
          <CardRecruit />
          <CardRecruit />
        </div>
        <JobDescription />
        <div className="d-flex justify-content-center mt-3">
          <Paligation />
        </div>
      </div>

    </>
  )
}


export default RecruitmentPage;