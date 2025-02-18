import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { Link, useLocation } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Badge from "react-bootstrap/Badge";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const SideBar = () => {
  const axiosPrivate = useAxiosPrivate();
  const { gymId } = useSelector((state) => state.user);
  const [gymName, setGymName] = useState("");
  const fetchGymData = async () => {
    try {
      const { data } = await axiosPrivate.get(`/gyms/${gymId}`);
      if (data) {
        console.log(data.data);
        setGymName(data?.data?.name);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchGymData();
  }, [gymId]);

  const [open, setOpen] = useState(true);
  const [click, setClick] = useState(false);
  const unReadNotfication = useSelector((state) => state.unReadNotification);

  const toggelShow = () => {
    setClick(!click);
  };
  const toggleClose = () => {
    setOpen(!open);
  };

  const Home = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Home")}
    </Tooltip>
  );
  const Trainees = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Trainees")}
    </Tooltip>
  );
  const Coaches = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Coaches")}
    </Tooltip>
  );
  const Plans = (props) => (
    <Tooltip
      id={open || click ? `inactive-button-tooltip` : "button-tooltip "}
      {...props}
    >
      {t("Plans")}
    </Tooltip>
  );
  const Classes = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Classes")}
    </Tooltip>
  );
  const Notifications = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Notifications")}
    </Tooltip>
  );
  const Subscriptions = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Subscriptions")}
    </Tooltip>
  );

  const iGymPlans = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("iGymPlans")}
    </Tooltip>
  );
  const Settings = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Settings")}
    </Tooltip>
  );

  const Profile = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("Profile")}
    </Tooltip>
  );
  const invitations = (props) => (
    <Tooltip
      id={open ? `inactive-button-tooltip` : "button-tooltip"}
      {...props}
    >
      {t("invitations")}
    </Tooltip>
  );

  const { t } = useTranslation();

  const lang = localStorage.getItem("language");

  return (
    <>
      <aside className={open ? "sideBar" : "inactiveSideBar"}>
        <div className="logoOfSideBar">
          {/* <img src={gymLogo || ""} alt="logo" className="logoSmall" /> */}
          <div class="wrapper">
            <div>
              <h3 class="flicker-text">
                <Link to={"/settings"} className="noStyle">{gymName}</Link>
              </h3>
            </div>
          </div>
        </div>
        <ul className="ulOfSideBar">
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Home}
          >
            <Link to={"/"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Home")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Trainees}
          >
            <Link to={"/trainees"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Trainees")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Coaches}
          >
            <Link to={"/coaches"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-arms-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z" />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Coaches")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Plans}
          >
            <Link to={"/plans"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-list-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
                    />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Plans")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Classes}
          >
            <Link to={"/Classes"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-lines-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Classes")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={invitations}
          >
            <Link to={"/invitations"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-send-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686" />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("invitations")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={iGymPlans}
          >
            <Link to={"/subscreptions"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-flower2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4m3-12q0 .11-.03.247c-.544.241-1.091.638-1.598 1.084A3 3 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1 1 0 0 1 5 4a3 3 0 0 1 6 0m-.812 6.052A3 3 0 0 0 11 8a3 3 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a7 7 0 0 1-.647-.487m-3.56.617a3 3 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084q.03.137.03.247a3 3 0 1 1-6 0q0-.11.03-.247c.544-.242 1.091-.638 1.598-1.084m-.816-4.721A3 3 0 0 0 5 8c0 .794.308 1.516.812 2.052a7 7 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("iGymPlans")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Subscriptions}
          >
            <Link to={"/subnew"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Subscriptions")}</span>
              </li>
            </Link>
          </OverlayTrigger>

          <Link to={"/notifications"} className="Link">
            <OverlayTrigger
              placement={lang === "ar" ? "left" : "right"}
              delay={{ show: 25, hide: 150 }}
              overlay={Notifications}
            >
              <span>
                <li>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bell-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                    </svg>
                  </span>
                  <span className="spanOfTitleOfUl">
                    {t("Notifications")}
                    {unReadNotfication > 0 && (
                      <Badge bg="danger">{unReadNotfication}</Badge>
                    )}
                  </span>
                </li>
              </span>
            </OverlayTrigger>
          </Link>

          <Link to={"/settings"} className="Link">
            <OverlayTrigger
              placement={lang === "ar" ? "left" : "right"}
              delay={{ show: 25, hide: 150 }}
              overlay={Settings}
            >
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-sliders"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
                    />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Settings")}</span>
              </li>
            </OverlayTrigger>
          </Link>
          <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Profile}
          >
            <Link to={"/profile"} className="Link">
              <li>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.150 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </span>
                <span className="spanOfTitleOfUl">{t("Profile")}</span>
              </li>
            </Link>
          </OverlayTrigger>
          {/* <OverlayTrigger
            placement={lang === "ar" ? "left" : "right"}
            delay={{ show: 25, hide: 150 }}
            overlay={Help}
          >
            <li>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </span>
              <span className="spanOfTitleOfUl">Help</span>
            </li>
          </OverlayTrigger> */}
        </ul>

        <div className="collapseSideBar">
          <button onClick={toggleClose}>
            <span>
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-bar-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-bar-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
                  />
                </svg>
              )}
            </span>
            <span className="spanOfTitleOfUl">{t("Collapse menu")}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
