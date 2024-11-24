import React, { useState } from "react";
import Heading from "../../components/Heading/Heading";

import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";

const Invitations = () => {
  const { t } = useTranslation();

  const [keyWord, setKeyWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const tableOfInvitations = [
    {
      id: 1,
      name: "Invitation 1",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
      invitationDate: "2021-10-10",
      invitationFrom: "john doe",
    },
    {
      id: 2,
      name: "Invitation 2",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
      invitationDate: "2021-10-10",
      invitationFrom: "john doe",
    },
    {
      id: 3,
      name: "Invitation 3",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
      invitationDate: "2021-10-10",
      invitationFrom: "john doe",
    },
    {
      id: 4,
      name: "Invitation 4",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
      invitationDate: "2021-10-10",
      invitationFrom: "john doe",
    },
    {
      id: 5,
      name: "Invitation 5",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
      invitationDate: "2021-10-10",
      invitationFrom: "john doe",
    },
  ];

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
        <HeadingNoBack content={t("Invitations")} />
      </div>
      <div className="myInfoContent m-2">
        <div className="bigCard">
          <div className="tableContainer">
            <div className="addMember px-4 flexcenterbetween">
              <input
                type="search"
                className="w-50 p-2 rounded-3 searchInput"
                placeholder={t("Search by name or number ...")}
                value={keyWord}
                onChange={(e) => {
                  setKeyWord(e.target.value);
                }}
              />
            </div>
            <table className="mainTableTwo">
              <thead>
                <tr>
                  <th>{t("Invitation Name")}</th>
                  <th>{t("Invitation Phone Number")}</th>
                  <th>{t("Invitation coming from")}</th>
                  <th>{t("Invitation Date")}</th>
                </tr>
              </thead>
              <tbody>
                {tableOfInvitations.map((invitation) => {
                  return (
                    <tr>
                      <td data-label={t("Invitation Name")}>
                        <div className="d-flex align-items-center justify-content-start cursor-pointer">
                          <div className="profileName mx-3">
                            {invitation.name || "No Name"}
                          </div>
                        </div>
                      </td>
                      <td data-label={t("Phone")}>{invitation.phoneNumber}</td>
                      <td data-label={t("Invitation coming from")}>
                        {invitation.invitationFrom}
                      </td>
                      <td data-label={t("Invitation Date")}>
                        {invitation.invitationDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <div className="d-flex justify-content-center align-items-center pagination my-2">
              <div className="w-50 d-flex justify-content-between align-items-center">
                <button
                  className={`PrimaryButtonTwo`}
                  style={{
                    cursor: Trainees?.pagination.prev
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  disabled={!Trainees?.pagination.prev}
                >
                  {t("Previous")}
                </button>
                <div className="pages">
                  {pageArr.map((page) => {
                    return (
                      <span
                        className="mx-3 pag-item"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        {page + 1}
                      </span>
                    );
                  })}
                </div>
                <button
                  className={`PrimaryButtonTwo`}
                  style={{
                    cursor: Trainees?.pagination.next
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!Trainees?.pagination.next}
                >
                  {t("Next")}
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitations;
