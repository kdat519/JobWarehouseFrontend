import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import styles from './styles.module.scss';
import UserList from "../../components/message/userList";
import ChatLine from "../../components/message/chatLine";

const MessagePage = (props) => {
  const { role } = props;
  return (
    <>
      {role === 'jobseekers' ? <NavBar /> : <EmployerNavBar />}
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      <div class="container mt-3">
        <div class="row clearfix">
          <div class="col-lg-12">
            <div class={`${styles['card']} ${styles['chat-app']}`}>
              <div id="plist" class={`${styles['people-list']}`}>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class={`${styles['font-size']} input-group-text`}><i class="fa fa-search"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Search..." />
                </div>
                <ul class={`list-unstyled ${styles['chat-list']} mt-2 mb-0`}>
                  <UserList avatar={""} name={"Luong Dat"} active={"seen"} />
                  <UserList avatar={""} name={"Ban gai"} active={"active"} />
                  <UserList avatar={""} name={"Pham Duy Anh"} active={""} />
                  <UserList avatar={""} name={"Pham Duy Anh"} active={""} />
                  <UserList avatar={""} name={"Pham Duy Anh"} active={""} />
                  <UserList avatar={""} name={"Pham Duy Anh"} active={""} />
                  <UserList avatar={""} name={"Pham Duy Anh"} active={""} />
                  <UserList avatar={""} name={"Pham Duy Anh"} active={""} />
                </ul>
              </div>
              <div class={`${styles['chat']}`}>
                <div class={`${styles['chat-header']} clearfix`}>
                  <div class="row">
                    <div class="col-lg-6">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                      <div class={`${styles['chat-about']}`}>
                        <h6 class="mb-0">Luong Dat</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class={`${styles['chat-history']} ${styles['h-27']} overflow-auto`}>
                  <ul class="mb-0">
                    <ChatLine content="Hi, Dat! How are you" belongs="me" time="10:10 AM, Today" />
                    <ChatLine content="Are we meeting today?" belongs="other" time="10:12 AM, Today" />
                    <ChatLine content="Are we meeting today?" belongs="other" time="10:12 AM, Today" />
                    <ChatLine content="Are we meeting today?" belongs="other" time="10:12 AM, Today" />
                  </ul>
                </div>
                <div class={`${styles['chat-message']} clearfix`}>
                  <div class="input-group mb-0">
                    <div class="input-group-prepend">
                      <span class={`${styles['font-size']} input-group-text`}><i class="fa fa-send"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="Enter text here..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessagePage;