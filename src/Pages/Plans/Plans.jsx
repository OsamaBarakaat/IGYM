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
    try {
      const { data } = await axiosPrivate.post("/owner-plans/", {
        name: values.name,
        maxTrainees: values.maxTrainees,
        cost: values.cost,
        branches: values.branches,
        duration: values.duration,
        description: values.description,
      });
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
      maxTrainees: "",
      cost: "",
      branches: "",
      duration: "",
      description: "",
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

  const handlePrintValues = () => {
    console.log(inputs);
  };

  // get plans
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      const res = await axiosPrivate.get("/owner-plans");
      setPlans(res?.data?.data?.documents);
      console.log("plans", res?.data?.data?.documents);
      setLoading(false);
    };
    fetchPlans();
  }, []);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Update editPlan form when selectedPlan changes
  useEffect(() => {
    if (selectedPlan) {
      editPlan.setValues({
        name: selectedPlan.name || "",
        maxTrainees: selectedPlan.maxTrainees || "",
        cost: selectedPlan.cost || "",
        branches: selectedPlan.branches || "",
        duration: selectedPlan.duration || "",
        description: selectedPlan.description || "",
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
      maxTrainees: "",
      cost: "",
      branches: "",
      duration: "",
      description: "",
    },
    validationSchema: planValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        const { data } = await axiosPrivate.put(
          `/owner-plans/${selectedPlan?._id}`,
          {
            name: values.name,
            maxTrainees: values.maxTrainees,
            cost: values.cost,
            branches: values.branches,
            duration: values.duration,
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
      const res = await axiosPrivate.delete(`/owner-plans/${id}`);
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
                {plansArray.map((plan) => {
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
                            /{plan?.per}
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
                      <form onSubmit={editPlan.handleSubmit}>
                        <div>
                          <div className="mb-2">
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Plan Name"
                              id={
                                editPlan.errors.name && editPlan.touched.name
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder="Plan Name"
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
                          <div className="RowMid">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Branches"
                                id={
                                  editPlan.errors.branches &&
                                  editPlan.touched.branches
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                                className=" w-100"
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Branches"
                                  name="branches"
                                  value={editPlan.values.branches}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                />
                              </FloatingLabel>
                              {editPlan.errors.branches &&
                                editPlan.touched.branches && (
                                  <small className="error-message">
                                    {editPlan.errors.branches}
                                  </small>
                                )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Max Trainees"
                                id={
                                  editPlan.errors.maxTrainees &&
                                  editPlan.touched.maxTrainees
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Max Trainees"
                                  name="maxTrainees"
                                  value={editPlan.values.maxTrainees}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                />
                              </FloatingLabel>
                              {editPlan.errors.maxTrainees &&
                                editPlan.touched.maxTrainees && (
                                  <small className="error-message">
                                    {editPlan.errors.maxTrainees}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Cost"
                                id={
                                  editPlan.errors.cost && editPlan.touched.cost
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Cost"
                                  name="cost"
                                  value={editPlan.values.cost}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                ></Form.Control>
                              </FloatingLabel>
                              {editPlan.errors.cost &&
                                editPlan.touched.cost && (
                                  <small className="error-message">
                                    {editPlan.errors.cost}
                                  </small>
                                )}
                            </div>
                            <p>Per</p>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Duration"
                                id={
                                  editPlan.errors.duration &&
                                  editPlan.touched.duration
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Duration"
                                  value={editPlan.values.duration}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                  name="duration"
                                ></Form.Control>
                              </FloatingLabel>
                              {editPlan.errors.duration &&
                                editPlan.touched.duration && (
                                  <small className="error-message">
                                    {editPlan.errors.duration}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="mb-2 w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Description"
                              id={
                                editPlan.errors.description &&
                                editPlan.touched.description
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder="description"
                                name="description"
                                value={editPlan.values.description}
                                onChange={editPlan.handleChange}
                                onBlur={editPlan.handleBlur}
                              ></Form.Control>
                            </FloatingLabel>
                            {editPlan.errors.description &&
                              editPlan.touched.description && (
                                <small className="error-message">
                                  {editPlan.errors.description}
                                </small>
                              )}
                          </div>
                        </div>
                        <div className="flexcenteraround">
                          <button
                            className="SecondaryButton"
                            type="submit"
                            disabled={editPlan.isSubmitting}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setModalShowEditPlan(false);
                            }}
                            className="DangerButton"
                          >
                            Close
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
                      <form onSubmit={editPlan.handleSubmit}>
                        <div>
                          <div className="mb-2">
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Plan Name"
                              id={
                                editPlan.errors.name && editPlan.touched.name
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder="Plan Name"
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
                          <div className="RowMid">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Branches"
                                id={
                                  editPlan.errors.branches &&
                                  editPlan.touched.branches
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                                className=" w-100"
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Branches"
                                  name="branches"
                                  value={editPlan.values.branches}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                />
                              </FloatingLabel>
                              {editPlan.errors.branches &&
                                editPlan.touched.branches && (
                                  <small className="error-message">
                                    {editPlan.errors.branches}
                                  </small>
                                )}
                            </div>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Max Trainees"
                                id={
                                  editPlan.errors.maxTrainees &&
                                  editPlan.touched.maxTrainees
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Max Trainees"
                                  name="maxTrainees"
                                  value={editPlan.values.maxTrainees}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                />
                              </FloatingLabel>
                              {editPlan.errors.maxTrainees &&
                                editPlan.touched.maxTrainees && (
                                  <small className="error-message">
                                    {editPlan.errors.maxTrainees}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="costpermonth">
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Cost"
                                id={
                                  editPlan.errors.cost && editPlan.touched.cost
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Cost"
                                  name="cost"
                                  value={editPlan.values.cost}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                ></Form.Control>
                              </FloatingLabel>
                              {editPlan.errors.cost &&
                                editPlan.touched.cost && (
                                  <small className="error-message">
                                    {editPlan.errors.cost}
                                  </small>
                                )}
                            </div>
                            <p>Per</p>
                            <div className="mb-2">
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Duration"
                                id={
                                  editPlan.errors.duration &&
                                  editPlan.touched.duration
                                    ? "floatingError"
                                    : "floatingInput"
                                }
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="Duration"
                                  value={editPlan.values.duration}
                                  onChange={editPlan.handleChange}
                                  onBlur={editPlan.handleBlur}
                                  name="duration"
                                ></Form.Control>
                              </FloatingLabel>
                              {editPlan.errors.duration &&
                                editPlan.touched.duration && (
                                  <small className="error-message">
                                    {editPlan.errors.duration}
                                  </small>
                                )}
                            </div>
                          </div>
                          <div className="mb-2 w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Description"
                              id={
                                editPlan.errors.description &&
                                editPlan.touched.description
                                  ? "floatingError"
                                  : "floatingInput"
                              }
                            >
                              <Form.Control
                                type="text"
                                placeholder="description"
                                name="description"
                                value={editPlan.values.description}
                                onChange={editPlan.handleChange}
                                onBlur={editPlan.handleBlur}
                              ></Form.Control>
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
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setModalShowEditPlan(false);
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
