import React, { useEffect, useState } from "react";
import "./Notifications.css";
import avatar from "../../assetss/default/5856.jpg";
import PushNotifications from "./PushNotifications/PushNotifications";
import Heading from "../../components/Heading/Heading";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="GeneralSettingsOne" style={{ minHeight: "100vh" }}>
      <aside className="GeneralSettingsOneSidebar">
        <p className="cursor-pointer">Notifications</p>
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
            {windowWidth > 1024 && <Heading content={"Notifications"} />}
            <div className="allNotifications bigCard my-3">
              <div className="singleNotif">
                <div className="notifIcon">
                  <div className="logo-small">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="notifContent flexcenterbetween">
                  <div className="text-start">
                    <p>New Member</p>
                    <p>John Doe has joined the group</p>
                  </div>
                  <div>
                    <small>12/3/2024</small>
                  </div>
                </div>
              </div>
              <div className="singleNotif">
                <div className="notifIcon">
                  <div className="logo-small">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="notifContent flexcenterbetween">
                  <div className="text-start">
                    <p>New Member</p>
                    <p>John Doe has joined the group</p>
                  </div>
                  <div>
                    <small>12/3/2024</small>
                  </div>
                </div>
              </div>
              <div className="singleNotif">
                <div className="notifIcon">
                  <div className="logo-small">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="notifContent flexcenterbetween">
                  <div className="text-start">
                    <p>New Member</p>
                    <p>John Doe has joined the group</p>
                  </div>
                  <div>
                    <small>12/3/2024</small>
                  </div>
                </div>
              </div>{" "}
              <div className="singleNotif">
                <div className="notifIcon">
                  <div className="logo-small">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="notifContent flexcenterbetween">
                  <div className="text-start">
                    <p>New Member</p>
                    <p>John Doe has joined the group</p>
                  </div>
                  <div>
                    <small>12/3/2024</small>
                  </div>
                </div>
              </div>{" "}
              <div className="singleNotif">
                <div className="notifIcon">
                  <div className="logo-small">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="notifContent flexcenterbetween">
                  <div className="text-start">
                    <p>New Member</p>
                    <p>John Doe has joined the group</p>
                  </div>
                  <div>
                    <small>12/3/2024</small>
                  </div>
                </div>
              </div>{" "}
              <div className="singleNotif">
                <div className="notifIcon">
                  <div className="logo-small">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="notifContent flexcenterbetween">
                  <div className="text-start">
                    <p>New Member</p>
                    <p>John Doe has joined the group</p>
                  </div>
                  <div>
                    <small>12/3/2024</small>
                  </div>
                </div>
              </div>{" "}
              <div className="singleNotif">
                <div className="notifIcon">
                  <div className="logo-small">
                    <img src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="notifContent flexcenterbetween">
                  <div className="text-start">
                    <p>New Member</p>
                    <p>John Doe has joined the group</p>
                  </div>
                  <div>
                    <small>12/3/2024</small>
                  </div>
                </div>
              </div>
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
            <div>Subscriptions</div>
          </>
        )}
      </main>
    </div>
  );
};

export default Notifications;
