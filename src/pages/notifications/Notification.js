import React, { useState, useEffect } from "react";
import notifiactionAPI from "../../api/notificationAPI";
import NavBar from "../../components/navbar/NavBar";
import Notification from "../../components/notifications/Notification";
//import pusher from "../../api/pusher";
//import { useAuth } from "../../components/auth/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import EndMsg from "./EndMsg";

const NotificationPage = () => {
  const [notiUnSeenList, setNotiUnSeenList] = useState([]);
  const [notiSeenList, setNotiSeenList] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [filters, setFilters] = useState({
    status: "seen",
    get: 10,
  })


  function fetchData() {
    setFilters({ ...filters, before: notiSeenList[notiSeenList.length - 1].notification_id });
  }

  const unseenParams = { status: "unseen", get: 1000 };

  useEffect(() => {
    async function fetchUnSeenNotiList() {
      try {
        const response = await notifiactionAPI.showUserNoti(unseenParams);
        setNotiUnSeenList(response.data);
      } catch (error) {
        console.log("Failed to fetch unseen list: ", error);
      }
    }

    fetchUnSeenNotiList();
  }, [])

  useEffect(() => {
    async function fetchSeenNotiList() {
      try {
        const response = await notifiactionAPI.showUserNoti(filters);
        console.log(response.data);
        if (response.data.length === 0) {
          sethasMore(false);
        }
        setNotiSeenList([...notiSeenList, ...response.data]);
      } catch (error) {
        console.log("Failed to fetch seen list: ", error);
      }
    }

    fetchSeenNotiList();
  }, [filters])

  /*const authContext = useAuth();
  console.log('private-NotificationChannel.User.' + String(authContext.user_id));
  var channel = pusher.subscribe('private-NotificationChannel.User.52');
  channel.bind('NotificationCreated', function (data) {
    console.log(data);
  })*/

  return (
    <>
      <NavBar />
      <div className="text-center mt-5"><h5>Chưa xem</h5></div>
      {notiUnSeenList.map((noti) => (
        <div key={noti.notification_id} className="d-flex justify-content-center align-items-center mt-4">
          <Notification noti={noti} />
        </div>
      ))}
      <div className="text-center mt-5"><h5>Đã xem</h5></div>
      <InfiniteScroll
        dataLength={notiSeenList.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMsg />}
      >
        {notiSeenList.map((noti) => (
          <div key={noti.notification_id} className="d-flex justify-content-center align-items-center mt-4">
            <Notification noti={noti} />
          </div>
        ))}
      </InfiniteScroll>
    </>
  )

}

export default NotificationPage;
