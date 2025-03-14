import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Modal, Button, Col, Row } from "react-bootstrap";
import {
  offerValidationSchema,
  planValidationSchema,
} from "../../Validations/PlanValidation";
import { useFormik } from "formik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import "./Plans.css";
import PrivateSession from "./PrivateSessions/PrivateSession";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/FormatDate";

let planId;
const Plans = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState("en");
  useEffect(() => {
    setLang(localStorage.getItem("i18nextLng") || "en");
  }, []);
  const [loading, setLoading] = useState(true);
  const [modalAddPlan, setModalShowAddPlan] = useState(false);
  const [modalEditPlan, setModalShowEditPlan] = useState(false);
  const [modalAddOffer, setModalShowAddOffer] = useState(false);
  const [modalEditOffer, setModalShowEditOffer] = useState(false);
  const [currentPage, setCurrentPage] = useState("Memberships");
  const axiosPrivate = useAxiosPrivate();
  const { gymId } = useSelector((state) => state.user);

  const onSubmit = async (values, actions) => {
    console.log("Form submitted:", values);
    actions.setSubmitting(true);
    try {
      const { data } = await axiosPrivate.post(`gyms/${gymId}/plans`, {
        name: values.name,
        cost: values.cost,
        duration: values.duration,
        freezeDays: values.freezeDays,
        minFreezeDays: values.minFreezeDays,
        invitationsNumber: values.invitationsNumber,
        privateSessionsNumber: values.privateSessionsNumber,
        nutritionSessionsNumber: values.nutritionSessionsNumber,
        inBody: values.inBody,
        features: inputs,
        description: values.description,
      });
      console.log("res", data);
      toast.success(t("Plan added successfully"));
      setPlans([data?.data, ...plans]);
      setTimeout(() => {
        setModalShowAddPlan(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong"));
    }

    setTimeout(() => {
      actions.resetForm();
      actions.setSubmitting(false);
    }, 1000);
  };
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
      name: "",
      cost: "",
      duration: "",
      description: "",
      freezeDays: "",
      minFreezeDays: "",
      invitationsNumber: "",
      privateSessionsNumber: "",
      nutritionSessionsNumber: "",
      inBody: "",
    },
    validationSchema: planValidationSchema,
    onSubmit,
  });

  const [inputs, setInputs] = useState([""]);

  const handleChangeOfPlans = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const removeInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };
  const inputs2 = ["feature1", "feature2"];
  const [inputs22, setInputs22] = useState(inputs2);

  const handleChangeOfEditPlans = (index, event) => {
    const newInputs = [...inputs22];
    newInputs[index] = event.target.value;
    setInputs22(newInputs);
  };

  const addInputEdit = () => {
    setInputs22([...inputs22, ""]);
  };

  const removeInputEdit = (index) => {
    const newInputs = inputs22.filter((_, i) => i !== index);
    setInputs22(newInputs);
  };

  const handlePrintValues = () => {
    console.log(inputs22);
  };

  // get plans
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      const res = await axiosPrivate.get(`gyms/${gymId}/plans`);
      setPlans(res?.data?.data?.documents);
      console.log("plans", res?.data?.data?.documents);
      setLoading(false);
    };
    fetchPlans();
    console.log("handleSubmit", handleSubmit);
  }, []);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Update editPlan form when selectedPlan changes
  useEffect(() => {
    if (selectedPlan) {
      editPlan.setValues({
        name: selectedPlan?.name || "",
        cost: selectedPlan?.cost || "",
        duration: selectedPlan?.duration || "",
        description: selectedPlan?.description || "",
        freezeDays: selectedPlan?.freezeDays || "",
        minFreezeDays: selectedPlan?.minFreezeDays || "",
        invitationsNumber: selectedPlan?.invitationsNumber || "",
        privateSessionsNumber: selectedPlan?.privateSessionsNumber || "",
        nutritionSessionsNumber: selectedPlan?.nutritionSessionsNumber || "",
        inBody: selectedPlan?.inBody || "",
        features: selectedPlan?.features || [""],
      });
    }
  }, [selectedPlan]);

  const handleShowEditPlan = async (plan) => {
    setSelectedPlan(plan);
    setModalShowEditPlan(true);
  };

  const editPlan = useFormik({
    initialValues: {
      name: "",
      cost: "",
      duration: "",
      description: "",
    },
    validationSchema: planValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        console.log("inputs", inputs22);
        const { data } = await axiosPrivate.patch(
          `/gyms/${gymId}/plans/${selectedPlan?._id}`,
          {
            name: values.name,
            cost: values.cost,
            duration: values.duration,
            freezeDays: values.freezeDays,
            minFreezeDays: values.minFreezeDays,
            invitationsNumber: values.invitationsNumber,
            privateSessionsNumber: values.privateSessionsNumber,
            nutritionSessionsNumber: values.nutritionSessionsNumber,
            inBody: values.inBody,
            features: inputs22,
            description: values.description,
          }
        );
        console.log("res", data);
        toast.success(t("Plan updated successfully"));
        setModalShowEditPlan(false);
        const editedPlans = plans.map((plan) => {
          if (selectedPlan?._id === plan._id) {
            return data?.data;
          }
          return plan;
        });

        setPlans(editedPlans);
      } catch (error) {
        console.log(error);
        toast.error(t("Something went wrong"));
      }
    },
  });

  // edit offer
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    if (selectedOffer) {
      console.log("selectedOffer", selectedOffer);
      editOffer.setValues({
        cost: selectedOffer?.cost || "",
        duration: selectedOffer?.duration || "",
        expireAt: selectedOffer?.expireAt || "",
      });
    }
  }, [selectedOffer]);
  const handleShowEditOffer = async (offer) => {
    setSelectedOffer(offer);
    setModalShowEditOffer(true);
  };

  const editOffer = useFormik({
    initialValues: {
      cost: "",
      duration: "",
      expireAt: "",
    },
    // validationSchema: offerValidationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const { data } = await axiosPrivate.patch(
          `gyms/${gymId}/plans/${planId}/offer`,
          {
            cost: values.cost || undefined,
            duration: values.duration || undefined,
            expireAt: values.expireAt || undefined,
          }
        );
        console.log("res", data);
        toast.success(t("Offer updated successfully"));
        setModalShowEditOffer(false);
        const editedPlans = plans.map((plan) => {
          if (data?.data?._id === plan._id) {
            return data?.data;
          }
          return plan;
        });

        setPlans(editedPlans);
      } catch (error) {
        if (error.response.status === 400) {
          if (error.response.data.errors) {
            toast.error(
              <div>
                <strong>{error.response.data.message}</strong>
                <ul>
                  {error.response.data.errors.map((err, index) => (
                    <li key={index}>{err.msg}</li>
                  ))}
                </ul>
              </div>
            );
          } else {
            toast.error(error.response.data.message);
          }
        } else {
          toast.error(t("Something went wrong"));
        }
        console.log(error);
      }
    },
  });

  // delete offer
  const handleDeleteOffer = async () => {
    try {
      const res = await axiosPrivate.delete(
        `gyms/${gymId}/plans/${planId}/offer`
      );
      console.log("res", res);
      toast.success(t("Offer deleted successfully"));
      const newPlans = plans.map((plan) => {
        if (plan._id === planId) {
          return {
            ...plan,
            offer: { cost: null, duration: null, expireAt: null },
          };
        }
        return plan;
      });
      setPlans(newPlans);
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong"));
    }
  };

  //delete plan
  const handleDeletePlan = async (id) => {
    try {
      const res = await axiosPrivate.delete(`/gyms/${gymId}/plans/${id}`);
      console.log("res", res);
      toast.success(t("Plan deleted successfully"));
      const newPlans = plans.filter((plan) => {
        return plan._id !== id;
      });
      setPlans(newPlans);
      setModalShowEditPlan(false);
    } catch (error) {
      console.log(error);
      toast.error(t("Something went wrong"));
    }
  };
  const [langType, setLangType] = useState("en");
  useEffect(() => {
    setLangType(localStorage.getItem("i18nextLng"));
  }, []);
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <div className="myInfo">
          <div className="myInfoHeading">
            <div className="titleContainer">
              <h2 className="title">{t("Plans")}</h2>
            </div>
          </div>
          <div className="flexcenterstart bigCardTwo p-2 gap-4">
            <div
              className={`cursor-pointer p-3 ${
                currentPage === "Memberships"
                  ? "main-color border-bottom-main-color"
                  : ""
              }`}
              onClick={() => setCurrentPage("Memberships")}
            >
              {t("Memberships")}
            </div>
            <div
              className={`cursor-pointer p-3 ${
                currentPage === "Private sessions"
                  ? "main-color border-bottom-main-color"
                  : ""
              }`}
              onClick={() => setCurrentPage("Private sessions")}
            >
              {t("Private sessions")}
            </div>
          </div>
          {currentPage === "Memberships" ? (
            <>
              <div className="plansOfMyGym">
                <div
                  className="plans-details add-plan"
                  onClick={() => {
                    setModalShowAddPlan(true);
                  }}
                >
                  <div className="Add">
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
                    <p className="main-color">{t("Add New Plan")}</p>
                  </div>
                </div>
                {plans.map((plan) => {
                  return (
                    <div className={"plans-details"}>
                      <div>
                        {(plan?.offer.cost || plan?.offer.duration) &&
                          new Date(plan?.offer.expireAt) > new Date() && (
                            <div
                              className={`${
                                lang === "en" ? "offerDesign" : "offerDesignAr"
                              }`}
                            >
                              {t("Offer")}
                            </div>
                          )}
                      </div>
                      <div className="main-of-pd">
                        <div className="my-2 mx-0 addEditDeletePlan d-flex justify-content-end align-items-center">
                          {(plan?.offer.cost || plan?.offer.duration) &&
                          new Date(plan?.offer.expireAt) > new Date() ? (
                            <>
                              <button
                                className="SecondaryButton mx-1"
                                onClick={() => {
                                  handleShowEditOffer(plan?.offer);
                                  planId = plan?._id;
                                }}
                              >
                                {t("Edit Offer")}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="PrimaryButton mx-1"
                                onClick={() => {
                                  planId = plan._id;
                                  setModalShowAddOffer(true);
                                  editOffer.setValues({
                                    cost: "",
                                    duration: "",
                                    expireAt: "",
                                  });
                                }}
                              >
                                {t("Add Offer")}
                              </button>
                            </>
                          )}

                          <button
                            className="PrimaryButton mx-1"
                            onClick={() => {
                              handleShowEditPlan(plan);
                            }}
                          >
                            {t("Edit")}
                          </button>
                        </div>
                        <div className="line1 flexcenterbetween">
                          <div className="d-flex flex-column justify-content-center align-items-start">
                            <span className="midText">{plan?.name}</span>
                            <p className="text-small-opacity">
                              {formatDate(plan?.createdAt)}
                            </p>
                            {(plan?.offer.cost || plan?.offer.duration) &&
                              new Date(plan?.offer.expireAt) > new Date() && (
                                <small className="offerEndIn opacityL d-block">
                                  {t("Offer ends in")}{" "}
                                  {new Date(
                                    plan?.offer.expireAt
                                  ).toLocaleDateString()}
                                </small>
                              )}
                          </div>

                          <span>
                            {plan?.offer.cost &&
                            new Date(plan?.offer.expireAt) > new Date() ? (
                              <>
                                <del className="opacityL mx-2">
                                  {plan?.cost}
                                  {t("EGP")}
                                </del>
                                <span className="midText primary-color">
                                  {plan?.offer.cost}
                                  {t("EGP")}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="midText">
                                  {plan?.cost}
                                  {t("EGP")}
                                </span>
                              </>
                            )}
                            /
                            {plan?.offer.duration &&
                            new Date(plan?.offer.expireAt) > new Date() ? (
                              <>
                                <span>{plan?.offer.duration}</span>{" "}
                                {t("Months")}
                              </>
                            ) : (
                              <span>
                                {plan?.duration} {t("Months")}
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="opacitySmall">{t("Plan Includes")}</p>
                        <div className="line2 flexcenterbetween flex-wrap">
                          {plan.features.map((feature) => {
                            return (
                              <div className="w-40 m-1 p-1 flexcenterstart">
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
                                <span className="">{feature}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* <div className="flexcenterbetween">
                        <button
                          className="SecondaryButton w-100 m-2"
                          onClick={() => {
                            handleShowEditPlan(plan);
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
                          Edit
                        </button>
                        <button
                          className="DangerButton w-100 m-2"
                          onClick={() => {
                            handleDeletePlan(plan?._id);
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
                          Delete
                        </button>
                      </div> */}
                    </div>
                  );
                })}
              </div>
              <div className="modalAddPlan">
                <Modal
                  show={modalAddPlan}
                  onHide={() => setModalShowAddPlan(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton id="modal">
                    <Modal.Title id="contained-modal-title-vcenter">
                      {t("Add Plan")}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="modal">
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="mb-2">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Plan Name")}
                              id={
                                errors.name && touched.name
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder={t("Plan Name")}
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FloatingLabel>
                            {errors.name && touched.name && (
                              <small className="error-message">
                                {errors.name}
                              </small>
                            )}
                          </div>

                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Cost")}
                                id={
                                  errors.cost && touched.cost
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Cost")}
                                  name="cost"
                                  value={values.cost}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.cost && touched.cost && (
                                <small className="error-message">
                                  {errors.cost}
                                </small>
                              )}
                            </div>
                            <p>{t("Per")}</p>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Duration(months)")}
                                id={
                                  errors.duration && touched.duration
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Duration(months)")}
                                  value={values.duration}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="duration"
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.duration && touched.duration && (
                                <small className="error-message">
                                  {errors.duration}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Freeze Days")}
                                id={
                                  errors.freezeDays && touched.freezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Freeze Days")}
                                  name="freezeDays"
                                  value={values.freezeDays}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.freezeDays && touched.freezeDays && (
                                <small className="error-message">
                                  {errors.freezeDays}
                                </small>
                              )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Min Freeze Days")}
                                id={
                                  errors.minFreezeDays && touched.minFreezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Min Freeze Days")}
                                  value={values.minFreezeDays}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="minFreezeDays"
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.minFreezeDays &&
                                touched.minFreezeDays && (
                                  <small className="error-message">
                                    {errors.minFreezeDays}
                                  </small>
                                )}
                            </div>

                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="in body"
                                id={
                                  errors.inBody && touched.inBody
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="in Body"
                                  value={values.inBody}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="inBody"
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.inBody && touched.inBody && (
                                <small className="error-message">
                                  {errors.inBody}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Invitations Number")}
                                id={
                                  errors.invitationsNumber &&
                                  touched.invitationsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Invitations Number")}
                                  name="invitationsNumber"
                                  value={values.invitationsNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.invitationsNumber &&
                                touched.invitationsNumber && (
                                  <small className="error-message">
                                    {errors.invitationsNumber}
                                  </small>
                                )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Private Sessions Number")}
                                id={
                                  errors.privateSessionsNumber &&
                                  touched.privateSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Private Sessions Number")}
                                  value={values.privateSessionsNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="privateSessionsNumber"
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.privateSessionsNumber &&
                                touched.privateSessionsNumber && (
                                  <small className="error-message">
                                    {errors.privateSessionsNumber}
                                  </small>
                                )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Nutrition Sessions Number")}
                                id={
                                  errors.nutritionSessionsNumber &&
                                  touched.nutritionSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Nutrition Sessions Number")}
                                  value={values.nutritionSessionsNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="nutritionSessionsNumber"
                                ></Form.Control>
                              </FloatingLabel>
                              {errors.nutritionSessionsNumber &&
                                touched.nutritionSessionsNumber && (
                                  <small className="error-message">
                                    {errors.nutritionSessionsNumber}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="mb-2 w-100 includedFitures">
                            <p className="font-bold">Plan Includes</p>
                            {inputs.map((input, index) => (
                              <Row key={index} className="mb-3 w-100">
                                <Col>
                                  <FloatingLabel
                                    className="w-100"
                                    controlId="floatingInput"
                                    label={t("Features")}
                                    id={"floatingInput"}
                                  >
                                    <Form.Control
                                      className="w-100"
                                      type="text"
                                      placeholder={t("Enter feature")}
                                      value={input}
                                      onChange={(event) =>
                                        handleChangeOfPlans(index, event)
                                      }
                                    />
                                  </FloatingLabel>
                                </Col>
                                <Col xs="auto">
                                  {inputs.length > 1 && (
                                    <Button
                                      variant="danger"
                                      type="button"
                                      onClick={() => removeInput(index)}
                                    >
                                      -
                                    </Button>
                                  )}
                                </Col>
                                <Col xs="auto">
                                  {index === inputs.length - 1 &&
                                    input !== "" && (
                                      <Button
                                        variant="primary"
                                        type="button"
                                        onClick={addInput}
                                      >
                                        +
                                      </Button>
                                    )}
                                </Col>
                              </Row>
                            ))}
                          </div>
                          <div className="mb-2 w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Description")}
                              id={
                                errors.description && touched.description
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder={t("Description")}
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              ></Form.Control>
                            </FloatingLabel>
                            {errors.description && touched.description && (
                              <small className="error-message">
                                {errors.description}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="flexcenterbetween gap-2 ">
                          <button
                            className="SecondaryButton w-100"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {t("Add Plan")}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setModalShowAddPlan(false);
                            }}
                            className="DangerButton w-100"
                            w-100
                          >
                            {t("Cancel")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
              <div className="modalEditPlan">
                <Modal
                  show={modalEditPlan}
                  onHide={() => setModalShowEditPlan(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton id="modal">
                    <Modal.Title id="contained-modal-title-vcenter">
                      {t("Edit Plan")}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="modal">
                    <div>
                      <form onSubmit={editPlan.handleSubmit}>
                        <div>
                          <div className="mb-2">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Plan Name")}
                              id={
                                editPlan.errors.name && editPlan.touched.name
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder={t("Plan Name")}
                                name="name"
                                value={editPlan.values.name}
                                onChange={editPlan.handleChange}
                                onBlur={editPlan.handleBlur}
                              />
                            </FloatingLabel>
                            {editPlan.errors.name && editPlan.touched.name && (
                              <small className="error-message">
                                {editPlan.errors.name}
                              </small>
                            )}
                          </div>

                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Cost")}
                                id={
                                  editPlan.errors.cost && editPlan.touched.cost
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Cost")}
                                  name="cost"
                                  value={editPlan.values.cost}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                />
                              </FloatingLabel>
                              {editPlan.errors.cost &&
                                editPlan.touched.cost && (
                                  <small className="error-message">
                                    {editPlan.errors.cost}
                                  </small>
                                )}
                            </div>
                            <p>{t("Per")} </p>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Duration(months)")}
                                id={
                                  editPlan.errors.duration &&
                                  editPlan.touched.duration
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Duration(months)")}
                                  value={editPlan.values.duration}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                  name="duration"
                                />
                              </FloatingLabel>
                              {editPlan.errors.duration &&
                                editPlan.touched.duration && (
                                  <small className="error-message">
                                    {editPlan.errors.duration}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Freeze Days")}
                                id={
                                  editPlan.errors.freezeDays &&
                                  editPlan.touched.freezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Freeze Days")}
                                  name="freezeDays"
                                  value={editPlan.values.freezeDays}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                />
                              </FloatingLabel>
                              {editPlan.errors.freezeDays &&
                                editPlan.touched.freezeDays && (
                                  <small className="error-message">
                                    {editPlan.errors.freezeDays}
                                  </small>
                                )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Min Freeze Days")}
                                id={
                                  editPlan.errors.minFreezeDays &&
                                  editPlan.touched.minFreezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Min Freeze Days")}
                                  value={editPlan.values.minFreezeDays}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                  name="minFreezeDays"
                                />
                              </FloatingLabel>
                              {editPlan.errors.minFreezeDays &&
                                editPlan.touched.minFreezeDays && (
                                  <small className="error-message">
                                    {editPlan.errors.minFreezeDays}
                                  </small>
                                )}
                            </div>

                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="in body"
                                id={
                                  editPlan.errors.inBody &&
                                  editPlan.touched.inBody
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="in Body"
                                  value={editPlan.values.inBody}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                  name="inBody"
                                ></Form.Control>
                              </FloatingLabel>
                              {editPlan.errors.inBody &&
                                editPlan.touched.inBody && (
                                  <small className="error-message">
                                    {editPlan.errors.inBody}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Invitations Number")}
                                id={
                                  editPlan.errors.invitationsNumber &&
                                  editPlan.touched.invitationsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Invitations Number")}
                                  name="invitationsNumber"
                                  value={editPlan.values.invitationsNumber}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                />
                              </FloatingLabel>
                              {editPlan.errors.invitationsNumber &&
                                editPlan.touched.invitationsNumber && (
                                  <small className="error-message">
                                    {editPlan.errors.invitationsNumber}
                                  </small>
                                )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Private Sessions Number")}
                                id={
                                  editPlan.errors.privateSessionsNumber &&
                                  editPlan.touched.privateSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Private Sessions Number")}
                                  value={editPlan.values.privateSessionsNumber}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                  name="privateSessionsNumber"
                                />
                              </FloatingLabel>
                              {editPlan.errors.privateSessionsNumber &&
                                editPlan.touched.privateSessionsNumber && (
                                  <small className="error-message">
                                    {editPlan.errors.privateSessionsNumber}
                                  </small>
                                )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("Nutrition Sessions Number")}
                                id={
                                  editPlan.errors.nutritionSessionsNumber &&
                                  editPlan.touched.nutritionSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder={t("Nutrition Sessions Number")}
                                  value={
                                    editPlan.values.nutritionSessionsNumber
                                  }
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                  name="nutritionSessionsNumber"
                                />
                              </FloatingLabel>
                              {editPlan.errors.nutritionSessionsNumber &&
                                editPlan.touched.nutritionSessionsNumber && (
                                  <small className="error-message">
                                    {editPlan.errors.nutritionSessionsNumber}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="mb-2 w-100 includedFitures">
                            <p className="font-bold">Plan Includes</p>
                            {inputs22.map((input, index) => (
                              <Row key={index} className="mb-3 w-100">
                                <Col>
                                  <FloatingLabel
                                    className="w-100"
                                    controlId="floatingInput"
                                    label={t("Features")}
                                    id={"floatingInput"}
                                  >
                                    <Form.Control
                                      className="w-100"
                                      type="text"
                                      placeholder={`${t("Enter feature")} ${
                                        index + 1
                                      }`}
                                      value={input}
                                      onChange={(event) =>
                                        handleChangeOfEditPlans(index, event)
                                      }
                                    />
                                  </FloatingLabel>
                                </Col>
                                <Col xs="auto">
                                  {inputs22.length > 1 && (
                                    <Button
                                      variant="danger"
                                      type="button"
                                      onClick={() => removeInputEdit(index)}
                                    >
                                      -
                                    </Button>
                                  )}
                                </Col>
                                <Col xs="auto">
                                  {index === inputs22.length - 1 && (
                                    <Button
                                      variant="primary"
                                      type="button"
                                      onClick={addInputEdit}
                                    >
                                      +
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </div>
                          <div className="mb-2 w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Description")}
                              id={
                                editPlan.errors.description &&
                                editPlan.touched.description
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                as="textarea"
                                placeholder={t("Description")}
                                name="description"
                                value={editPlan.values.description}
                                onChange={editPlan.handleChange}
                                onBlur={editPlan.handleBlur}
                              />
                            </FloatingLabel>
                            {editPlan.errors.description &&
                              editPlan.touched.description && (
                                <small className="error-message">
                                  {editPlan.errors.description}
                                </small>
                              )}
                          </div>
                        </div>
                        <div className="flexcenterbetween gap-2 ">
                          <button
                            className="SecondaryButton w-100"
                            type="submit"
                            disabled={editPlan.isSubmitting}
                          >
                            {t("Edit Plan")}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeletePlan(selectedPlan._id);
                            }}
                            className="DangerButton w-100"
                          >
                            {t("Delete Plan")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>

              <div className="OfferModals">
                <div className="modalAddOffer">
                  <Modal
                    show={modalAddOffer}
                    onHide={() => setModalShowAddOffer(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton id="modal">
                      <Modal.Title id="contained-modal-title-vcenter">
                        {t("Add Offer")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modal">
                      <div>
                        <form onSubmit={editOffer.handleSubmit}>
                          <div>
                            <div className="costpermonth">
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label={t("Offer Cost")}
                                  id={
                                    editOffer.errors.cost &&
                                    editOffer.touched.cost
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder={t("Cost")}
                                    name="cost"
                                    value={editOffer.values.cost}
                                    onChange={editOffer.handleChange}
                                    onBlur={editOffer.handleBlur}
                                  ></Form.Control>
                                </FloatingLabel>
                                {editOffer.errors.cost &&
                                  editOffer.touched.cost && (
                                    <small className="error-message">
                                      {editOffer.errors.cost}
                                    </small>
                                  )}
                              </div>
                              <p>Per</p>
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label={t("Duration(months)")}
                                  id={
                                    editOffer.errors.duration &&
                                    editOffer.touched.duration
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder={t("Duration(months)")}
                                    value={editOffer.values.duration}
                                    onChange={editOffer.handleChange}
                                    onBlur={editOffer.handleBlur}
                                    name="duration"
                                  ></Form.Control>
                                </FloatingLabel>
                                {editOffer.errors.duration &&
                                  editOffer.touched.duration && (
                                    <small className="error-message">
                                      {editOffer.errors.duration}
                                    </small>
                                  )}
                              </div>
                            </div>
                            <div className="mb-2 w-100">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("End Date to the Offer")}
                                id={
                                  editOffer.errors.expireAt &&
                                  editOffer.touched.expireAt
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
                                  value={
                                    editOffer.values.expireAt.split("T")[0]
                                  }
                                  onChange={editOffer.handleChange}
                                  onBlur={editOffer.handleBlur}
                                ></Form.Control>
                              </FloatingLabel>
                              {editOffer.errors.description &&
                                editOffer.touched.description && (
                                  <small className="error-message">
                                    {editOffer.errors.description}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="flexcenterbetween gap-2">
                            <button
                              className="SecondaryButton w-100"
                              type="submit"
                              disabled={editOffer.isSubmitting}
                            >
                              {t("Add Offer")}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setModalShowAddOffer(false);
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
                <div className="modalEditOffer">
                  <Modal
                    show={modalEditOffer}
                    onHide={() => setModalShowEditOffer(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton id="modal">
                      <Modal.Title id="contained-modal-title-vcenter">
                        {t("Edit Offer")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modal">
                      <div>
                        <form onSubmit={editOffer.handleSubmit}>
                          <div>
                            <div className="costpermonth">
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label={t("Offer Cost")}
                                  id={
                                    editOffer.errors.cost &&
                                    editOffer.touched.cost
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder={t("Cost")}
                                    name="cost"
                                    value={editOffer.values.cost}
                                    onChange={editOffer.handleChange}
                                    onBlur={editOffer.handleBlur}
                                  ></Form.Control>
                                </FloatingLabel>
                                {editOffer.errors.cost &&
                                  editOffer.touched.cost && (
                                    <small className="error-message">
                                      {editOffer.errors.cost}
                                    </small>
                                  )}
                              </div>
                              <p>{t("Per")}</p>
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label={t("Duration(months)")}
                                  id={
                                    editOffer.errors.duration &&
                                    editOffer.touched.duration
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder={t("Duration(months)")}
                                    value={editOffer.values.duration}
                                    onChange={editOffer.handleChange}
                                    onBlur={editOffer.handleBlur}
                                    name="duration"
                                  ></Form.Control>
                                </FloatingLabel>
                                {editOffer.errors.duration &&
                                  editOffer.touched.duration && (
                                    <small className="error-message">
                                      {editOffer.errors.duration}
                                    </small>
                                  )}
                              </div>
                            </div>
                            <div className="mb-2 w-100">
                              <FloatingLabel
                                controlId="floatingInput"
                                label={t("End Date to the Offer")}
                                id={
                                  editOffer.errors.expireAt &&
                                  editOffer.touched.expireAt
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
                                  value={
                                    editOffer.values.expireAt.split("T")[0]
                                  }
                                  onChange={editOffer.handleChange}
                                  onBlur={editOffer.handleBlur}
                                ></Form.Control>
                              </FloatingLabel>
                              {editOffer.errors.expireAt &&
                                editOffer.touched.expireAt && (
                                  <small className="error-message">
                                    {editOffer.errors.expireAt}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="flexcenterbetween gap-2">
                            <button
                              className="SecondaryButton w-100"
                              type="submit"
                              disabled={editOffer.isSubmitting}
                            >
                              {t("Edit Offer")}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleDeleteOffer();
                                setModalShowEditOffer(false);
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
              </div>
            </>
          ) : (
            <>
              <div>
                <PrivateSession />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plans;
