import React from "react";
import Heading from "../../components/Heading/Heading";
import "./Roles.css";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();
  const rolesArray = [
    {
      name: "Admin",
    },
    {
      name: "Manager",
    },
    {
      name: "User",
    },
    {
      name: "Guest",
    },
  ];
  const roleIncludes = [
    {
      name: "Access plans",
    },
    {
      name: "Manage users",
    },
    {
      name: "Manage roles",
    },
    {
      name: "Manage permissions",
    },
    {
      name: "Manage groups",
    },
  ];
  const roleExcludes = [
    {
      name: "Manage billing",
    },
    {
      name: "Manage account",
    },
    {
      name: "Manage subscription",
    },
    {
      name: "Manage payment",
    },
  ];
  return (
    <div className="myInfo">
      <div className="myInfoHeading">
        <Heading content={"Roles"} />
      </div>

      <div className="myInfoContent">
        <div className="roles">
          {rolesArray.map((role, index) => {
            return (
              <div className="singleRole bigCard" key={index}>
                <div className="d-flex justify-content-end align-items-center">
                  <button className="PrimaryButton">
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
                    <span>Edit</span>
                  </button>
                </div>
                <div className="roleName fontLarge text-center">
                  {role.name}
                </div>
                <p className="opacityL font-smaller">Access</p>
                <div className="line2 flexcenterbetween flex-wrap">
                  {roleIncludes.map((include) => {
                    return (
                      <div className=" w-40 m-1 p-1 flexcenterstart">
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
                        <span className="">{include?.name}</span>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <p className="opacityL font-smaller">Not Access</p>
                <div className="line2 flexcenterbetween flex-wrap">
                  {roleExcludes.map((include) => {
                    return (
                      <div className=" w-40 m-1 p-1 flexcenterstart">
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
                        <span className="">{include?.name}</span>
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
              <p className="main-color">Add New Role</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
