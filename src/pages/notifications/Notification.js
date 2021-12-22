import React, { useState, useEffect } from "react";
import notifiactionAPI from "../../api/notificationAPI";
import NavBar from "../../components/navbar/NavBar";
import Notification from "../../components/notifications/Notification";
import pusher from "../../api/pusher";
import { useAuth } from "../../components/auth/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import EndMsg from "./EndMsg";
import { useRef } from "react/cjs/react.development";

const NotificationPage = () => {
  const [notiUnSeenList, setNotiUnSeenList] = useState([]);
  const [notiSeenList, setNotiSeenList] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [filters, setFilters] = useState({
    status: "seen",
    get: 10,
  })

  const notiUnSeenListRef = useRef(notiUnSeenList);

  function fetchData() {
    setFilters({ ...filters, before: notiSeenList[notiSeenList.length - 1].notification_id });
  }

  const unseenParams = { status: "unseen", get: 1000 };

  async function updateStatusMessage(status, id) {
    if (status === "unseen") {
      const params = { status: "seen", notification_id: id };
      const response = await notifiactionAPI.update(params);
    }
  }

  useEffect(() => {
    async function fetchUnSeenNotiList() {
      try {
        const response = await notifiactionAPI.showUserNoti(unseenParams);
        notiUnSeenListRef.current = response.data;
        setNotiUnSeenList(notiUnSeenListRef.current);
        console.log(response.data);

        for (var i = 0; i < response.data.length; i++) {
          updateStatusMessage('unseen', response.data[i].notification_id);
        }
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
        if (response.data.length === 0) {
          sethasMore(false);
        }
        setNotiSeenList(Array.from(new Set([...notiSeenList, ...response.data])));
      } catch (error) {
        console.log("Failed to fetch seen list: ", error);
      }
    }

    fetchSeenNotiList();
  }, [filters])

  const authContext = useAuth();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let channel = pusher.subscribe('private-NotificationChannel.User.' + String(authContext.user_id));
      channel.bind('NotificationCreated', function (data) {
        notiUnSeenListRef.current = [data.model, ...notiUnSeenListRef.current];
        setNotiUnSeenList(notiUnSeenListRef.current);
        updateStatusMessage(data.model.status, data.model.notification_id);
      })
    }
    return (() => {
      pusher.unsubscribe('private-NotificationChannel.User.' + String(authContext.user_id));
      mounted = false;
    })
  }, [])

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
