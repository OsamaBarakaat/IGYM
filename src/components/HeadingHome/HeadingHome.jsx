import React, { useEffect, useState } from "react";
import "./HeadingHome.css";
import defaultAvatar from "../../assetss/default/5856.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";

const HeadingHome = ({ content }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: userData } = useSelector((state) => state.user);
  const [gymInfo, setGymInfo] = useState(null);
  console.log("user data", userData);
  const lang = localStorage.getItem("language");
  const { gymId } = useSelector((state) => state.user);
  const fetchGymInfo = async () => {
    try {
      const response = await axiosInstance.get(`/gyms/${gymId}`);
      console.log("gymInfo", response.data.data);
      setGymInfo(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGymInfo();
  }, []);

  // open ? `inactive-button-tooltip` :
  const profile = (props) => (
    <Tooltip id={"button-tooltip"} {...props}>
      {t("profile")}
    </Tooltip>
  );

  return (
    <div className="titleContainerHome">
      <h2 className="titleHome">{content}</h2>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 25, hide: 150 }}
        overlay={profile}
      >
        <div
          className="flexcenterstart gap-1 box"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <div>
            <div className="text-mid">{userData?.name}</div>
            <div className="text-mid">{userData?.role?.name}</div>
          </div>
          <div className="logoOfHome">
            <img
              src={gymInfo?.logo || userData?.image || defaultAvatar}
              alt="default"
            />
          </div>
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default HeadingHome;
