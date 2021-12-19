import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/navbar/NavBar";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import styles from './styles.module.scss';
import UserList from "../../components/message/userList";
import ChatLine from "../../components/message/chatLine";
import { useAuth } from "../../components/auth/AuthProvider";
import messageAPI from "../../api/messageAPI";
import authApi from "../../api/authApi";
import pusher from "../../api/pusher";

const MessagePage = () => {
  const authContext = useAuth();
  const role = authContext.role;

  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [filteruserList, setFilterUserList] = useState({
    user_id: authContext.user_id,
    get: 20,
  })
  const [chatName, setChatName] = useState('');

  const [filterMessageList, setFilterMessageList] = useState({
    other_id: null,
    get: 100,
  })

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  function handleSearchChange(e) {
    getUserList(e.target.value);
  }

  async function getUserList(name) {
    if (name === '') {
      const response = await messageAPI.showLatestChat(filteruserList);
      setUserList(response.data);
    } else {
      const params = {
        searchContent: name,
      }
      const response = await authApi.getUsers(params);
      setUserList(response.users);
    }
  }

  function handleClickUserList(id, name) {
    console.log(id);
    setFilterMessageList({
      other_id: id,
      get: 100
    });
    setChatName(name);
  }

  function handleSubmitText(e) {
    if (e.key === "Enter") {
      CreateMessage(e.target.value);
      e.target.value = ''
    }
  }

  async function CreateMessage(detail) {
    console.log(filterMessageList.other_id);
    const params = {
      detail: detail,
      status: 'unseen',
      receiver_id: filterMessageList.other_id,
    }
    const response = await messageAPI.createChat(params);
    console.log(response);

    if (response.success) {
      console.log("Tao tin nhan thanh cong");
      scrollToBottom();
    }
  }

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = messageAPI.showLatestChat(filteruserList);
        response.then((res) => {
          console.log(res.data[0].other_id);
          setFilterMessageList({
            other_id: res.data[0].other_id,
            get: 100,
          });
          setUserList(res.data);
          setChatName(res.data[0].name);
        })
      } catch (error) {
        console.log("Failed to fetch user list: ", error);
      }
    }

    fetchUserList();
  }, [filteruserList]);

  useEffect(() => {
    async function fetchChatList() {
      try {
        const response = messageAPI.showChatBetween(filterMessageList);
        response.then((res) => {
          setMessageList(res.data.reverse());
          scrollToBottom();
        })
      } catch (error) {
        console.log("Failed to fetch user list: ", error);
      }
    }

    fetchChatList();
  }, [filterMessageList]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let channel = pusher.subscribe('private-MessageChannel.User.' + String(authContext.user_id));
      channel.bind('MessageCreated', function (data) {
        console.log(data);
        console.log(filterMessageList);
        if (filterMessageList.other_id === data.model.sender_id || filterMessageList.other_id === data.model.receiver_id) {
          setMessageList([...messageList, data.model]);
          scrollToBottom();
        }
      })
    }
    return (() => {
      pusher.unsubscribe('private-MessageChannel.User.' + String(authContext.user_id));
      mounted = false;
    })
  }, [])

  return (
    <>
      {role === 'jobseeker' ? <NavBar /> : <EmployerNavBar />}
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      <div class="mt-3 mx-3">
        <div class="row clearfix">
          <div class="col-lg-12">
            <div class={`${styles['card']} ${styles['chat-app']}`}>
              <div id="plist" class={`${styles['people-list']}`}>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class={`${styles['font-size']} input-group-text`}><i class="fa fa-search"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Search..." onChange={handleSearchChange} />
                </div>
                <ul class={`list-unstyled ${styles['chat-list']} mt-2 mb-0`}>
                  {userList.map((user) => (
                    <div key={user.other_id}>
                      <UserList user={user} handleClickUserList={handleClickUserList}></UserList>
                    </div>
                  ))}
                </ul>
              </div>
              <div class={`${styles['chat']}`}>
                <div class={`${styles['chat-header']} clearfix`}>
                  <div class="row">
                    <div class="col-lg-6">
                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                      <div class={`${styles['chat-about']} ${styles['margin']}`}>
                        <h6 class="mb-0">{chatName}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class={`${styles['chat-history']} ${styles['h-27']} overflow-auto`}>
                  <ul class="mb-0">
                    {messageList.map((message) => (
                      <div key={message.message_id}>
                        <ChatLine message={message} />
                      </div>
                    ))}
                  </ul>
                  <div ref={messagesEndRef} />
                </div>
                <div class={`${styles['chat-message']} clearfix`}>
                  <div class="input-group mb-0">
                    <div class="input-group-prepend">
                      <span class={`${styles['font-size']} input-group-text`}><i class="fa fa-send"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="Enter text here..." onKeyPress={handleSubmitText} />
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