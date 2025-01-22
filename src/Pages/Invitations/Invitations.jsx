import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";

import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Invitations = () => {
  const { t } = useTranslation();

  const { data: userData, gymId } = useSelector((state) => state.user);
  console.log(userData, gymId);
  const axiosPrivate = useAxiosPrivate();

  const [keyWord, setKeyWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Invitations, setInvitations] = useState([]);
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

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const pageArr = [];
  for (let i = 0; i < Invitations?.pagination?.numberOfPages; i++) {
    pageArr.push(i);
  }

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      let url = `/gyms/${gymId}/invitations?page=${page}&limit=${limit}`;
      if (keyWord) {
        url += `&keyword=${keyWord}`;
      }

      const { data } = await axiosPrivate.get(url);
      if (data) {
        console.log(data);
        setLoading(false);
        setInvitations(data.data);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [gymId, keyWord, page, limit]);

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
                  setPage(1);
                  setKeyWord(e.target.value);
                }}
              />
            </div>
            <table className="mainTableTwo">
              <thead>
                <tr>
                  <th>{t("Invitation Name")}</th>
                  <th>{t("Invitation Phone Number")}</th>
                  <th>{t("Invitation national ID")}</th>
                  <th>{t("Invitation Date")}</th>
                </tr>
              </thead>
              <tbody>
                {Invitations?.documents?.map((invitation) => {
                  return (
                    <tr>
                      <td data-label={t("Invitation Name")}>
                        <div className="d-flex align-items-center justify-content-start cursor-pointer">
                          <div className="profileName mx-3">
                            {invitation.invitationName || "No Name"}
                          </div>
                        </div>
                      </td>
                      <td data-label={t("Phone")}>
                        {invitation.invitationPhone}
                      </td>
                      <td data-label={t("Invitation national ID")}>
                        {invitation.invitationNationalId}
                      </td>
                      <td data-label={t("Invitation Date")}>
                        {new Date(invitation.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center align-items-center pagination my-2">
              <div className="w-50 d-flex justify-content-between align-items-center">
                <button
                  className={`PrimaryButtonTwo`}
                  style={{
                    cursor: Invitations?.pagination?.prev
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  disabled={!Invitations?.pagination?.prev}
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
                    cursor: Invitations?.pagination?.next
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!Invitations?.pagination?.next}
                >
                  {t("Next")}
                </button>
              </div>
            </div>
            {/* <div className="d-flex justify-content-center align-items-center pagination my-2">
              <div className="w-50 d-flex justify-content-between align-items-center">
                <button
                  className={`PrimaryButtonTwo`}
                  style={{
                    cursor: Invitations?.pagination.prev
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  disabled={!Invitations?.pagination.prev}
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
                    cursor: Invitations?.pagination.next
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!Invitations?.pagination.next}
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
