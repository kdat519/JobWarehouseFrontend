import React, { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef } from "react/cjs/react.development";
import notifiactionAPI from "../../api/notificationAPI";
import pusher from "../../api/pusher";
import { Role, useAuth } from "../../components/auth/AuthProvider";
import EmployerNavBar from "../../components/navbar/EmployerNavBar";
import NavBar from "../../components/navbar/NavBar";
import Notification from "../../components/notifications/Notification";
import EndMsg from "./EndMsg";
import Loader from "./Loader";

const NotificationPage = () => {
  const [notiUnSeenList, setNotiUnSeenList] = useState([]);
  const [notiSeenList, setNotiSeenList] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [filters, setFilters] = useState({
    status: "seen",
    get: 10,
  });

  const notiUnSeenListRef = useRef(notiUnSeenList);

  function fetchData() {
    if (notiSeenList[notiSeenList.length - 1]) {
      setFilters({
        ...filters,
        before: notiSeenList[notiSeenList.length - 1].notification_id,
      });
    }
  }

  const unseenParams = useMemo(() => ({ status: "unseen", get: 1000 }), []);

  async function updateStatusMessage(status, id) {
    if (status === "unseen") {
      const params = { status: "seen", notification_id: id };
      // const response =
      await notifiactionAPI.update(params);
    }
  }

  useEffect(() => {
    async function fetchUnSeenNotiList() {
      try {
        const response = await notifiactionAPI.showUserNoti(unseenParams);
        notiUnSeenListRef.current = response.data;
        setNotiUnSeenList(notiUnSeenListRef.current);

        for (var i = 0; i < response.data.length; i++) {
          updateStatusMessage("unseen", response.data[i].notification_id);
        }
      } catch (error) {}
    }

    fetchUnSeenNotiList();
  }, [unseenParams]);

  useEffect(() => {
    async function fetchSeenNotiList() {
      try {
        const response = await notifiactionAPI.showUserNoti(filters);
        if (response.data.length === 0) {
          sethasMore(false);
        }
        setNotiSeenList((notiSeenList) =>
          Array.from(new Set([...notiSeenList, ...response.data]))
        );
      } catch (error) {}
    }

    fetchSeenNotiList();
  }, [filters]);

  const authContext = useAuth();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let channel = pusher.subscribe(
        "private-NotificationChannel.User." + String(authContext.user_id)
      );
      channel.bind("NotificationCreated", function (data) {
        notiUnSeenListRef.current = [data.model, ...notiUnSeenListRef.current];
        setNotiUnSeenList(notiUnSeenListRef.current);
        updateStatusMessage(data.model.status, data.model.notification_id);
      });
    }
    return () => {
      pusher.unsubscribe(
        "private-NotificationChannel.User." + String(authContext.user_id)
      );
      mounted = false;
    };
  }, [authContext.user_id]);

  return (
    <>
      <header>
        {authContext.role === Role.Employer ? <EmployerNavBar /> : <NavBar />}
      </header>
      <main className="container">
        <div className="text-center mt-5">
          <h5>Ch??a xem</h5>
        </div>
        {notiUnSeenList.map((noti) => (
          <div
            key={noti.notification_id}
            className="d-flex justify-content-center align-items-center mt-4"
          >
            <Notification noti={noti} />
          </div>
        ))}
        <div className="text-center mt-5">
          <h5>???? xem</h5>
        </div>
        <InfiniteScroll
          dataLength={notiSeenList.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMsg />}
        >
          {notiSeenList.map((noti) => (
            <div
              key={noti.notification_id}
              className="d-flex justify-content-center align-items-center mt-4"
            >
              <Notification noti={noti} />
            </div>
          ))}
        </InfiniteScroll>
      </main>
    </>
  );
};

export default NotificationPage;
