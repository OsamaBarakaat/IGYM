import React, { useEffect, useRef, useState } from "react";
import "./Coaches.css";
import Heading from "../../components/Heading/Heading";
import avatar from "../../assetss/default/5856.jpg";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";

const Coaches = () => {
  const { t } = useTranslation();
  const [coaches, setCoaches] = useState([]);
  const [keyWord, setKeyWord] = useState(null);
  const inputRef = useRef(null);
  const nameRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShow(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [sendInvite, setSendInvite] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  const { gymId } = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const pageArr = [];
  for (let i = 0; i < coaches?.pagination?.numberOfPages; i++) {
    pageArr.push(i);
  }

  const fetchCoaches = async () => {
    try {
      let url = `/gyms/${gymId}/coaches?page=${page}&limit=${limit}`;
      if (keyWord) {
        url += `&keyword=${keyWord}`;
      }
      const { data } = await axiosInstance.get(url);
      setCoaches(data.data);
      setLoading(false);
      console.log("coaches", data.data.documents);
    } catch (error) {
      toast.error(t("Something went wrong"));
    }
  };

  const handleAddCoach = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post(`/gyms/${gymId}/coaches`, {
        userPhone: inputRef.current.value,
        name: nameRef.current.value,
      });
      fetchCoaches();
      handleClose();
      toast.success(t("Coach added successfully"));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, [keyWord, page, limit]);

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
        <HeadingNoBack content={t("Coaches")} />
      </div>
      <div className="myInfoContent m-2">
        <div className="bigCard">
          <div className="tableContainer">
            <div className="addMember px-4 flexcenterbetween">
              <button className="PrimaryButton" onClick={handleShow}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </span>
                <span>{t("Add new Coach")}</span>
              </button>
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
                  <th>{t("Coach name")}</th>
                  <th>{t("Number")}</th>
                  <th>{t("Gender")}</th>
                  <th>{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {coaches.documents.map((coach) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          <div className="profilePic">
                            <img
                              src={coach?.user.image || avatar}
                              alt="profilePic"
                              className="widthSmall cursor-pointer"
                              onClick={() => {
                                navigate(`/coachprofile/${coach?._id}`);
                              }}
                            />
                          </div>
                          <div className="profileName mx-3">
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                navigate(`/coachprofile/${coach?._id}`);
                              }}
                            >
                              {coach?.name || "No Name"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td data-label="Phone">{coach?.user.phone}</td>
                      <td data-label="Gender">{coach?.user.gender}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="PrimaryButton"
                            onClick={() => {
                              navigate(`/coachprofile/${coach?._id}`);
                            }}
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
                            <span className="mx-2">
                              {t("Edit Coach details")}
                            </span>
                          </button>
                        </div>
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
                    cursor: coaches?.pagination.prev
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  disabled={!coaches?.pagination.prev}
                >
                  {t("Previous")}
                </button>
                <div className="pages">
                  {pageArr.map((pageNumber) => {
                    return (
                      <span
                        key={pageNumber}
                        className={`mx-3 pag-item ${
                          page === pageNumber + 1 ? "active-page" : ""
                        }`}
                        onClick={() => {
                          setPage(pageNumber + 1);
                        }}
                      >
                        {pageNumber + 1}
                      </span>
                    );
                  })}
                </div>
                <button
                  className={`PrimaryButtonTwo`}
                  style={{
                    cursor: coaches?.pagination.next
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!coaches?.pagination.next}
                >
                  {t("Next")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modalAddCoach">
        <Modal show={show} onHide={handleClose}>
          {sendInvite && (
            <div>
              <Modal.Header className="modala">
                <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                  <Modal.Title className="modala">
                    <span className="modalHeadTitle">{t("Add Coach")}</span>
                  </Modal.Title>
                  <button
                    className="btn-close bg-secondary"
                    onClick={() => {
                      setShow(false);
                    }}
                  ></button>
                </div>
              </Modal.Header>
              <Modal.Body className="modala">
                <form>
                  <div>
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Name")}
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Name")}
                          ref={nameRef}
                        />
                      </FloatingLabel>
                    </div>
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Phone number")}
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          type="number"
                          ref={inputRef}
                          min={0}
                          placeholder={t("Phone number")}
                          name="number"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="my-2">
                      <button
                        className="SecondaryButton w-100"
                        type="submit"
                        onClick={handleAddCoach}
                      >
                        {t("Add Coach")}
                      </button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </div>
          )}
          {showVerify && (
            <div>
              <Modal.Header className="modala">
                <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                  <Modal.Title className="modala">
                    <span className="offCanvasHeadTitle">{t("Send OTP")}</span>
                  </Modal.Title>
                  <button
                    className="btn-close bg-secondary"
                    onClick={() => {
                      setShow(false);
                    }}
                  ></button>
                </div>
              </Modal.Header>
              <Modal.Body className="modala">
                <form>
                  <div className="d-flex justify-content-center align-items-center">
                    <OtpInput
                      inputStyle="inputStyle"
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <div>
                    <div className="my-2">
                      <button
                        className="SecondaryButton w-100"
                        type="submit"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        {t("Verify")}
                      </button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </div>
          )}
        </Modal>
      </div>
      <div className="modalEditCoach">
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <div>
            <Modal.Header className="modala">
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Modal.Title className="modala">
                  <span className="modalHeadTitle">{t("Edit Coach")}</span>
                </Modal.Title>
                <button
                  className="btn-close bg-secondary"
                  onClick={() => {
                    setShowEdit(false);
                  }}
                ></button>
              </div>
            </Modal.Header>
            <Modal.Body className="modala">
              <form>
                <div>
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("Name")}
                      id={"floatingInput"}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder={t("Name")}
                        name="name"
                      />
                    </FloatingLabel>
                  </div>
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("Phone number")}
                      id={"floatingInput"}
                      className="mb-3"
                    >
                      <Form.Control
                        type="number"
                        min={0}
                        placeholder={t("Phone number")}
                        name="number"
                      />
                    </FloatingLabel>
                  </div>
                  <div className="my-2 flexcenterbetween gap-2">
                    <button className="SecondaryButton w-100" type="submit">
                      {t("Update Coach")}
                    </button>
                    <button className="DangerButton w-100">
                      {t("Delete Coach")}{" "}
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Coaches;
