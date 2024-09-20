import React, { useEffect, useState } from "react";
import avatar from "../../../assetss/default/5856.jpg";
import Heading from "../../../components/Heading/Heading";
import { useTranslation } from "react-i18next";
import "./Subscriptions.css"; // Import your CSS file for styling

const NotificationItem = ({ name, date, onAccept, onReject }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // Detect language direction

  return (
    <div className={`singleNotif ${isRTL ? "rtl" : "ltr"}`}>
      <div className="notifContent flexcenterbetween">
        <div className="text-end">
          <p className="text-center">{t("New Member")}</p>
          <p className="text-center">
            {name} {t("has joined the group")}
          </p>
          <p className="text-center opacity-50 midText">{date}</p>
        </div>
        <div className="actions">
          <button className="SecondaryButton" onClick={onAccept}>
            {t("Accept")}
          </button>
          <button className="DangerButton" onClick={onReject}>
            {t("Reject")}
          </button>
        </div>
      </div>
    </div>
  );
};

const Subscriptions = () => {
  const { t, i18n } = useTranslation();
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

  const handleAccept = (name) => {
    console.log(`${name} has been accepted.`);
    // Implement further logic here
  };

  const handleReject = (name) => {
    console.log(`${name} has been rejected.`);
    // Implement further logic here
  };

  const notifications = [
    { name: "John Doe", date: "12/3/2024" },
    { name: "Jane Smith", date: "15/3/2024" },
    { name: "Alice Johnson", date: "17/3/2024" },
    { name: "Robert Brown", date: "20/3/2024" },
  ];

  return (
    <>
      {windowWidth > 1024 && <Heading content={t("Subscriptions")} />}
      <div className="allNotifications bigCard my-3">
        {notifications.map((notif, index) => (
          <NotificationItem
            key={index}
            name={notif.name}
            date={notif.date}
            onAccept={() => handleAccept(notif.name)}
            onReject={() => handleReject(notif.name)}
          />
        ))}
      </div>
    </>
  );
};

export default Subscriptions;
