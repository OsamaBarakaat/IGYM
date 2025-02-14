import React, { useEffect, useRef, useState } from "react";
import "./Trainees.css";
import Heading from "../../components/Heading/Heading";
import avatar from "../../assetss/default/5856.jpg";
import { convertToCreatedAtFormat } from "../../createdAt";
import { FloatingLabel, Form, Modal, Offcanvas } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { privateAxiosInstance } from "../../api/axios";
import Loader from "../../components/Loader/Loader";
import { ArrowUpNarrowWideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";

const Trainees = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showSingleMessage, setShowSignleMessage] = useState({
    show: false,
    traineeId: null,
  });
  const handleCloseSingleMessage = () =>
    setShowSignleMessage({ show: false, traineeId: null });
  const [showEditTrainee, setShowEditTrainee] = useState({
    show: false,
    traineeId: null,
  });
  const handleCloseEditTrainee = () =>
    setShowEditTrainee({ show: false, traineeId: null });
  const [otp, setOtp] = useState("");
  const [sendInvite, setSendInvite] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  const [Trainees, setTrainees] = useState([]);
  const [plans, setPlans] = useState([]);
  const { gymId } = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  const inputRef = useRef(null);
  const planRef = useRef(null);

  const msgTitleRef = useRef(null);
  const msgBodyRef = useRef(null);

  const newPlanRef = useRef(null);
  const [keyWord, setKeyWord] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const pageArr = [];
  for (let i = 0; i < Trainees?.pagination?.numberOfPages; i++) {
    pageArr.push(i);
  }

  const fetchTrainees = async () => {
    try {
      let url = `/gyms/${gymId}/trainees?page=${page}&limit=${limit}`;
      if (keyWord) {
        url += `&keyword=${keyWord}`;
      }
      const { data } = await axiosPrivate.get(url);
      setTrainees(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong"));
    }
  };

  const fetchPlans = async () => {
    try {
      const { data } = await privateAxiosInstance.get(
        `/gyms/${gymId}/plans?select=name,_id`
      );
      setPlans(data.data.documents);
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong"));
    }
  };

  const handleAddTrainee = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value || !planRef.current.value) {
      toast.error(t("user phone and plan are required"));
      return;
    }
    try {
      await axiosPrivate.post(`/gyms/${gymId}/trainees`, {
        userPhone: inputRef.current.value,
        planId: planRef.current.value,
      });
      fetchTrainees();
      handleClose();
      toast.success(t("Trainee added successfully"));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleEditTraineePlan = async (e) => {
    e.preventDefault();
    if (!newPlanRef.current.value) {
      toast.error(t("plan is required"));
      return;
    }
    console.log("newPlanRef", newPlanRef.current.value);
    console.log("traineeId", showEditTrainee.traineeId);
    try {
      await axiosPrivate.post(
        `/gyms/${gymId}/trainees/${showEditTrainee.traineeId}/renew`,
        {
          planId: newPlanRef.current.value,
        }
      );
      fetchTrainees();
      handleCloseEditTrainee();
      toast.success(t("Trainee plan updated successfully"));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSendMsg = async () => {
    if (!msgTitleRef.current?.value || !msgBodyRef.current?.value) {
      toast.error(t("name and message are required"));
      return;
    }
    try {
      await axiosPrivate.post(`/user-notifications/email`, {
        subject: msgTitleRef.current.value,
        message: msgBodyRef.current.value,
        userId: showSingleMessage.traineeId,
        gym: gymId,
      });
      handleCloseSingleMessage();
      toast.success(t("Message sent successfully"));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    fetchTrainees();
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
        <HeadingNoBack content={t("Trainees")} />
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
                <span>{t("Add New Trainee")}</span>
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
                  <th>{t("Member name")}</th>
                  <th>{t("Number")}</th>
                  <th>{t("Gender")}</th>
                  <th>{t("Plan")}</th>
                  <th>{t("Join date")}</th>
                  <th>{t("Expire date")}</th>
                  <th>{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {Trainees.documents.map((trainee) => {
                  return (
                    <tr>
                      <td>
                        <div
                          className="d-flex align-items-center justify-content-start cursor-pointer"
                          onClick={() => {
                            navigate(`/traineeprofile/${trainee?._id}`, {
                              state: { trainee },
                            });
                          }}
                        >
                          <div className="profilePic">
                            <img
                              src={trainee?.user?.image || avatar}
                              alt="profilePic"
                              className="widthSmall"
                            />
                          </div>
                          <div className="profileName mx-3">
                            {trainee?.user?.name || "No Name"}
                          </div>
                        </div>
                      </td>
                      <td data-label={t("Phone")}>{trainee?.user?.phone}</td>
                      <td data-label={t("Gender")}>{trainee?.user?.gender}</td>
                      <td data-label={t("Plan")}>{trainee?.plan?.name}</td>
                      <td data-label={t("Join Date")}>
                        {convertToCreatedAtFormat(trainee?.createdAt)}
                      </td>
                      <td data-label={t("Expire Date")}>
                        {convertToCreatedAtFormat(trainee?.plan?.expiredAt)}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center flex-column">
                          <button
                            className="SecondaryButton my-1"
                            onClick={() =>
                              setShowEditTrainee({
                                show: true,
                                traineeId: trainee?.user._id,
                              })
                            }
                          >
                            <span>
                              <ArrowUpNarrowWideIcon size={16} />
                            </span>
                            <span className="mx-2">{t("Renew")}</span>
                          </button>
                          <button
                            className="PrimaryButton"
                            onClick={() => {
                              console.log("traineeId", trainee?.user._id);

                              setShowSignleMessage({
                                show: true,
                                traineeId: trainee?.user._id,
                              });
                            }}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-chat-dots"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                              </svg>
                            </span>
                            <span className="mx-2">{t("Send Message")}</span>
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
            </div>
          </div>
        </div>
      </div>
      <div className="offCanvasAddMember">
        <Modal show={show} onHide={handleClose}>
          {sendInvite && (
            <div>
              <Modal.Header className="modala">
                <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                  <Modal.Title className="modala">
                    <span className="offCanvasHeadTitle">
                      {t("Add member")}
                    </span>
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
                        label={t("Phone number")}
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          ref={inputRef}
                          type="number"
                          min={0}
                          placeholder={t("Phone number")}
                          name="number"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="mb-3">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Select Plan")}
                        id={"floatingInput"}
                      >
                        <Form.Select name="plan" ref={planRef}>
                          <option value="" disabled>
                            {t("Select Plan")}
                          </option>
                          {plans.map((plan) => {
                            return (
                              <option key={plan._id} value={plan._id}>
                                {plan.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </FloatingLabel>
                      {/* {sendInvite.errors.role && sendInvite.touched.role && (
                    <small className="error-message">
                      {sendInvite.errors.role}
                    </small>
                  )} */}
                    </div>
                    <div className="my-2">
                      <button
                        className="SecondaryButton w-100"
                        type="submit"
                        onClick={handleAddTrainee}
                      >
                        {t("Verify")}
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
                        {t("Confirm")}
                      </button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </div>
          )}
        </Modal>
        <div className="editTraineeOffcanvase">
          <Offcanvas
            show={showEditTrainee.show}
            onHide={handleCloseEditTrainee}
            placement="end"
            id="offCanvas"
          >
            <Offcanvas.Header>
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Offcanvas.Title>
                  <span className="offCanvasHeadTitle">
                    {t("Edit Trainee details")}
                  </span>
                </Offcanvas.Title>
                <button
                  className="btn-close bg-secondary"
                  onClick={() => {
                    setShowEditTrainee({ show: false, traineeId: null });
                  }}
                ></button>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <form>
                <div>
                  {/* <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Name"
                      id="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="name"
                        name="name"
                      />
                    </FloatingLabel>
                  </div> */}
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("Select plan")}
                      id={"floatingInput"}
                    >
                      <Form.Select
                        name="plan"
                        defaultValue={""}
                        ref={newPlanRef}
                      >
                        <option value="" disabled>
                          {t("Select Plan")}
                        </option>
                        {plans.map((plan) => {
                          return (
                            <option key={plan._id} value={plan._id}>
                              {plan.name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </div>
                  <div>
                    <button
                      className="SecondaryButton w-100"
                      onClick={handleEditTraineePlan}
                    >
                      {t("Renew")}
                    </button>
                  </div>
                </div>
              </form>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="sendSingleMessage">
          <Modal
            show={showSingleMessage.show}
            onHide={handleCloseSingleMessage}
          >
            <div>
              <Modal.Header className="modala">
                <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                  <Modal.Title className="modala">
                    <span className="offCanvasHeadTitle">
                      {t("Send Single Message")}
                    </span>
                  </Modal.Title>
                  <button
                    className="btn-close bg-secondary"
                    onClick={() => {
                      handleCloseSingleMessage();
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
                          ref={msgTitleRef}
                        />
                      </FloatingLabel>
                    </div>
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Message")}
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          min={0}
                          placeholder={t("type your message here ...")}
                          name="message"
                          ref={msgBodyRef}
                        />
                      </FloatingLabel>
                    </div>

                    <div className="my-2">
                      <button
                        className="SecondaryButton w-100"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSendMsg();
                        }}
                      >
                        {t("Send Message")}
                      </button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Trainees;
