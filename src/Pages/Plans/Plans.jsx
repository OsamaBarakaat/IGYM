import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Modal, Button, Col, Row } from "react-bootstrap";
import { planValidationSchema } from "../../Validations/PlanValidation";
import { useFormik } from "formik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import "./Plans.css";
import PrivateSession from "./PrivateSessions/PrivateSession";

const Plans = () => {
  const [loading, setLoading] = useState(true);
  const [modalAddPlan, setModalShowAddPlan] = useState(false);
  const [modalEditPlan, setModalShowEditPlan] = useState(false);
  const [modalAddOffer, setModalShowAddOffer] = useState(false);
  const [modalEditOffer, setModalShowEditOffer] = useState(false);
  const [currentPage, setCurrentPage] = useState("Memberships");
  const axiosPrivate = useAxiosPrivate();
  const onSubmit = async (values, actions) => {
    console.log("Form submitted:", values);
    actions.setSubmitting(true);
    try {
      const { data } = await axiosPrivate.post(
        "gyms/666ddfad7a0f09d99493d976/plans",
        {
          name: values.name,
          cost: values.cost,
          duration: values.duration,
          freezeDays: values.freezeDays,
          minFreezeDays: values.minFreezeDays,
          invitationsNumber: values.invitationsNumber,
          privateSessionsNumber: values.privateSessionsNumber,
          nutritionSessionsNumber: values.nutritionSessionsNumber,
          features: inputs,
          description: values.description,
        }
      );
      console.log("res", data);
      toast.success("Plan added successfully");
      setPlans([data?.data, ...plans]);
      setTimeout(() => {
        setModalShowAddPlan(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
      const res = await axiosPrivate.get(
        "/gyms/666ddfad7a0f09d99493d976/plans"
      );
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
        const { data } = await axiosPrivate.put(
          `/gyms/666ddfad7a0f09d99493d976/plans/${selectedPlan?._id}`,
          {
            name: values.name,
            cost: values.cost,
            duration: values.duration,
            freezeDays: values.freezeDays,
            minFreezeDays: values.minFreezeDays,
            invitationsNumber: values.invitationsNumber,
            privateSessionsNumber: values.privateSessionsNumber,
            nutritionSessionsNumber: values.nutritionSessionsNumber,
            features: inputs,
            description: values.description,
          }
        );
        console.log("res", data);
        toast.success("Plan updated successfullyyy");
        const editedPlans = plans.map((plan) => {
          if (selectedPlan?._id === plan._id) {
            return data?.data;
          }
          return plan;
        });

        setPlans(editedPlans);
      } catch (error) {
        console.log(error);
        toast.error("Something went wronggg");
      }
    },
  });

  //delete plan
  const handleDeletePlan = async (id) => {
    try {
      const res = await axiosPrivate.delete(
        `//gyms/666ddfad7a0f09d99493d976/plans/${id}`
      );
      console.log("res", res);
      toast.success("Plan deleted successfully");
      const newPlans = plans.filter((plan) => {
        return plan._id !== id;
      });
      setPlans(newPlans);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const plansArray = [
    {
      name: "Starter Plan",
      cost: 500,
      per: "month",
      offer: true,
      offerCost: 400,
      offerEndIn: " 11 / 6 / 2024",
    },
    {
      name: "Advanced Plan",
      cost: 1200,
      per: "quarter",
      offer: false,
    },
    {
      name: "Expert Plan",
      cost: 2000,
      per: "6 months",
      offer: false,
    },
    {
      name: "Master Plan",
      cost: 3500,
      per: "year",
      offer: false,
    },
  ];

  const planIncludes = [
    {
      name: "Access to fitness equipment",
    },
    {
      name: "Free Wi-Fi",
    },
    {
      name: "Nutritional guidance",
    },
    {
      name: "Facility access",
    },
    {
      name: "Guest passes",
    },
    {
      name: "Fitness assessments",
    },
    {
      name: "Group exercise classes",
    },
    {
      name: "Flexible membership",
    },
    {
      name: "Locker rooms",
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
    <div style={{ minHeight: "100vh" }}>
      <div>
        <div className="myInfo">
          <div className="myInfoHeading">
            <div className="titleContainer">
              <h2 className="title">Plans</h2>
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
              Memberships
            </div>
            <div
              className={`cursor-pointer p-3 ${
                currentPage === "Private sessions"
                  ? "main-color border-bottom-main-color"
                  : ""
              }`}
              onClick={() => setCurrentPage("Private sessions")}
            >
              Private sessions
            </div>
          </div>
          {currentPage === "Memberships" ? (
            <>
              <div className="plansOfMyGym">
                {plans.map((plan) => {
                  return (
                    <div className={"plans-details"}>
                      {plan?.offer && <div className="offerDesign">Offer</div>}
                      <div className="main-of-pd">
                        <div className="my-2 mx-0 addEditDeletePlan d-flex justify-content-end align-items-center">
                          {plan?.offer ? (
                            <>
                              <button
                                className="SecondaryButton mx-1"
                                onClick={() => {
                                  setModalShowEditOffer(true);
                                }}
                              >
                                Edit Offer
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="PrimaryButton mx-1"
                                onClick={() => {
                                  setModalShowAddOffer(true);
                                }}
                              >
                                Add Offer
                              </button>
                            </>
                          )}

                          <button
                            className="PrimaryButton mx-1"
                            onClick={() => {
                              handleShowEditPlan(plan);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="line1 flexcenterbetween">
                          <div className="d-flex flex-column justify-content-center align-items-start">
                            <span className="midText">{plan?.name}</span>
                            {plan?.offer && (
                              <small className="offerEndIn opacityL d-block">
                                Offer ends in {plan?.offerEndIn}
                              </small>
                            )}
                          </div>

                          <span>
                            {plan?.offer ? (
                              <>
                                <del className="opacityL mx-2">
                                  {plan?.cost}EGP
                                </del>
                                <span className="midText primary-color">
                                  {plan?.offerCost}EGP
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="midText">{plan?.cost}EGP</span>
                              </>
                            )}
                            /{plan?.duration} Months
                          </span>
                        </div>
                        <p className="opacitySmall">Plan Includes</p>
                        <div className="line2 flexcenterbetween flex-wrap">
                          {planIncludes.map((include) => {
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
                                <span className="">{include?.name}</span>
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
                    <p className="main-color">Add New Plan</p>
                  </div>
                </div>
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
                      Add Plan
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="modal">
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="mb-2">
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Plan Name"
                              id={
                                errors.name && touched.name
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder="Plan Name"
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
                                label="Cost"
                                id={
                                  errors.cost && touched.cost
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Cost"
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
                            <p>Per</p>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Duration(months)"
                                id={
                                  errors.duration && touched.duration
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Duration"
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
                                label="freezeDays"
                                id={
                                  errors.freezeDays && touched.freezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="freezeDays"
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
                                label="minFreezeDays"
                                id={
                                  errors.minFreezeDays && touched.minFreezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="minFreezeDays"
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
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="invitationsNumber"
                                id={
                                  errors.invitationsNumber &&
                                  touched.invitationsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="freezeDays"
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
                                label="privateSessionsNumber"
                                id={
                                  errors.privateSessionsNumber &&
                                  touched.privateSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="privateSessionsNumber"
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
                                label="nutritionSessionsNumber"
                                id={
                                  errors.nutritionSessionsNumber &&
                                  touched.nutritionSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="nutritionSessionsNumber"
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
                                    label="Featurs"
                                    id={"floatingInput"}
                                  >
                                    <Form.Control
                                      className="w-100"
                                      type="text"
                                      placeholder="Enter feature"
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
                              label="Description"
                              id={
                                errors.description && touched.description
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder="description"
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
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setModalShowAddPlan(false);
                            }}
                            className="DangerButton w-100"
                            w-100
                          >
                            Close
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
                      Edit Plan
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="modal">
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="mb-2">
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Plan Name"
                              id={
                                errors.name && touched.name
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder="Plan Name"
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
                                label="Cost"
                                id={
                                  errors.cost && touched.cost
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Cost"
                                  name="cost"
                                  value={values.cost}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FloatingLabel>
                              {errors.cost && touched.cost && (
                                <small className="error-message">
                                  {errors.cost}
                                </small>
                              )}
                            </div>
                            <p>Per</p>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Duration(months)"
                                id={
                                  errors.duration && touched.duration
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Duration"
                                  value={values.duration}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="duration"
                                />
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
                                label="Freeze Days"
                                id={
                                  errors.freezeDays && touched.freezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Freeze Days"
                                  name="freezeDays"
                                  value={values.freezeDays}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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
                                label="Minimum Freeze Days"
                                id={
                                  errors.minFreezeDays && touched.minFreezeDays
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Minimum Freeze Days"
                                  value={values.minFreezeDays}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="minFreezeDays"
                                />
                              </FloatingLabel>
                              {errors.minFreezeDays &&
                                touched.minFreezeDays && (
                                  <small className="error-message">
                                    {errors.minFreezeDays}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Invitations Number"
                                id={
                                  errors.invitationsNumber &&
                                  touched.invitationsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Invitations Number"
                                  name="invitationsNumber"
                                  value={values.invitationsNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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
                                label="Private Sessions Number"
                                id={
                                  errors.privateSessionsNumber &&
                                  touched.privateSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Private Sessions Number"
                                  value={values.privateSessionsNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="privateSessionsNumber"
                                />
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
                                label="Nutrition Sessions Number"
                                id={
                                  errors.nutritionSessionsNumber &&
                                  touched.nutritionSessionsNumber
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Nutrition Sessions Number"
                                  value={values.nutritionSessionsNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="nutritionSessionsNumber"
                                />
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
                            {inputs22.map((input, index) => (
                              <Row key={index} className="mb-3 w-100">
                                <Col>
                                  <FloatingLabel
                                    className="w-100"
                                    controlId="floatingInput"
                                    label="Featurs"
                                    id={"floatingInput"}
                                  >
                                    <Form.Control
                                      className="w-100"
                                      type="text"
                                      placeholder={`Enter Feature ${index + 1}`}
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
                              label="Description"
                              id={
                                errors.description && touched.description
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                as="textarea"
                                placeholder="Description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
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
                            Edit Plan
                          </button>
                          <button type="button" className="DangerButton w-100">
                            Delete Plan
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
                        Add Offer
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modal">
                      <div>
                        <form onSubmit={handleSubmit}>
                          <div>
                            <div className="costpermonth">
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Offer Cost"
                                  id={
                                    errors.cost && touched.cost
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder="Cost"
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
                              <p>Per</p>
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Duration(months)"
                                  id={
                                    errors.duration && touched.duration
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder="Duration"
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
                            <div className="mb-2 w-100">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="End Date to the Offer"
                                id={
                                  errors.description && touched.description
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="date"
                                  min="1997-01-01"
                                  max="2030-12-31"
                                  placeholder="dd/mm/yyyy"
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
                          <div className="flexcenterbetween gap-2">
                            <button
                              className="SecondaryButton w-100"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Add
                            </button>
                            <button
                              onClick={() => {
                                setModalShowAddOffer(false);
                              }}
                              className="DangerButton w-100"
                            >
                              Close
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
                        Edit Offer
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modal">
                      <div>
                        <form>
                          <div>
                            <div className="costpermonth">
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Offer Cost"
                                  id={
                                    errors.cost && touched.cost
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder="Cost"
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
                              <p>Per</p>
                              <div className="mb-2">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Duration(months)"
                                  id={
                                    errors.duration && touched.duration
                                      ? "floatingError"
                                      : "floatingInput"
                                  }
                                >
                                  <Form.Control
                                    type="number"
                                    placeholder="Duration"
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
                            <div className="mb-2 w-100">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="End Date to the Offer"
                                id={
                                  errors.description && touched.description
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="date"
                                  min="1997-01-01"
                                  max="2030-12-31"
                                  placeholder="dd/mm/yyyy"
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
                          <div className="flexcenterbetween gap-2">
                            <button
                              className="SecondaryButton w-100"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setModalShowEditOffer(false);
                              }}
                              className="DangerButton w-100"
                            >
                              Close
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
