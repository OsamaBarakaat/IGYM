import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./SubNew.css"; // Import your CSS file for styling
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";

const NotificationItem = ({
  name,
  subscriptionsInfo,
  status,
  onAccept,
  onReject,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // Detect language direction

  return (
    <div className={`singleNotif ${isRTL ? "rtl" : "ltr"}`}>
      <div className="notifContent flexcenterbetween">
        <div className="text-end">
          <p className="text-center">{t("New Member")}</p>
          <p className="text-center">
            {name} -- {t("has joined the group")}
          </p>
          <p className="text-center opacity-50 midText">{subscriptionsInfo}</p>
        </div>
        <div>{status}</div>
        {status === "pending" && (
          <div className="actions">
            <button className="SecondaryButton" onClick={onAccept}>
              {t("Accept")}
            </button>
            <button className="DangerButton" onClick={onReject}>
              {t("Reject")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SubNew = ({ socket }) => {
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

  const handleAccept = async (id) => {
    try {
      await axiosPrivate.patch(`/gyms/${gymId}/subscriptions/${id}`, {
        status: "accepted",
      });
      toast.success(t("Subscription accepted successfully"));
      fetchSubscriptions();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosPrivate.patch(`/gyms/${gymId}/subscriptions/${id}`, {
        status: "rejected",
      });
      toast.success(t("Subscription rejected successfully"));
      fetchSubscriptions();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const { gymId } = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();

  const [Subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosPrivate.get(`/gyms/${gymId}/subscriptions`);
      setSubscriptions(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
    socket?.on("new subscription", () => {
      fetchSubscriptions();
    });
  }, []);

  return (
    <>
      {windowWidth > 1024 && <HeadingNoBack content={t("Subscriptions")} />}
      <div className="allNotifications bigCard my-3">
        {Subscriptions.map((notif, index) => (
          <NotificationItem
            key={index}
            name={notif.user?.name}
            subscriptionsInfo={
              notif?.plan?.name
                ? `(${notif.plan.name}) plan`
                : `(${notif.privatePackage?.cost}/${notif.privatePackage?.sessions}) package`
            }
            status={notif.status}
            onAccept={() => handleAccept(notif._id)}
            onReject={() => handleReject(notif._id)}
          />
        ))}
      </div>
    </>
  );
};

export default SubNew;
