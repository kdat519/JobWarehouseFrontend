import React from "react";
import BrandName from "../../components/BrandName";
import styles from "./styles.module.scss";

const RegisPage = () => {
  return (
    <>
      <div className={styles.header}>
        <BrandName className={styles.brandName}></BrandName>
      </div>

      <div className={styles["auth-wrapper"]}>
        <div className={styles["auth-inner"]}>
          <form>
            <h3>Create an Account</h3>

            <div className={styles[("form-group", "red")]}>
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <label>Your role</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  checked
                />
                <label className="form-check-label" for="gridRadios1">
                  Employer
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="option2"
                />
                <label className="form-check-label" for="gridRadios2">
                  Job seeker
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="#">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisPage;
