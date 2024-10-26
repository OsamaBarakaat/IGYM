import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import "./Roles.css";
import { useNavigate } from "react-router-dom";
import { Trash2Icon } from "lucide-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const Roles = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { gymId } = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  const rolesArray = [
    "GYM_INFO",
    "MEMBERS",
    "TRAINEES",
    "COACHES",
    "CLASSES",
    "PLANS",
    "PRIVATE_SESSIONS",
    "NOTIFICATIONS",
    "ROLES",
    "SUBSCRIPTION",
  ];

  const handleEditRole = (roleId) => {
    navigate(`/editrole/${roleId}`);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const { data } = await axiosPrivate.delete(
        `/gyms/${gymId}/roles/${roleId}`
      );
      console.log(data);
      toast.success(t("Role deleted successfully"));
      fetchRoles();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data } = await axiosPrivate.get(`/gyms/${gymId}/roles`);
      setRoles(data.data.documents);
      setLoading(false);
      console.log("roles", data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="myInfo">
      <div className="myInfoHeading">
        <Heading content={t("Roles")} />
      </div>

      <div className="myInfoContent m-2">
        <div className="roles">
          {roles.map((role, index) => {
            return (
              <div className="singleRole bigCard" key={index}>
                <div className="d-flex justify-content-end align-items-center">
                  <button
                    className="PrimaryButton mx-1"
                    onClick={() => handleEditRole(role._id)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </span>
                    <span>{t("Edit")}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role._id)}
                    className="DangerButton"
                  >
                    <span>
                      <Trash2Icon size={16} />
                    </span>
                    <span>{t("Delete")}</span>
                  </button>
                </div>
                <div className="roleName fontLarge text-center">
                  {role.name}
                </div>
                <p className="opacityL font-smaller">{t("Access")}</p>
                <div className="line2 flexcenterbetween flex-wrap">
                  {role?.permissions.map((permission, index) => {
                    return (
                      <div
                        key={index}
                        className=" w-40 m-1 p-1 flexcenterstart"
                      >
                        <span className="spanSVGPrimary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-check2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                          </svg>
                        </span>
                        <span className="">{permission}</span>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <p className="opacityL font-smaller">{t("Not Access")}</p>
                <div className="line2 flexcenterbetween flex-wrap">
                  {rolesArray
                    .filter((pr) => !role.permissions.includes(pr))
                    .map((role, index) => {
                      return (
                        <div
                          key={index}
                          className=" w-40 m-1 p-1 flexcenterstart"
                        >
                          <span className="spanSVGDanger">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-ban"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                            </svg>
                          </span>
                          <span className="">{role}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
          <div
            className="add-role-card"
            onClick={() => {
              navigate("/addrole");
            }}
          >
            <div className="Add-Role">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
              </span>
              <p className="main-color">{t("Add New Role")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
