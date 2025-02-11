import React from "react";
import "./HeadingHome.css";
import defaultAvatar from "../../assetss/default/5856.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useTranslation } from "react-i18next";

const HeadingHome = ({ content }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: userData } = useSelector((state) => state.user);
  console.log("user data", userData);
  const lang = localStorage.getItem("language");

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
            <img src={userData?.image || defaultAvatar} alt="default" />
          </div>
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default HeadingHome;
