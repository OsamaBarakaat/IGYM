import React, { useEffect, useState } from "react";
import "./Notifications.css";
import avatar from "../../assetss/default/5856.jpg";
import PushNotifications from "./PushNotifications/PushNotifications";
import Heading from "../../components/Heading/Heading";
import { useTranslation } from "react-i18next";
import Subscriptions from "./Subscriptions/Subscriptions";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";

const Notifications = ({ socket }) => {
  const [notfications, setNotifications] = useState([]);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const axiosPrivate = useAxiosPrivate();
  const { gymId } = useSelector((state) => state.user);

  const fetchNotifications = async () => {
    try {
      const { data } = await axiosPrivate.get(`/gyms/${gymId}/notifications`);
      setNotifications(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on("refetch notification", () => {
      console.log("refetch notification");
      fetchNotifications();
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      socket.off("refetch notification");
    };
  }, []);
  return (
    <div className="GeneralSettingsOne" style={{ minHeight: "100vh" }}>
      <aside className="GeneralSettingsOneSidebar">
        <p className="cursor-pointer">{t("Notifications")}</p>
        <nav className="GeneralSettingsOneNav">
          <ul>
            <li
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              {t("Notifications")}
            </li>
            <li
              onClick={() => {
                setCurrentPage(2);
              }}
            >
              {t("Push Notifications")}
            </li>
            <li
              onClick={() => {
                setCurrentPage(3);
              }}
            >
              {t("Subscriptions")}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-GS-content">
        <div className="secondNav">
          <div className="head">{t("Settings")}</div>
          <div className="secondNavItems">
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              {t("Notifications")}
            </div>
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(2);
              }}
            >
              {t("Push Notifications")}
            </div>
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(3);
              }}
            >
              {t("Subscriptions")}
            </div>
          </div>
        </div>
        {currentPage === 1 && (
          <>
            {windowWidth > 1024 && (
              <HeadingNoBack content={t("Notifications")} />
            )}
            <div className="allNotifications bigCard my-3">
              {notfications.map((notification) => (
                <div className="singleNotif">
                  <div className="notifContent flexcenterbetween w-100">
                    <div className="text-end">
                      <p className="text-center">{notification.title}</p>
                      <p className="text-center">{notification.message}</p>
                    </div>
                    <div>
                      <p className="text-center opacity-50 midText">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {currentPage === 2 && (
          <>
            <div>
              <PushNotifications />
            </div>
          </>
        )}
        {currentPage === 3 && (
          <>
            <Subscriptions socket={socket} />
          </>
        )}
      </main>
    </div>
  );
};

export default Notifications;
