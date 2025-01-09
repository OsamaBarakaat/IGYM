import React from "react";
import "./HeadingHome.css";
import defaultAvatar from "../../assetss/default/5856.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeadingHome = ({ content }) => {
  const navigate = useNavigate();
  const { data: userData } = useSelector((state) => state.user);

  return (
    <div className="titleContainerHome">
      <h2 className="titleHome">{content}</h2>
      <div
        className="logoOfHome"
        title="profile"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <img src={userData?.image || defaultAvatar} alt="default" />
      </div>
    </div>
  );
};

export default HeadingHome;
