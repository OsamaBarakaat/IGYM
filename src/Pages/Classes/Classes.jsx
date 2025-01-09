import React, { useEffect, useState } from "react";
import "./Classes.css";
import Heading from "../../components/Heading/Heading";
import defaultt from "../../assetss/default/5856.jpg";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import { privateAxiosInstance } from "../../api/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { classValidationSchema } from "../../Validations/ClassValidation";
import DaySelector from "../../components/DaySelector";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import History from "./History/History";
import HeadingNoBack from "../../components/HeadingNoBack/Heading";

const Classes = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState("Classes");
  const [modalShowAddClass, setModalShowAddClass] = useState(false);
  const [modalShowEditClass, setModalShowEditClass] = useState(false);
  const [inputs, setInputs] = useState([""]);
  const [selectedCoaches, setSelectedCoaches] = useState([]);
  const [coachesOptions, setCoachesOptions] = useState([]);

  const handleChangeOfPlans = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const removeInput = (index) => {
    const newInputsEdit = inputs.filter((_, i) => i !== index);
    setInputs(newInputsEdit);
  };
  const [inputsEdit, setInputsEdit] = useState(["fateure 1", "fateure 2"]);

  const handleChangeOfPlansEdit = (index, event) => {
    const newInputsEdit = [...inputsEdit];
    newInputsEdit[index] = event.target.value;
    setInputsEdit(newInputsEdit);
  };

  const addInputEdit = () => {
    setInputsEdit([...inputsEdit, ""]);
  };

  const removeInputEdit = (index) => {
    const newInputsEdit = inputsEdit.filter((_, i) => i !== index);
    setInputsEdit(newInputsEdit);
  };
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  const [plans, setPlans] = useState([]);

  function calculateEndTime(startTime, durationMinutes) {
    const [hours, minutes] = startTime.split(":").map(Number);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    date.setMinutes(date.getMinutes() + durationMinutes);

    const endHours = String(date.getHours()).padStart(2, "0");
    const endMinutes = String(date.getMinutes()).padStart(2, "0");

    return `${endHours}:${endMinutes}`;
  }

  /************ formik *************/
  // Add Class
  const addClass = useFormik({
    initialValues: {
      name: "",
      cost: "",
      capacity: "",
      duration: "",
      description: "",
      repeatType: "",
      repeatTime: "",
      repeatDay: "",
      plan: "",
    },
    validationSchema: classValidationSchema,
    onSubmit: async (values, actions) => {
      console.log("Form submitted:", values);
      console.log("selectedCoaches", selectedCoaches);
      console.log("inputs", inputs);
      if (selectedCoaches.length === 0) {
        toast.error(t("Please select at least one coach"));
        return;
      }

      // if (inputs[0] === "") {
      //   toast.error(t("Please add at least one feature"));
      //   return;
      // }

      try {
        await axiosPrivate.post(`/gyms/${gymId}/classes`, {
          name: values.name,
          cost: values.cost,
          capacity: values.capacity,
          duration: values.duration,
          description: values.description,
          repeat: {
            type: values.repeatType,
            time: values.repeatTime,
            day: values.repeatDay,
          },
          plan: values.plan ? values.plan : null,
          coaches: selectedCoaches.map((coach) => coach.value),
          features: inputs,
        });
        toast.success(t("Class added successfully"));
        fetchClasses();
        actions.resetForm();
        setSelectedCoaches([]);
        setInputs([""]);
        setModalShowAddClass(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  // Edit Class
  const editClass = useFormik({
    initialValues: {
      name: "",
      cost: "",
      capacity: "",
      duration: "",
      description: "",
      repeatType: "",
      repeatTime: "",
      repeatDay: "",
      plan: "",
    },
    validationSchema: classValidationSchema,
    onSubmit: async (values, actions) => {
      try {
        await axiosPrivate.patch(`/gyms/${gymId}/classes/${values.id}`, {
          name: values.name,
          cost: values.cost,
          capacity: values.capacity,
          duration: values.duration,
          description: values.description,
          repeat: {
            type: values.repeatType,
            time: values.repeatTime,
            day: values.repeatDay,
          },
          plan: values.plan ? values.plan : null,
          coaches: selectedCoaches.map((coach) => coach.value),
          features: inputs,
        });
        toast.success(t("Class edited successfully"));
        fetchClasses();
        actions.resetForm();
        setSelectedCoaches([]);
        setInputs([""]);
        setModalShowEditClass(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  // Delete Class
  const deleteClass = async () => {
    try {
      await axiosPrivate.delete(
        `/gyms/${gymId}/classes/${editClass.values.id}`
      );
      toast.success(t("Class deleted successfully"));
      setModalShowEditClass(false);
      fetchClasses();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [classes, setClasses] = useState([]);
  const { gymId } = useSelector((state) => state.user);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const { data } = await privateAxiosInstance.get(`/gyms/${gymId}/classes`);
      setClasses(data.data.documents);
      console.log("classes", data.data.documents);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoachesAndPlans = async () => {
    try {
      const [coachesResponse, plansResponse] = await Promise.all([
        privateAxiosInstance.get(`/gyms/${gymId}/coaches`),
        privateAxiosInstance.get(`/gyms/${gymId}/plans`),
      ]);

      const coaches = coachesResponse.data.data.documents;
      const CoachesOptions = coaches.map((coach) => ({
        label: coach.user.name,
        value: coach.user._id,
      }));
      setCoachesOptions(CoachesOptions);
      setPlans(plansResponse.data.data.documents);
      console.log("plans and coaches", coachesResponse);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCoachesAndPlans();
    fetchClasses();
  }, []);

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
        <HeadingNoBack content={"Classes"} />
      </div>
      <div className="flexcenterstart bigCardTwo p-2 gap-4">
        <div
          className={`cursor-pointer p-3 ${
            currentPage === "Classes"
              ? "main-color border-bottom-main-color"
              : ""
          }`}
          onClick={() => setCurrentPage("Classes")}
        >
          {t("Classes")}
        </div>
        <div
          className={`cursor-pointer p-3 ${
            currentPage === "History"
              ? "main-color border-bottom-main-color"
              : ""
          }`}
          onClick={() => setCurrentPage("History")}
        >
          {t("History")}
        </div>
      </div>
      {currentPage === "Classes" && (
        <>
          <div className="myInfoContent m-2">
            <div className="plansOfMyGym">
              <div
                className="plans-details add-plan min-vh-40"
                onClick={() => {
                  setModalShowAddClass(true);
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
                  <p className="main-color">{t("Add New Class")}</p>
                </div>
              </div>
              {classes.map((classItem, index) => {
                return (
                  <div key={index} className={"plans-details small-100"}>
                    <div className="flexcenterend">
                      <button
                        className="SecondaryButton"
                        onClick={() => {
                          editClass.setValues({
                            id: classItem._id,
                            name: classItem.name,
                            cost: classItem.cost,
                            capacity: classItem.capacity,
                            duration: classItem.duration,
                            description: classItem.description,
                            repeatType: classItem.repeat.type,
                            repeatTime: classItem.repeat.time,
                            repeatDay:
                              classItem.repeat.type === "one time"
                                ? classItem.repeat.day.split("T")[0]
                                : classItem.repeat.day,
                            plan: classItem.plan?._id,
                          });

                          const selectedCoaches = classItem.coaches?.map(
                            (coach) => ({
                              label: coach.name,
                              value: coach._id,
                            })
                          );
                          setSelectedCoaches(selectedCoaches);
                          setInputs(classItem.features);
                          setModalShowEditClass(true);
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
                    <div className="flexcenterbetween my-2">
                      <p className="fontMid">{classItem.name}</p>
                      <p>
                        <span className="fontMid">{classItem.cost}</span>
                        <span>{t("/class")}</span>
                      </p>
                    </div>
                    <p className="opacitySmall font-smaller d-flex justify-content-start align-items-center">
                      <span className="mx-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-clock"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>
                      </span>
                      <span>{classItem?.repeat?.day},</span>
                      <span>
                        {classItem?.repeat?.time} -{" "}
                        {calculateEndTime(
                          classItem?.repeat?.time,
                          classItem?.duration
                        )}
                      </span>
                    </p>
                    <div className="flexcenterstart gap-2">
                      <div className="repeat">{classItem?.repeat?.type}</div>
                      <div className="mins">{classItem?.duration} mins</div>
                      <div className="includedIn">{classItem?.plan?.name}</div>
                    </div>
                    <p className="opacitySmall font-smaller my-2">
                      {t("Coaches")}
                    </p>
                    <div className="flexcenterstart">
                      {classItem?.coaches?.map((coach, index) => {
                        return (
                          <div key={index} className="coach">
                            <div className="logo-extra-small flexcenterstart mx-1">
                              <img
                                src={defaultt}
                                className="rounded-circle"
                                alt=""
                              />
                            </div>
                            <p className="font-smaller m-0">{coach?.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    <p className="opacitySmall font-smaller my-2">
                      {t("About Class")}
                    </p>
                    <p className="font-smaller">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-chat-left-quote"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                          <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                        </svg>
                      </span>{" "}
                      {classItem?.description}
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-chat-right-quote"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                          <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                        </svg>
                      </span>
                    </p>
                    <p className="opacitySmall font-smaller my-2">
                      {t("Features Included")}
                    </p>
                    <div className="flexcenterstart flex-wrap">
                      {classItem?.features?.map((feature, index) => {
                        return (
                          <div
                            key={index}
                            className=" m-1 p-1 flexcenterstart "
                          >
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
                );
              })}
            </div>
          </div>
          <div className="modalAddClass">
            <Modal
              show={modalShowAddClass}
              onHide={() => setModalShowAddClass(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton id="modal">
                <Modal.Title id="contained-modal-title-vcenter">
                  {t("Add Class")}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body id="modal">
                <div>
                  <form onSubmit={addClass.handleSubmit}>
                    <div>
                      <div className="flexcenterbetween midCol gap-2 my-2">
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Class Name")}
                            id={
                              addClass.errors.name && addClass.touched.name
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Class Name")}
                              name="name"
                              value={addClass.values.name}
                              onChange={addClass.handleChange}
                              onBlur={addClass.handleBlur}
                            />
                          </FloatingLabel>
                          {addClass.errors.name && addClass.touched.name && (
                            <small className="error-message">
                              {addClass.errors.name}
                            </small>
                          )}
                        </div>
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Cost")}
                            id={
                              addClass.errors.cost && addClass.touched.cost
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Cost")}
                              name="cost"
                              value={addClass.values.cost}
                              onChange={addClass.handleChange}
                              onBlur={addClass.handleBlur}
                            />
                          </FloatingLabel>
                          {addClass.errors.cost && addClass.touched.cost && (
                            <small className="error-message">
                              {addClass.errors.cost}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="flexcenterbetween midCol gap-2 my-2">
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Capacity")}
                            id={
                              addClass.errors.capacity &&
                              addClass.touched.capacity
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Capacity")}
                              name="capacity"
                              value={addClass.values.capacity}
                              onChange={addClass.handleChange}
                              onBlur={addClass.handleBlur}
                            />
                          </FloatingLabel>
                          {addClass.errors.capacity &&
                            addClass.touched.capacity && (
                              <small className="error-message">
                                {addClass.errors.capacity}
                              </small>
                            )}
                        </div>
                        <div className="w-100">
                          <label
                            htmlFor="coaches"
                            className="flexcenterstart font-smaller"
                          >
                            {t("Coaches")}
                          </label>
                          <MultiSelect
                            id="coaches"
                            className={"multiSelect"}
                            options={coachesOptions}
                            value={selectedCoaches}
                            onChange={setSelectedCoaches}
                            labelledBy={t("Select Coaches")}
                          />
                        </div>
                      </div>
                      <div className="flexcenterbetween midCol gap-2 my-2">
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Duration (in mintus)")}
                            id={
                              addClass.errors.duration &&
                              addClass.touched.duration
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Duration (in mintus)")}
                              name="duration"
                              value={addClass.values.duration}
                              onChange={addClass.handleChange}
                              onBlur={addClass.handleBlur}
                            />
                          </FloatingLabel>
                          {addClass.errors.duration &&
                            addClass.touched.duration && (
                              <small className="error-message">
                                {addClass.errors.duration}
                              </small>
                            )}
                        </div>
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Included In")}
                            id={
                              addClass.errors.plan && addClass.touched.plan
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Select
                              name="plan"
                              value={addClass.values.plan}
                              onChange={addClass.handleChange}
                              onBlur={addClass.handleBlur}
                            >
                              <option value="" selected>
                                {t("Not Included")}
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
                          {addClass.errors.plan && addClass.touched.plan && (
                            <small className="error-message">
                              {addClass.errors.plan}
                            </small>
                          )}
                        </div>
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Repeat")}
                            id={
                              addClass.errors.repeatType &&
                              addClass.touched.repeatType
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Select
                              name="repeatType"
                              value={addClass.values.repeatType}
                              onChange={addClass.handleChange}
                              onBlur={addClass.handleBlur}
                            >
                              <option value="" disabled selected>
                                {t("select value")}
                              </option>
                              <option value="daily">{t("Daily")}</option>
                              <option value="weekly">{t("Weekly")}</option>
                              <option value="monthly">{t("Monthly")}</option>
                              <option value="one time">{t("One Time")}</option>
                            </Form.Select>
                          </FloatingLabel>
                          {addClass.errors.repeatType &&
                            addClass.touched.repeatType && (
                              <small className="error-message">
                                {addClass.errors.repeatType}
                              </small>
                            )}
                        </div>
                      </div>
                      {addClass.values.repeatType === "one time" && (
                        <div className="flexcenterbetween midCol gap-2 my-2">
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Date")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="date"
                                placeholder={t("Date")}
                                name="repeatDay"
                                value={addClass.values.repeatDay.split("T")[0]}
                                onChange={addClass.handleChange}
                                onBlur={addClass.handleBlur}
                              />
                            </FloatingLabel>
                            {addClass.errors.repeatDay &&
                              addClass.touched.repeatDay && (
                                <small className="error-message">
                                  {addClass.errors.repeatDay}
                                </small>
                              )}
                          </div>
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Time")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="time"
                                placeholder={t("From")}
                                name="repeatTime"
                                value={addClass.values.repeatTime}
                                onChange={addClass.handleChange}
                                onBlur={addClass.handleBlur}
                              />
                            </FloatingLabel>
                            {addClass.errors.repeatTime &&
                              addClass.touched.repeatTime && (
                                <small className="error-message">
                                  {addClass.errors.repeatTime}
                                </small>
                              )}
                          </div>
                        </div>
                      )}

                      {(addClass.values.repeatType === "weekly" ||
                        addClass.values.repeatType === "monthly") && (
                        <div className="flexcenterbetween midCol gap-2 my-2">
                          <DaySelector
                            repeatType={addClass.values.repeatType}
                            selectedDay={addClass.values.repeatDay}
                            onDayChange={addClass.handleChange}
                          />
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Time")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="time"
                                placeholder={t("From")}
                                name="repeatTime"
                                value={addClass.values.repeatTime}
                                onChange={addClass.handleChange}
                                onBlur={addClass.handleBlur}
                              />
                            </FloatingLabel>
                            {addClass.errors.repeatTime &&
                              addClass.touched.repeatTime && (
                                <small className="error-message">
                                  {addClass.errors.repeatTime}
                                </small>
                              )}
                          </div>
                        </div>
                      )}

                      {addClass.values.repeatType === "daily" && (
                        <div className="flexcenterbetween midCol gap-2 my-2">
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Time")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="time"
                                placeholder={t("From")}
                                name="repeatTime"
                                value={addClass.values.repeatTime}
                                onChange={addClass.handleChange}
                                onBlur={addClass.handleBlur}
                              />
                            </FloatingLabel>
                            {addClass.errors.repeatTime &&
                              addClass.touched.repeatTime && (
                                <small className="error-message">
                                  {addClass.errors.repeatTime}
                                </small>
                              )}
                          </div>
                        </div>
                      )}

                      <div className="mb-2 w-100">
                        <FloatingLabel
                          controlId="floatingInput"
                          label={t("Description")}
                          id={
                            addClass.errors.description &&
                            addClass.touched.description
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="text"
                            placeholder={t("Description")}
                            name="description"
                            value={addClass.values.description}
                            onChange={addClass.handleChange}
                            onBlur={addClass.handleBlur}
                          ></Form.Control>
                        </FloatingLabel>
                        {addClass.errors.description &&
                          addClass.touched.description && (
                            <small className="text-danger">
                              {addClass.errors.description}
                            </small>
                          )}
                      </div>
                      <div className="mb-2 w-100 includedFitures">
                        <p className="font-bold">Class Includes</p>
                        {inputs.map((input, index) => (
                          <Row key={index} className="mb-3 w-100">
                            <Col>
                              <FloatingLabel
                                className="w-100"
                                controlId="floatingInput"
                                label={t("Featurs")}
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
                                  onClick={() => removeInput(index)}
                                >
                                  -
                                </Button>
                              )}
                            </Col>
                            <Col xs="auto">
                              {index === inputs.length - 1 && input !== "" && (
                                <Button variant="primary" onClick={addInput}>
                                  +
                                </Button>
                              )}
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </div>
                    <div className="flexcenterbetween gap-2">
                      <button className="SecondaryButton w-100" type="submit">
                        {t("Add Class")}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setModalShowAddClass(false);
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

          <div className="modalEditClass">
            <Modal
              show={modalShowEditClass}
              onHide={() => {
                setModalShowEditClass(false);
                setSelectedCoaches([]);
                setInputs([""]);
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton id="modal">
                <Modal.Title id="contained-modal-title-vcenter">
                  {t("Edit Class")}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body id="modal">
                <div>
                  <form onSubmit={editClass.handleSubmit}>
                    <div>
                      <div className="flexcenterbetween midCol gap-2 my-2">
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Class Name")}
                            id={
                              editClass.errors.name && editClass.touched.name
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Class Name")}
                              name="name"
                              value={editClass.values.name}
                              onChange={editClass.handleChange}
                              onBlur={editClass.handleBlur}
                            />
                          </FloatingLabel>
                          {editClass.errors.name && editClass.touched.name && (
                            <small className="error-message">
                              {editClass.errors.name}
                            </small>
                          )}
                        </div>
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Cost")}
                            id={
                              editClass.errors.cost && editClass.touched.cost
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Cost")}
                              name="cost"
                              value={editClass.values.cost}
                              onChange={editClass.handleChange}
                              onBlur={editClass.handleBlur}
                            />
                          </FloatingLabel>
                          {editClass.errors.cost && editClass.touched.cost && (
                            <small className="error-message">
                              {editClass.errors.cost}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="flexcenterbetween midCol gap-2 my-2">
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Capacity")}
                            id={
                              editClass.errors.capacity &&
                              editClass.touched.capacity
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Capacity")}
                              name="capacity"
                              value={editClass.values.capacity}
                              onChange={editClass.handleChange}
                              onBlur={editClass.handleBlur}
                            />
                          </FloatingLabel>
                          {editClass.errors.capacity &&
                            editClass.touched.capacity && (
                              <small className="error-message">
                                {editClass.errors.capacity}
                              </small>
                            )}
                        </div>
                        <div className="w-100">
                          <label
                            htmlFor="coaches"
                            className="flexcenterstart font-smaller"
                          >
                            {t("Coaches")}
                          </label>
                          <MultiSelect
                            id="coaches"
                            className={"multiSelect"}
                            options={coachesOptions}
                            value={selectedCoaches}
                            onChange={setSelectedCoaches}
                            labelledBy={t("Select Coaches")}
                          />
                        </div>
                      </div>
                      <div className="flexcenterbetween midCol gap-2 my-2">
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Duration (in mintus)")}
                            id={
                              editClass.errors.duration &&
                              editClass.touched.duration
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder={t("Duration (in mintus)")}
                              name="duration"
                              value={editClass.values.duration}
                              onChange={editClass.handleChange}
                              onBlur={editClass.handleBlur}
                            />
                          </FloatingLabel>
                          {editClass.errors.duration &&
                            editClass.touched.duration && (
                              <small className="error-message">
                                {editClass.errors.duration}
                              </small>
                            )}
                        </div>
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Included In")}
                            id={
                              editClass.errors.plan && editClass.touched.plan
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Select
                              name="plan"
                              value={editClass.values.plan}
                              onChange={editClass.handleChange}
                              onBlur={editClass.handleBlur}
                            >
                              <option value="" selected>
                                {t("Not included")}
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
                          {editClass.errors.plan && editClass.touched.plan && (
                            <small className="error-message">
                              {editClass.errors.plan}
                            </small>
                          )}
                        </div>
                        <div className="w-100">
                          <FloatingLabel
                            controlId="floatingInput"
                            label={t("Repeat")}
                            id={
                              editClass.errors.repeatType &&
                              editClass.touched.repeatType
                                ? "floatingError"
                                : "floatingInput"
                            }
                          >
                            <Form.Select
                              name="repeatType"
                              value={editClass.values.repeatType}
                              onChange={editClass.handleChange}
                              onBlur={editClass.handleBlur}
                            >
                              <option value="" disabled selected>
                                {t("select value")}
                              </option>
                              <option value="daily">{t("Daily")}</option>
                              <option value="weekly">{t("Weekly")}</option>
                              <option value="monthly">{t("Monthly")}</option>
                              <option value="one time">{t("One Time")}</option>
                            </Form.Select>
                          </FloatingLabel>
                          {editClass.errors.repeatType &&
                            editClass.touched.repeatType && (
                              <small className="error-message">
                                {editClass.errors.repeatType}
                              </small>
                            )}
                        </div>
                      </div>
                      {editClass.values.repeatType === "one time" && (
                        <div className="flexcenterbetween midCol gap-2 my-2">
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Date")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="date"
                                placeholder={t("Date")}
                                name="repeatDay"
                                value={editClass.values.repeatDay.split("T")[0]}
                                onChange={editClass.handleChange}
                                onBlur={editClass.handleBlur}
                              />
                            </FloatingLabel>
                            {editClass.errors.repeatDay &&
                              editClass.touched.repeatDay && (
                                <small className="error-message">
                                  {editClass.errors.repeatDay}
                                </small>
                              )}
                          </div>
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Time")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="time"
                                placeholder={t("From")}
                                name="repeatTime"
                                value={editClass.values.repeatTime}
                                onChange={editClass.handleChange}
                                onBlur={editClass.handleBlur}
                              />
                            </FloatingLabel>
                            {editClass.errors.repeatTime &&
                              editClass.touched.repeatTime && (
                                <small className="error-message">
                                  {editClass.errors.repeatTime}
                                </small>
                              )}
                          </div>
                        </div>
                      )}

                      {(editClass.values.repeatType === "weekly" ||
                        editClass.values.repeatType === "monthly") && (
                        <div className="flexcenterbetween midCol gap-2 my-2">
                          <DaySelector
                            repeatType={editClass.values.repeatType}
                            selectedDay={editClass.values.repeatDay}
                            onDayChange={editClass.handleChange}
                          />
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Time")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="time"
                                placeholder={t("From")}
                                name="repeatTime"
                                value={editClass.values.repeatTime}
                                onChange={editClass.handleChange}
                                onBlur={editClass.handleBlur}
                              />
                            </FloatingLabel>
                            {editClass.errors.repeatTime &&
                              editClass.touched.repeatTime && (
                                <small className="error-message">
                                  {editClass.errors.repeatTime}
                                </small>
                              )}
                          </div>
                        </div>
                      )}

                      {editClass.values.repeatType === "daily" && (
                        <div className="flexcenterbetween midCol gap-2 my-2">
                          <div className="w-100">
                            <FloatingLabel
                              controlId="floatingInput"
                              label={t("Time")}
                              id={"floatingInput"}
                            >
                              <Form.Control
                                type="time"
                                placeholder={t("From")}
                                name="repeatTime"
                                value={editClass.values.repeatTime}
                                onChange={editClass.handleChange}
                                onBlur={editClass.handleBlur}
                              />
                            </FloatingLabel>
                            {editClass.errors.repeatTime &&
                              editClass.touched.repeatTime && (
                                <small className="error-message">
                                  {editClass.errors.repeatTime}
                                </small>
                              )}
                          </div>
                        </div>
                      )}

                      <div className="mb-2 w-100">
                        <FloatingLabel
                          controlId="floatingInput"
                          label={t("Description")}
                          id={
                            editClass.errors.description &&
                            editClass.touched.description
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="text"
                            placeholder={t("Description")}
                            name="description"
                            value={editClass.values.description}
                            onChange={editClass.handleChange}
                            onBlur={editClass.handleBlur}
                          ></Form.Control>
                        </FloatingLabel>
                        {editClass.errors.description &&
                          editClass.touched.description && (
                            <small className="text-danger">
                              {editClass.errors.description}
                            </small>
                          )}
                      </div>
                      <div className="mb-2 w-100 includedFitures">
                        <p className="font-bold">Class Includes</p>
                        {inputs.map((input, index) => (
                          <Row key={index} className="mb-3 w-100">
                            <Col>
                              <FloatingLabel
                                className="w-100"
                                controlId="floatingInput"
                                label={t("Featurs")}
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
                                  onClick={() => removeInput(index)}
                                >
                                  -
                                </Button>
                              )}
                            </Col>
                            <Col xs="auto">
                              {index === inputs.length - 1 && input !== "" && (
                                <Button variant="primary" onClick={addInput}>
                                  +
                                </Button>
                              )}
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </div>
                    <div className="flexcenterbetween gap-2">
                      <button className="SecondaryButton w-100" type="submit">
                        {t("Edit Class")}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteClass();
                        }}
                        className="DangerButton w-100"
                      >
                        {t("Delete")}
                      </button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </>
      )}
      {currentPage === "History" && <History />}
    </div>
  );
};

export default Classes;
