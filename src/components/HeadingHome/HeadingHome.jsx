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
import Loader from "../Loader/Loader";
import { Spinner } from "react-bootstrap";

const HeadingHome = ({ content }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: userData, gymId } = useSelector((state) => state.user);
  const [gymInfo, setGymInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const fetchGymInfo = async () => {
    try {
      const response = await axiosInstance.get(`/gyms/${gymId}`);
      setGymInfo(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchGymInfo();
  }, []);

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
          onClick={() => navigate("/profile")}
        >
          <div>
            <div className="text-mid">{userData?.name}</div>
            <div className="text-mid">{userData?.role?.name}</div>
          </div>
          <div className="logoOfHome">
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <img src={gymInfo?.logo || defaultAvatar} alt="Gym Logo" />
            )}
          </div>
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default HeadingHome;
