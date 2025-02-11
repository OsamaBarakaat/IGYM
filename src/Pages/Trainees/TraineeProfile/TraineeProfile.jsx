import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import defaultt from "../../../assetss/default/5856.jpg";
import "./TraineeProfile.css";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { privateAxiosInstance } from "../../../api/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { invitationValidationSchema } from "../../../Validations/PlanValidation";

const TraineeProfile = () => {
  const { t } = useTranslation();
  const { traineeId } = useParams();
  const [traineeNew, setTraineeNew] = useState({});
  const { state } = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const trainee = state?.trainee || traineeNew;
  console.log(trainee);

  const navigate = useNavigate();
  const getTrainee = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/trainees/${traineeId}`
      );

      if (data) {
        console.log(data);
        setTraineeNew(data?.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getTrainee();
  }, [traineeId]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const handleShowInvitation = () => setShowInvitation(true);
  const handleCloseInvitation = () => setShowInvitation(false);
  const [inBodyCount, setInBodyCount] = useState(0);
  const [inBodyCountPrivateSession, setInBodyCountPrivateSession] = useState(0);
  const [inBodyCountNS, setInBodyCountNS] = useState(0);
  const [inBodyCountInvitations, setInBodyCountInvitations] = useState(0);
  useEffect(() => {
    setInBodyCount(
      traineeNew?.plan?.inBody - traineeNew?.plan?.usedInBody || 0
    );
    setInBodyCountPrivateSession(
      traineeNew?.plan?.nutritionSessionsNumber -
        traineeNew?.plan?.usedPrivateSessions || 0
    );
    setInBodyCountNS(
      traineeNew?.plan?.nutritionSessionsNumber -
        traineeNew?.plan?.usedNutritionSessions || 0
    );
    setInBodyCountInvitations(
      traineeNew?.plan?.invitationsNumber - traineeNew?.plan?.usedInvitations ||
        0
    );
  }, [traineeNew]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showStepBackButton, setShowStepBackButton] = useState(false);
  const [stepBackTime, setStepBackTime] = useState(10);
  const [timer, setTimer] = useState(null);

  const handleConfirmUse = () => {
    if (inBodyCount > 0) {
      setInBodyCount((prevCount) => prevCount - 1);
      setShowConfirm(false);
      setShowStepBackButton(true);
      setStepBackTime(10);

      const countdown = setInterval(() => {
        setStepBackTime((prevTime) => {
          if (prevTime - 1 === 0) {
            // Countdown reached 0, make the patch call
            clearInterval(countdown);
            setShowStepBackButton(false);
            handleUseInbody(); // Call the async function here
          }
          return prevTime - 1; // Continue decrementing the time
        });
      }, 1000);

      setTimer(countdown); // Save the interval ID
    } else {
      toast.warning(t("You have used all your free in-bodies"));
      setShowConfirm(false);
    }
  };

  // Regular async function for handling the patch request
  const handleUseInbody = async () => {
    try {
      const response = await axiosPrivate.patch(
        `/gyms/${gymId}/trainees/${trainee._id}`,
        {
          inBody: true,
        }
      );

      if (response) {
        toast.success("In-Body used successfully");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleStepBack = () => {
    if (stepBackTime > 0) {
      setInBodyCount((prevCount) => prevCount + 1);
      setShowStepBackButton(false);
      clearInterval(timer);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const maxFreeInBodies = 0;
  const handleCountDown = () => {
    if (inBodyCount >= 1) {
      setInBodyCount((prevCount) => prevCount - 1);
    }
  };

  // -------
  const [showConfirmPrivateSession, setShowConfirmPrivateSession] =
    useState(false);
  const [
    showStepBackButtonPrivateSession,
    setShowStepBackButtonPrivateSession,
  ] = useState(false);
  const [stepBackTimePrivateSession, setStepBackTimePrivateSession] =
    useState(10);
  const [timerPrivateSession, setTimerPrivateSession] = useState(null);

  const handleConfirmUsePrivateSession = () => {
    if (inBodyCountPrivateSession > 0) {
      setInBodyCountPrivateSession((prevCount) => prevCount - 1);
      setShowConfirmPrivateSession(false);
      setShowStepBackButtonPrivateSession(true);
      setStepBackTimePrivateSession(10);
      const countdown = setInterval(() => {
        setStepBackTimePrivateSession((prevTime) => {
          if (prevTime - 1 === 0) {
            // Countdown reached 0, make the patch call
            clearInterval(countdown);
            setShowStepBackButtonPrivateSession(false);
            handleUsePrivateSession(); // Call the async function here
          }
          return prevTime - 1; // Continue decrementing the time
        });
      }, 1000);
      setTimerPrivateSession(countdown);
    } else {
      toast.warning(t("You have used all your free Private Session"));
      setShowConfirmPrivateSession(false);
    }
  };

  const handleUsePrivateSession = async () => {
    try {
      const response = await axiosPrivate.patch(
        `/gyms/${gymId}/trainees/${trainee._id}`,
        {
          privateSessions: true,
        }
      );

      if (response) {
        toast.success("Private Session used successfully");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleStepBackPrivateSession = () => {
    if (stepBackTimePrivateSession > 0) {
      setInBodyCountPrivateSession((prevCount) => prevCount + 1);
      setShowStepBackButtonPrivateSession(false);
      clearInterval(timerPrivateSession);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerPrivateSession);
    };
  }, [timerPrivateSession]);

  // -------

  // -------
  const [showConfirmNS, setShowConfirmNS] = useState(false);
  const [showStepBackButtonNS, setShowStepBackButtonNS] = useState(false);
  const [stepBackTimeNS, setStepBackTimeNS] = useState(10);
  const [timerNS, setTimerNS] = useState(null);

  const handleConfirmUseNS = () => {
    if (inBodyCountNS > 0) {
      setInBodyCountNS((prevCount) => prevCount - 1);
      setShowConfirmNS(false);
      setShowStepBackButtonNS(true);
      setStepBackTimeNS(10);
      const countdown = setInterval(() => {
        setStepBackTimeNS((prevTime) => {
          if (prevTime - 1 === 0) {
            // Countdown reached 0, make the patch call
            clearInterval(countdown);
            setShowStepBackButtonNS(false);
            handleUseNS(); // Call the async function here
          }
          return prevTime - 1; // Continue decrementing the time
        });
      }, 1000);
      setTimerNS(countdown);
    } else {
      toast.warning(t("You have used all your free Private Session"));
      setShowConfirmNS(false);
    }
  };

  const handleUseNS = async () => {
    try {
      const response = await axiosPrivate.patch(
        `/gyms/${gymId}/trainees/${trainee._id}`,
        {
          nutritionSessions: true,
        }
      );

      if (response) {
        toast.success("Nutriation Session used successfully");
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleStepBackNS = () => {
    if (stepBackTimeNS > 0) {
      setInBodyCountNS((prevCount) => prevCount + 1);
      setShowStepBackButtonNS(false);
      clearInterval(timerNS);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerNS);
    };
  }, [timerNS]);
  // Starting count

  // -------

  //   const fetchData = async () => {
  //     try {
  //       const { data } = await privateAxiosInstance.get(
  //         `/gyms/${gymId}/coaches/${traineeId}`
  //       );

  //       setCoach(data.data);
  //       console.log("data", data.data);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.response.data.message);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: {
      invitationName: "",
      invitationPhoneNumber: "",
      invitationNationalId: "",
    },
    validationSchema: invitationValidationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const response = await axiosPrivate.post(`/gyms/${gymId}/invitations`, {
          user: trainee?.user?._id,
          invitationName: values.invitationName,
          invitationPhone: values.invitationPhoneNumber.toString(),
          invitationNationalId: values.invitationNationalId,
        });

        if (response) {
          toast.success("Invitation used successfully");
          fetchInvitations();

          setInBodyCountInvitations((prev) => prev - 1);

          console.log(response);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    },
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: userData, gymId } = useSelector((state) => state.user);
  console.log(userData, gymId);

  const [keyWord, setKeyWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Invitations, setInvitations] = useState([]);

  const pageArr = [];
  for (let i = 0; i < Invitations?.pagination?.numberOfPages; i++) {
    pageArr.push(i);
  }

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      let url = `/gyms/${gymId}/invitations?page=${page}&limit=${limit}&user=${trainee?.user?._id}`;
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
  }, [gymId, keyWord, page, limit, traineeId, trainee]);

  return (
    <div className="m-2">
      <Heading content={t("Trainee Profile")} />
      <form action="">
        <div className="mainContentOfCoach ">
          <div className="imageAndsave bigCard d-flex justify-content-center align-items-center flex-column">
            <div className="coachImage ">
              <img
                src={trainee?.user?.image || defaultt}
                className="logoLarge"
                alt="Coach"
              />
            </div>
            <div className="saveAndDelete d-flex justify-content-center w-75 gap-2 flex-wrap">
              <button
                className="SecondaryButton w-40"
                type="button"
                onClick={() => setShowConfirm(true)}
              >
                {t("Use In-body")} : {inBodyCount}
              </button>
              <button
                className="PurpleButton w-40"
                type="button"
                onClick={() => setShowConfirmPrivateSession(true)}
              >
                {t("Use Private Session")} : {inBodyCountPrivateSession}
              </button>
              <button
                className="OrangeButton w-40"
                type="button"
                onClick={() => setShowConfirmNS(true)}
              >
                {t("Use Nutriation plan")} : {inBodyCountNS}
              </button>
              <button
                className="PrimaryButton w-40"
                type="button"
                onClick={() => {
                  handleShowInvitation();
                }}
              >
                {t("Use Invitation")} : {inBodyCountInvitations}
              </button>
            </div>
            {showStepBackButton && (
              <div className="step-back-container w-100 my-2">
                <button
                  className="SecondaryButton w-100"
                  onClick={handleStepBack}
                  hidden={stepBackTime <= 0}
                  aria-label={
                    t("Step back in") + " " + stepBackTime + " " + t("seconds")
                  }
                >
                  {t("Step back in")} {stepBackTime} {t("seconds")}
                </button>
              </div>
            )}
            {showStepBackButtonPrivateSession && (
              <div className="step-back-container w-100 my-2">
                <button
                  className="PurpleButton w-100"
                  onClick={handleStepBackPrivateSession}
                  hidden={stepBackTimePrivateSession <= 0}
                  aria-label={
                    t("Step back in(PS)") +
                    " " +
                    stepBackTimePrivateSession +
                    " " +
                    t("seconds")
                  }
                >
                  {t("Step back in")} {stepBackTimePrivateSession}{" "}
                  {t("seconds")}
                </button>
              </div>
            )}
            {showStepBackButtonNS && (
              <div className="step-back-container w-100 my-2">
                <button
                  className="OrangeButton w-100"
                  onClick={handleStepBackNS}
                  hidden={stepBackTimeNS <= 0}
                  aria-label={
                    t("Step back in(NS)") +
                    " " +
                    stepBackTimeNS +
                    " " +
                    t("seconds")
                  }
                >
                  {t("Step back in")} {stepBackTimeNS} {t("seconds")}
                </button>
              </div>
            )}
          </div>
          <div className="coachData w-100 bigCard flex-grow-1">
            <div className="inputsInCoachProfile">
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Trainee Name")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    readOnly
                    type="text"
                    placeholder={t("Trainee Name")}
                    defaultValue={trainee?.user?.name}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Account ID")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    readOnly
                    placeholder={t("Account ID")}
                    defaultValue={trainee?.user?.accountId}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Email")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="email"
                    placeholder={t("Email")}
                    name="email"
                    defaultValue={trainee?.user?.email}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Phone number")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Phone number")}
                    name="phoneNumber"
                    defaultValue={trainee?.user?.phone}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Date of Birth")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="date"
                    placeholder={t("Date of Birth")}
                    name="dateOfBirth"
                    defaultValue={trainee?.user?.birthDate.split("T")[0]}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Gender")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Gender")}
                    name="gender"
                    defaultValue={trainee?.user?.gender}
                    disabled
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="coachDetails my-3 bigCard">
        <div className="head">{t("Table of Invitations")}</div>
        {Invitations?.documents?.length > 0 ? (
          <>
            <div>
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
                {Invitations?.documents?.map((trainee) => {
                  return (
                    <tr key={trainee?.id}>
                      <td data-label={t("Invitation Name")} className="tdtdtd">
                        <div className="profileName">
                          {trainee?.invitationName || "No Name"}
                        </div>
                      </td>
                      <td
                        data-label={t("Invitation Phone Number")}
                        className="tdtdtd"
                      >
                        {trainee?.invitationPhone}
                      </td>
                      <td
                        data-label={t("Invitation national ID")}
                        className="tdtdtd"
                      >
                        {trainee?.invitationNationalId}
                      </td>
                      <td data-label={t("Invitation Date")}>
                        {new Date(trainee.createdAt).toLocaleString(undefined, {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
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
          </>
        ) : (
          <>
            <div className="flexcentercenter ">{t("No Invitations yet")}</div>
          </>
        )}
      </div>

      <div className="modal-use-inbody">
        <Modal show={show} onHide={handleClose} centered>
          <div>
            <Modal.Header className="modala">
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Modal.Title className="modala">
                  <span className="modalHeadTitle">{t("Use In-Body")}</span>
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
              <div className="counter-section text-center">
                <div className="countdown-container">
                  <p>{t("Remaining In-Bodies")}:</p>
                  <div className={`countdown-circle `}>{inBodyCount}</div>
                </div>
                <Button
                  variant="primary"
                  onClick={handleCountDown}
                  disabled={inBodyCount === maxFreeInBodies}
                  className="countdown-button"
                >
                  {t("Use In-Body")}
                </Button>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
      <div className="modal-use-invitation">
        <Modal show={showInvitation} onHide={handleCloseInvitation} centered>
          <div>
            <Modal.Header className="modala">
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Modal.Title className="modala">
                  <span className="modalHeadTitle">{t("Use Invitation")}</span>
                </Modal.Title>
                <button
                  className="btn-close bg-secondary"
                  onClick={() => {
                    setShowInvitation(false);
                  }}
                ></button>
              </div>
            </Modal.Header>
            <Modal.Body className="modala">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                  <div className="mb-2 w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("Invitation Name")}
                      id={
                        errors.invitationName && touched.invitationName
                          ? "floatingError"
                          : "floatingInput"
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder={t("Invitation Name")}
                        name="invitationName"
                        value={values.invitationName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FloatingLabel>
                    {errors.invitationName && touched.invitationName && (
                      <small className="error-message">
                        {errors.invitationName}
                      </small>
                    )}
                  </div>
                  <div className="mb-2 w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("phone number")}
                      id={
                        errors.invitationPhoneNumber &&
                        touched.invitationPhoneNumber
                          ? "floatingError"
                          : "floatingInput"
                      }
                    >
                      <Form.Control
                        type="number"
                        min={0}
                        placeholder={t("phone number")}
                        name="invitationPhoneNumber"
                        value={values.invitationPhoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FloatingLabel>
                    {errors.invitationPhoneNumber &&
                      touched.invitationPhoneNumber && (
                        <small className="error-message">
                          {errors.invitationPhoneNumber}
                        </small>
                      )}
                  </div>
                  <div className="mb-2 w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("Invitation national ID")}
                      id={
                        errors.invitationNationalId &&
                        touched.invitationNationalId
                          ? "floatingError"
                          : "floatingInput"
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder={t("Invitation national ID")}
                        name="invitationNationalId"
                        value={values.invitationNationalId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FloatingLabel>
                    {errors.invitationNationalId &&
                      touched.invitationNationalId && (
                        <small className="error-message">
                          {errors.invitationNationalId}
                        </small>
                      )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="SecondaryButton w-100"
                  >
                    {t("Use Invitation")}
                  </button>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>

        {/* Confirmation Modal */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header>
            <Modal.Title>{t("Confirm Use In-Body")}</Modal.Title>
            <button
              className="btn-close"
              onClick={() => setShowConfirm(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <p>{t("Are you sure you want to use an In-Body?")}</p>
            <div className="d-flex justify-content-end gap-3">
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                {t("Cancel")}
              </Button>
              <Button variant="primary" onClick={handleConfirmUse}>
                {t("Confirm")}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showConfirmPrivateSession}
          onHide={() => setShowConfirmPrivateSession(false)}
          centered
        >
          <Modal.Header>
            <Modal.Title>{t("Confirm Use Private Sessions")}</Modal.Title>
            <button
              className="btn-close"
              onClick={() => setShowConfirmPrivateSession(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <p>{t("Are you sure you want to use an Private Session?")}</p>
            <div className="d-flex justify-content-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmPrivateSession(false)}
              >
                {t("Cancel")}
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmUsePrivateSession}
              >
                {t("Confirm")}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showConfirmNS}
          onHide={() => setShowConfirmNS(false)}
          centered
        >
          <Modal.Header>
            <Modal.Title>{t("Confirm Use Nutriation Sessions")}</Modal.Title>
            <button
              className="btn-close"
              onClick={() => setShowConfirmNS(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <p>{t("Are you sure you want to use an Nutriation Session?")}</p>
            <div className="d-flex justify-content-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmNS(false)}
              >
                {t("Cancel")}
              </Button>
              <Button variant="primary" onClick={handleConfirmUseNS}>
                {t("Confirm")}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default TraineeProfile;
