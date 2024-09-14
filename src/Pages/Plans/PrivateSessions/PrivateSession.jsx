import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import axiosInstance from "../../../api/axios";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  psOfferValidationSchema,
  psValidationSchema,
} from "../../../Validations/PrivateSession";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const PrivateSession = () => {
  const { t } = useTranslation();
  const [modalShowAddPS, setModalShowAddPS] = useState(false);
  const [modalShowEditPS, setModalShowEditPS] = useState(false);
  const [modalShowAddOfferPS, setModalShowAddOfferPS] = useState(false);
  const [modalShowEditOfferPS, setModalShowEditOfferPS] = useState(false);
  const handleClosePS = () => setModalShowAddPS(false);
  const [privateSessions, setPrivateSessions] = useState([]);
  const { gymId } = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  /************ formik *************/
  // Add PS
  const addPS = useFormik({
    initialValues: {
      cost: "",
      sessions: "",
      expireIn: "",
      durationType: "",
    },
    validationSchema: psValidationSchema,
    onSubmit: async (values, actions) => {
      console.log("Form submitted:", values);
      actions.setSubmitting(true);
      try {
        const res = await axiosPrivate.post(`/gyms/${gymId}/private-sessions`, {
          cost: values.cost,
          sessions: values.sessions,
          expireIn: values.expireIn,
          expireType: values.durationType,
        });
        console.log(res);
        toast.success(t("Private Session created successfully"));
        actions.resetForm();
        setPrivateSessions([res.data.data, ...privateSessions]);
        setModalShowAddPS(false);
      } catch (error) {
        console.log(error);
        toast.error(t("Something went wrong"));
      }
    },
  });

  // Edit PS
  const editPS = useFormik({
    initialValues: {
      cost: "",
      sessions: "",
      expireIn: "",
      durationType: "",
    },
    validationSchema: psValidationSchema,
    onSubmit: async (values, actions) => {
      console.log("Form submitted:", values);
      actions.setSubmitting(true);
      try {
        const res = await axiosPrivate.patch(
          `/gyms/${gymId}/private-sessions/${values._id}`,
          {
            cost: values.cost,
            sessions: values.sessions,
            expireIn: values.expireIn,
            expireType: values.durationType,
          }
        );
        console.log(res);
        toast.success(t("Private Session updated successfully"));
        actions.resetForm();
        setModalShowEditPS(false);
        setPrivateSessions(
          privateSessions.map((session) =>
            session._id === values._id ? res.data.data : session
          )
        );
      } catch (error) {
        console.log(error);
        toast.error(t("Something went wrong"));
      }
    },
  });

  // Add Offer PS
  const addOfferPS = useFormik({
    initialValues: {
      cost: "",
      sessions: "",
      expireAt: "",
    },
    validationSchema: psOfferValidationSchema,
    onSubmit: async (values, actions) => {
      console.log("Form submitted:", values);
      actions.setSubmitting(true);
      try {
        const res = await axiosPrivate.patch(
          `/gyms/${gymId}/private-sessions/${values._id}/offer`,
          {
            cost: values.cost,
            sessions: values.sessions,
            expireAt: values.expireAt,
          }
        );
        console.log(res);
        toast.success(t("Private Session Offer created successfully"));
        actions.resetForm();
        setModalShowAddOfferPS(false);
        setPrivateSessions(
          privateSessions.map((session) =>
            session._id === values._id ? res.data.data : session
          )
        );
      } catch (error) {
        console.log(error);
        toast.error(t("Something went wrong"));
      }
    },
  });

  // delete offer
  const handleDeleteOffer = async () => {
    try {
      const id = addOfferPS.values._id;
      const res = await axiosPrivate.delete(
        `gyms/${gymId}/private-sessions/${id}/offer`
      );
      console.log("res", res);
      toast.success(t("Offer deleted successfully"));
      const newSessions = privateSessions.map((ps) => {
        if (ps._id === id) {
          return {
            ...ps,
            offer: { cost: null, duration: null, expireAt: null },
          };
        }
        return ps;
      });
      setPrivateSessions(newSessions);
      addOfferPS.resetForm();
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong"));
    }
  };

  /************ Handle Functions *************/
  // delete PS
  const handleDeletePS = async (id) => {
    try {
      const res = await axiosPrivate.delete(
        `/gyms/${gymId}/private-sessions/${id}`
      );
      console.log("res", res);
      toast.success(t("Private Session deleted successfully"));
      setPrivateSessions(
        privateSessions.filter((session) => session._id !== id)
      );
      setModalShowEditPS(false);
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong"));
    }
  };
  useEffect(() => {
    const fetchPrivateSessions = async () => {
      try {
        const response = await axiosInstance.get(
          `/gyms/${gymId}/private-sessions/`
        );
        setPrivateSessions(response.data.data.documents);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrivateSessions();
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="mainContent m-2 min-vh-100">
      <div className="plansOfMyGym">
        {privateSessions.map((session) => {
          return (
            <div className="plans-details">
              {(session?.offer.cost || session?.offer.duration) &&
                new Date(session?.offer.expireAt) > new Date() && (
                  <div className="offerDesign">{t("Offer")}</div>
                )}
              <div className="flexcenterend gap-2">
                {(session?.offer.cost || session?.offer.duration) &&
                new Date(session?.offer.expireAt) > new Date() ? (
                  <button
                    className="SecondaryButton"
                    onClick={() => {
                      addOfferPS.setValues({
                        _id: session._id,
                        cost: session?.offer.cost,
                        sessions: session?.offer.sessions,
                        expireAt: session?.offer.expireAt,
                      });
                      setModalShowEditOfferPS(true);
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
                    <span>{t("Edit Offer")}</span>
                  </button>
                ) : (
                  <button
                    className="SecondaryButton"
                    onClick={() => {
                      addOfferPS.setValues({
                        ...addOfferPS.values,
                        _id: session._id,
                      });
                      setModalShowAddOfferPS(true);
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
                    <span>{t("Add Offer")}</span>
                  </button>
                )}
                <button
                  className="PrimaryButton"
                  onClick={() => {
                    editPS.setValues({
                      cost: session.cost,
                      sessions: session.sessions,
                      expireIn: session.expireIn,
                      durationType: session.expireType,
                      _id: session._id,
                    });
                    setModalShowEditPS(true);
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
                  <span>{t("Edit")}</span>
                </button>
              </div>
              <div className="privateSessionBody my-3">
                <div className="flexcenterbetween">
                  <p className="fontLarge">
                    {session.sessions} Sessions package
                    <br />
                    {(session?.offer.cost || session?.offer.sessions) &&
                      new Date(session?.offer.expireAt) > new Date() && (
                        <small className="offerEndIn opacityL d-block">
                          {t("Offer ends in")}{" "}
                          {new Date(
                            session?.offer.expireAt
                          ).toLocaleDateString()}
                        </small>
                      )}
                  </p>
                  {new Date(session?.offer.expireAt) > new Date() ? (
                    <p>
                      {session.offer.cost ? (
                        <span className="fontMid">
                          <>
                            <del className="opacityL mx-2">
                              {session?.cost}
                              {t("EGP")}
                            </del>
                            <span className="midText primary-color">
                              {session?.offer.cost}
                              {t("EGP")}
                            </span>
                          </>
                        </span>
                      ) : (
                        <span className="fontMid">
                          {session.cost} <span>{t("EGP")}</span>
                        </span>
                      )}
                      / {session.offer.sessions || session.sessions}{" "}
                      {t("Sessions")}
                    </p>
                  ) : (
                    <p>
                      <span className="fontMid">
                        {session.cost} <span>{t("EGP")}</span>{" "}
                      </span>
                      / {session.sessions} {t("Sessions")}
                    </p>
                  )}
                </div>
                <div className="flexcenterstart">
                  <p className="font-smaller opacitySmall">
                    {t("Expires in")}{" "}
                    {`${session.expireIn} ${session.expireType}`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="add-role-card"
          onClick={() => {
            setModalShowAddPS(true);
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
            <p className="main-color">{t("Add Private Session")}</p>
          </div>
        </div>
      </div>
      <div className="modalAddPs">
        <Modal
          show={modalShowAddPS}
          onHide={() => setModalShowAddPS(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton id="modal">
            <Modal.Title id="contained-modal-title-vcenter">
              {t("Add Private Session")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form onSubmit={addPS.handleSubmit}>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Cost")}
                        id={
                          addPS.errors.cost && addPS.touched.cost
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Cost")}
                          name="cost"
                          value={addPS.values.cost}
                          onChange={addPS.handleChange}
                          onBlur={addPS.handleBlur}
                        />
                      </FloatingLabel>
                      {addPS.errors.cost && addPS.touched.cost && (
                        <small className="error-message">
                          {addPS.errors.cost}
                        </small>
                      )}
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Sessions Number")}
                        id={
                          addPS.errors.sessions && addPS.touched.sessions
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          placeholder={t("Sessions Number")}
                          name="sessions"
                          value={addPS.values.sessions}
                          onChange={addPS.handleChange}
                          onBlur={addPS.handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                      {addPS.errors.sessions && addPS.touched.sessions && (
                        <small className="error-message">
                          {addPS.errors.sessions}
                        </small>
                      )}
                    </div>
                  </div>
                  <p className="opacitySmall font-small">{t("Expires In")}</p>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Number")}
                        id={
                          addPS.errors.expireIn && addPS.touched.expireIn
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          placeholder={t("Number")}
                          name="expireIn"
                          value={addPS.values.expireIn}
                          onChange={addPS.handleChange}
                          onBlur={addPS.handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                      {addPS.errors.expireIn && addPS.touched.expireIn && (
                        <small className="error-message">
                          {addPS.errors.expireIn}
                        </small>
                      )}
                    </div>
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Duration type")}
                        id={
                          addPS.errors.durationType &&
                          addPS.touched.durationType
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Select
                          name="durationType"
                          value={addPS.values.durationType}
                          onChange={addPS.handleChange}
                          onBlur={addPS.handleBlur}
                        >
                          <option value="" disabled selected>
                            {t("Select Duration type")}
                          </option>
                          <option value={"days"}>{t("days")}</option>
                          <option value={"weeks"}>{t("weeks")}</option>
                          <option value={"months"}>{t("months")}</option>
                        </Form.Select>
                      </FloatingLabel>
                      {addPS.errors.durationType &&
                        addPS.touched.durationType && (
                          <small className="error-message">
                            {addPS.errors.durationType}
                          </small>
                        )}
                    </div>
                  </div>
                </div>

                <div className="flexcenterbetween  gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    {t("Add Private Session")}
                  </button>
                  <button
                    onClick={() => {
                      setModalShowAddPS(false);
                    }}
                    className="DangerButton w-100"
                  >
                    {t("Cancel")}
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="modalEditPs">
        <Modal
          show={modalShowEditPS}
          onHide={() => setModalShowEditPS(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton id="modal">
            <Modal.Title id="contained-modal-title-vcenter">
              {t("Edit Private Session")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form onSubmit={editPS.handleSubmit}>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Cost")}
                        id={
                          editPS.errors.cost && editPS.touched.cost
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder={t("Cost")}
                          name="cost"
                          value={editPS.values.cost}
                          onChange={editPS.handleChange}
                          onBlur={editPS.handleBlur}
                        />
                      </FloatingLabel>
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Sessions Number")}
                        id={
                          editPS.errors.sessions && editPS.touched.sessions
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          placeholder={t("Sessions Number")}
                          name="sessions"
                          value={editPS.values.sessions}
                          onChange={editPS.handleChange}
                          onBlur={editPS.handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                  </div>
                  <p className="opacitySmall font-small">{t("Expires in")}</p>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Number")}
                        id={
                          editPS.errors.expireIn && editPS.touched.expireIn
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          placeholder={t("Number")}
                          name="expireIn"
                          value={editPS.values.expireIn}
                          onChange={editPS.handleChange}
                          onBlur={editPS.handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Duration type")}
                        id={
                          editPS.errors.durationType &&
                          editPS.touched.durationType
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Select
                          name="durationType"
                          value={editPS.values.durationType}
                          onChange={editPS.handleChange}
                          onBlur={editPS.handleBlur}
                        >
                          <option value="" disabled selected>
                            {t("Select Duration type")}
                          </option>
                          <option value={"days"}>{t("days")}</option>
                          <option value={"weeks"}>{t("weeks")}</option>
                          <option value={"months"}>{t("months")}</option>
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                  </div>
                </div>

                <div className="flexcenterbetween  gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    {t("Edit Private Session")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePS(editPS.values._id)}
                    className="DangerButton w-100"
                  >
                    {t("Delete Private Session")}
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="modalEditOfferPs">
        <Modal
          show={modalShowEditOfferPS}
          onHide={() => setModalShowEditOfferPS(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton id="modal">
            <Modal.Title id="contained-modal-title-vcenter">
              {t("Edit Offer on private session")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form onSubmit={addOfferPS.handleSubmit}>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Offer Price")}
                        id={
                          addOfferPS.errors.cost && addOfferPS.touched.cost
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder={t("Offer Price")}
                          name="cost"
                          value={addOfferPS.values.cost}
                          onChange={addOfferPS.handleChange}
                          onBlur={addOfferPS.handleBlur}
                        />
                      </FloatingLabel>
                      {addOfferPS.errors.cost && addOfferPS.touched.cost && (
                        <div className="text-danger">
                          {addOfferPS.errors.cost}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        min={0}
                        label={t("Sessions Number")}
                        id={
                          addOfferPS.errors.sessions &&
                          addOfferPS.touched.sessions
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          placeholder={t("Sessions Number")}
                          name="sessions"
                          value={addOfferPS.values.sessions}
                          onChange={addOfferPS.handleChange}
                          onBlur={addOfferPS.handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                      {addOfferPS.errors.sessions &&
                        addOfferPS.touched.sessions && (
                          <div className="text-danger">
                            {addOfferPS.errors.sessions}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="mb-2 w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("End Date to the Offer")}
                      id={
                        addOfferPS.errors.expireAt &&
                        addOfferPS.touched.expireAt
                          ? "floatingError"
                          : "floatingInput"
                      }
                    >
                      <Form.Control
                        type="date"
                        min="1997-01-01"
                        max="2030-12-31"
                        placeholder="dd/mm/yyyy"
                        name="expireAt"
                        value={addOfferPS.values.expireAt.split("T")[0]}
                        onChange={addOfferPS.handleChange}
                        onBlur={addOfferPS.handleBlur}
                      ></Form.Control>
                    </FloatingLabel>
                    {addOfferPS.errors.expireAt &&
                      addOfferPS.touched.expireAt && (
                        <small className="error-message">
                          {addOfferPS.errors.expireAt}
                        </small>
                      )}
                  </div>
                  {/* <p className="opacitySmall font-small"> Expires In</p>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Number"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          placeholder="Number"
                          name="expiresIn"
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="duration type"
                        id={"floatingInput"}
                      >
                        <Form.Select name="durationType">
                          <option value="" disabled selected>
                            Select Duration type
                          </option>
                          <option value={"day"}>day</option>
                          <option value={"week"}>week</option>
                          <option value={"month"}>month</option>
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                  </div> */}
                </div>

                <div className="flexcenterbetween gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    {t("Edit Offer")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteOffer();
                      setModalShowEditOfferPS(false);
                    }}
                    className="DangerButton w-100"
                  >
                    {t("Delete Offer")}
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="modalAddOfferPs">
        <Modal
          show={modalShowAddOfferPS}
          onHide={() => setModalShowAddOfferPS(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton id="modal">
            <Modal.Title id="contained-modal-title-vcenter">
              {t("Add Offer on private session")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form onSubmit={addOfferPS.handleSubmit}>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label={t("Offer Price")}
                        id={
                          addOfferPS.errors.cost && addOfferPS.touched.cost
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder={t("Offer Price")}
                          name="cost"
                          value={addOfferPS.values.cost}
                          onChange={addOfferPS.handleChange}
                          onBlur={addOfferPS.handleBlur}
                        />
                      </FloatingLabel>
                      {addOfferPS.errors.cost && addOfferPS.touched.cost && (
                        <div className="text-danger">
                          {addOfferPS.errors.cost}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        min={0}
                        label={t("Sessions Number")}
                        id={
                          addOfferPS.errors.sessions &&
                          addOfferPS.touched.sessions
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="number"
                          placeholder={t("Sessions Number")}
                          name="sessions"
                          value={addOfferPS.values.sessions}
                          onChange={addOfferPS.handleChange}
                          onBlur={addOfferPS.handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                      {addOfferPS.errors.sessions &&
                        addOfferPS.touched.sessions && (
                          <div className="text-danger">
                            {addOfferPS.errors.sessions}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="mb-2 w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label={t("End Date to the Offer")}
                      id={
                        addOfferPS.errors.expireAt &&
                        addOfferPS.touched.expireAt
                          ? "floatingError"
                          : "floatingInput"
                      }
                    >
                      <Form.Control
                        type="date"
                        min="1997-01-01"
                        max="2030-12-31"
                        placeholder="dd/mm/yyyy"
                        name="expireAt"
                        value={addOfferPS.values.expireAt.split("T")[0]}
                        onChange={addOfferPS.handleChange}
                        onBlur={addOfferPS.handleBlur}
                      ></Form.Control>
                    </FloatingLabel>
                    {addOfferPS.errors.expireAt &&
                      addOfferPS.touched.expireAt && (
                        <small className="error-message">
                          {addOfferPS.errors.expireAt}
                        </small>
                      )}
                  </div>
                  {/* <p className="opacitySmall font-small"> Expires In</p>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Number"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          placeholder="Number"
                          name="expiresIn"
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="duration type"
                        id={"floatingInput"}
                      >
                        <Form.Select name="durationType">
                          <option value="" disabled selected>
                            Select Duration type
                          </option>
                          <option value={"day"}>day</option>
                          <option value={"week"}>week</option>
                          <option value={"month"}>month</option>
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                  </div> */}
                </div>

                <div className="flexcenterbetween gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    {t("Add Offer")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalShowAddOfferPS(false);
                    }}
                    className="DangerButton w-100"
                  >
                    {t("Cancel")}
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default PrivateSession;
