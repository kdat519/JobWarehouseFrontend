import React, { useEffect, useRef, useState } from "react";
import authApi from "../../api/authApi";
import messageAPI from "../../api/messageAPI";
import pusher from "../../api/pusher";
import { useAuth } from "../../components/auth/AuthProvider";
import ChatLine from "../../components/message/ChatLine";
import UserList from "../../components/message/UserList";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import NavBar from "../../components/navbar/NavBar";
import { Link } from "react-router-dom";

const MessagePage = () => {
  const authContext = useAuth();
  const role = authContext.role;

  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [filteruserList, setFilterUserList] = useState({
    user_id: authContext.user_id,
    get: 10,
  });
  const [chatName, setChatName] = useState("");
  const [email, setEmail] = useState("");

  const [filterMessageList, setFilterMessageList] = useState({
    other_id: null,
    get: 20,
  });

  const [imageLink, setImageLink] = useState("");

  const filterMessageListRef = useRef(filterMessageList);

  const messageListRef = useRef(messageList);

  const messagesEndRef = useRef(null);
  const newMessageRef = useRef(null);

  const nameRef = useRef("");

  const userRef = useRef({});
  const userListRef = useRef([]);

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function handleSearchChange(e) {
    getUserList(e.target.value);
  }

  async function getUserList(name) {
    if (name === "") {
      nameRef.current = "";
      const response = await messageAPI.showLatestChat(filteruserList);
      userListRef.current = response.data;
      setUserList(response.data);
    } else {
      nameRef.current = name;

      const params = {
        searchContent: name,
      };
      const response = await authApi.getUsers(params);
      userListRef.current = response.users;
      setUserList(response.users);
    }
  }

  function handleClickUserList(id, name, email) {
    filterMessageListRef.current = { other_id: id, get: 20 };
    setFilterMessageList(filterMessageListRef.current);
    setImageLink(authApi.imageURL(id));
    setChatName(name);
    setEmail(email);
  }

  function handleSubmitText(e) {
    if (e.key === "Enter") {
      CreateMessage(e.target.value);
      e.target.value = "";
    }
  }

  function addUsertoList(user) {
    let newUserList = [...userListRef.current];
    let j = -1;
    for (let i = 0; i < newUserList.length; i++) {
      if (user.other_id === newUserList[i].other_id) {
        j = i;
      }
    }
    if (j === -1) {
      newUserList = [user, ...newUserList];
    } else {
      newUserList = [
        user,
        ...newUserList.slice(0, j),
        ...newUserList.slice(j + 1, newUserList.length),
      ];
    }
    userListRef.current = newUserList;
    setUserList(newUserList);
  }

  async function CreateMessage(detail) {
    const params = {
      detail: detail,
      status: "unseen",
      receiver_id: filterMessageList.other_id,
    };
    const response = await messageAPI.createChat(params);
    if (response.success) {
      const messageModel = {
        message_id: response.data.message_id,
        detail: detail,
        status: "unseen",
        receiver_id: filterMessageList.other_id,
        sender_id: authContext.user_id,
        created_at: new Date(),
      };
      messageListRef.current = [...messageListRef.current, messageModel];
      setMessageList(messageListRef.current);
      scrollToBottom();
      if (nameRef.current === "") {
        const users = {
          other_id: filterMessageList.other_id,
          name: chatName,
          email: email,
        };
        addUsertoList(users);
      }
    }
  }

  async function UpdateMessage() {
    for (let i = 0; i < messageListRef.current.length; i++) {
      if (
        messageListRef.current[i].status === "unseen" &&
        messageListRef.current[i].receiver_id === authContext.user_id
      ) {
        const params = {
          status: "seen",
          message_id: messageListRef.current[i].message_id,
        };
        const response = await messageAPI.updateChat(params);

        if (response.success) {
          messageListRef.current[i].status = "seen";
        }
      }
    }
    setMessageList(messageListRef.current);
  }

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = messageAPI.showLatestChat(filteruserList);
        response.then((res) => {
          if (res.data.length > 0) {
            filterMessageListRef.current = {
              other_id: res.data[0].other_id,
              get: 20,
            };

            setFilterMessageList(filterMessageListRef.current);
            setChatName(res.data[0].name);
            setEmail(res.data[0].email);
            setImageLink(authApi.imageURL(res.data[0].other_id));
          }
          userListRef.current = res.data;
          setUserList(res.data);
        });
      } catch (error) {

      }
    }

    fetchUserList();
  }, [filteruserList]);

  useEffect(() => {
    async function fetchChatList() {
      try {
        const response = messageAPI.showChatBetween(filterMessageList);
        response.then((res) => {
          messageListRef.current = res.data.reverse();
          UpdateMessage();
          setMessageList(messageListRef.current);
          scrollToBottom();
        });
      } catch (error) {

      }
    }

    fetchChatList();
  }, [filterMessageList]);

  async function getUser(id) {
    try {
      const response = await authApi.getUser(id);

      if (response.success) {
        userRef.current = response.data;
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let channel = pusher.subscribe(
        "private-MessageChannel.User." + String(authContext.user_id)
      );
      channel.bind("MessageCreated", function (data) {
        if (nameRef.current === "") {
          getUser(data.model.sender_id);
          const User = userRef.current;
          if (User[0] && User[0].user_id === data.model.sender_id) {
            const users = {
              other_id: data.model.sender_id,
              name: User[0].name,
              email: User[0].email,
            };
            addUsertoList(users);
          } else {
            getUserList("");
          }
        }
        if (
          filterMessageListRef.current.other_id === data.model.sender_id ||
          filterMessageListRef.current.other_id === data.model.receiver_id
        ) {
          messageListRef.current = [...messageListRef.current, data.model];
          UpdateMessage();
          setMessageList(messageListRef.current);
          scrollToBottom();
        }
      });
    }
    return () => {
      pusher.unsubscribe(
        "private-MessageChannel.User." + String(authContext.user_id)
      );
      mounted = false;
    };
  }, []);


  return (
    <div className="d-flex flex-column vh-100">
      <header>{role === "jobseeker" ? <NavBar /> : <EmployerNavBar />}</header>
      <main className="d-flex align-items-center" style={{ flex: "0 1 100%" }}>
        <div className="container">
          <div class="d-flex d-md-none input-group mb-2">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Tìm kiếm người dùng..."
              onChange={handleSearchChange}
            />
          </div>
          <div class="row align-items-center">
            <div class="col-2 col-md-4">
              <div class="d-none d-md-flex input-group mb-2">
                <span class="input-group-text">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tìm kiếm người dùng..."
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div class="col-10 col-md-8 border-start">
              <h6
                className={
                  "display-6 border-bottom " + (userList.length ? "d-none" : "")
                }
              >
                Bắt đầu nhắn tin
              </h6>
              <div
                class={
                  "row border-bottom align-items-center py-2 " +
                  (userList.length ? "" : "d-none")
                }
              >
                <div className="col-1 pe-0">
                  <img
                    className="rounded-circle w-100"
                    src={imageLink}
                    alt="avatar"
                  />
                </div>
                <div className="col">
                  <Link className="fw-bold m-0 h6 text-decoration-none" to={`/profile/${filterMessageListRef.current.other_id}`}>{chatName}</Link>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ height: "70vh" }}>
            <div class="col-2 col-md-4 h-100" style={{ overflowY: "auto" }}>
              {userList.map((user) => (
                <UserList
                  key={user.other_id}
                  user={user}
                  handleClickUserList={handleClickUserList}
                  active={filterMessageList.other_id === user.other_id}
                />
              ))}
            </div>
            <div class="col-10 col-md-8 overflow-auto border-start h-100">
              {messageList.map((message) => (
                <ChatLine key={message.message_id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div class="row">
            <div class="col-2 col-md-4" />
            <div class="col-10 col-md-8 border-start">
              <div class="input-group py-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập tin nhắn..."
                  onKeyPress={handleSubmitText}
                  ref={newMessageRef}
                />
                <button
                  class="btn btn-outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    CreateMessage(newMessageRef.current.value);
                    newMessageRef.current.value = "";
                  }}
                >
                  <i class="bi bi-send" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
