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
  const { state } = useLocation();
  const trainee = state?.trainee;

  const navigate = useNavigate();
  console.log("traineeId", traineeId);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const handleShowInvitation = () => setShowInvitation(true);
  const handleCloseInvitation = () => setShowInvitation(false);

  const [inBodyCount, setInBodyCount] = useState(5); // Starting count
  const maxFreeInBodies = 0;
  const handleCountDown = () => {
    if (inBodyCount >= 1) {
      setInBodyCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    if (inBodyCount === 0) {
      toast.warning(t("You have used all your free in-bodies"));
    }
  }, [inBodyCount, t]);
  const axiosPrivate = useAxiosPrivate();

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
    },
  });

  const tableOfInvitations = [
    {
      id: 1,
      name: "Invitation 1",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
    },
    {
      id: 2,
      name: "Invitation 2",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
    },
    {
      id: 3,
      name: "Invitation 3",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
    },
    {
      id: 4,
      name: "Invitation 4",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
    },
    {
      id: 5,
      name: "Invitation 5",
      phoneNumber: "01000000000",
      nationalId: "12345678912345",
    },
  ];
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
            <div className="saveAndDelete d-flex flex-column w-75 gap-2">
              <button
                className="SecondaryButton w-100"
                type="button"
                onClick={() => {
                  handleShow();
                }}
              >
                {t("Use In-body")}
              </button>
              <button
                className="PrimaryButton w-100"
                type="button"
                onClick={() => {
                  handleShowInvitation();
                }}
              >
                {t("Use Invitation")}
              </button>
            </div>
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
                  label={t("Phone Number")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Phone Number")}
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

      {tableOfInvitations && tableOfInvitations.length > 0 ? (
        <>
          <div className="coachDetails my-3 bigCard">
            <div className="head">{t("Table of Invitations")}</div>
            <table className="mainTableTwo">
              <thead>
                <tr>
                  <th>{t("Invitation Name")}</th>
                  <th>{t("Invitation Phone Number")}</th>
                  <th>{t("Invitation National ID")}</th>
                </tr>
              </thead>
              <tbody>
                {tableOfInvitations.map((trainee) => {
                  return (
                    <tr key={trainee?.id}>
                      <td data-label={t("Invitation Name")} className="tdtdtd">
                        <div className="profileName">
                          {trainee?.name || "No Name"}
                        </div>
                      </td>
                      <td
                        data-label={t("Invitation Phone Number")}
                        className="tdtdtd"
                      >
                        {trainee?.phoneNumber}
                      </td>
                      <td
                        data-label={t("Invitation National ID")}
                        className="tdtdtd"
                      >
                        {trainee?.nationalId}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
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
                        placeholder={t("invitation Name")}
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
                      label={t("Invitation Name")}
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
                        placeholder={t("invitation Phone number")}
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
                      label={t("Invitation National ID")}
                      id={
                        errors.invitationNationalId &&
                        touched.invitationNationalId
                          ? "floatingError"
                          : "floatingInput"
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder={t("invitation National ID")}
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
      </div>
    </div>
  );
};

export default TraineeProfile;
