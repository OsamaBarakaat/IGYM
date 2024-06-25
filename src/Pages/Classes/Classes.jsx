import React, { useState } from "react";
import "./Classes.css";
import Heading from "../../components/Heading/Heading";
import defaultt from "../../assetss/default/5856.jpg";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

const Classes = () => {
  const [currentPage, setCurrentPage] = useState("Classes");
  const [modalShowAddClass, setModalShowAddClass] = useState(false);
  const [modalShowEditClass, setModalShowEditClass] = useState(false);
  const [inputs, setInputs] = useState([""]);
  const [selectedCoaches, setSelectedCoaches] = useState([]);
  const coachesOptions = [
    { label: "Mohamed ali", value: "Mohamed ali" },
    { label: "Mike tyson", value: "Mike tyson" },
    { label: "Habib nourmagamedov", value: "Habib nourmagamedov" },
  ];

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
  const Plans = [
    {
      name: "Starter",
      value: "starter",
    },
    {
      name: "Advanced",
      value: "advanced",
    },
    {
      name: "Expert",
      value: "expert",
    },
    {
      name: "Master",
      value: "master",
    },
  ];
  const Classes = [
    {
      className: "Class 1",
      cost: "EGP100",
      mins: "60 mins",
      includedIn: "starter",
      repeat: "Weekly",
      capacity: "30",
      date: "2021-09-01",
      from: "10:00 AM",
      to: "11:00 AM",
      coaches: [
        { name: "Coach 1", img: { defaultt } },
        { name: "Coach 2", img: { defaultt } },
      ],
      description:
        "Class 1 description lorem ipsum dolor sit amet. lorem ipsum dolor sit amet ",
      includedFeaturs: ["Feature 1", "Feature 2"],
    },
    {
      className: "Class 2",
      cost: "EGP200",
      mins: "90 mins",
      includedIn: "starter",
      repeat: "Weekly",
      capacity: "30",
      date: "2021-09-01",
      from: "11:00 AM",
      to: "12:30 PM",
      coaches: [
        { name: "Coach 1", img: { defaultt } },
        { name: "Coach 2", img: { defaultt } },
      ],
      description:
        "Class 2 description lorem ipsum dolor sit amet. lorem ipsum dolor sit amet lorem ipsum dolor sit amet. lorem ipsum dolor sit amet lorem ",
      includedFeaturs: ["Feature 1", "Feature 2"],
    },
    {
      className: "Class 3",
      cost: "EGP300",
      mins: "120 mins",
      includedIn: "starter",
      repeat: "Weekly",
      capacity: "30",
      date: "2021-09-01",
      from: "12:30 PM",
      to: "02:30 PM",
      coaches: [
        { name: "Coach 1", img: { defaultt } },
        { name: "Coach 2", img: { defaultt } },
      ],
      description:
        "Class 3 description lorem ipsum dolor sit amet. lorem ipsum dolor sit amet ",
      includedFeaturs: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
        "Feature 6",
      ],
    },
  ];
  return (
    <div className="myInfo">
      <div className="myInfoHeading">
        <Heading content={"Classes"} />
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
          Classes
        </div>
        <div
          className={`cursor-pointer p-3 ${
            currentPage === "History"
              ? "main-color border-bottom-main-color"
              : ""
          }`}
          onClick={() => setCurrentPage("History")}
        >
          History
        </div>
      </div>
      <div className="myInfoContent m-2">
        <div className="plansOfMyGym">
          {Classes.map((classItem, index) => {
            return (
              <div key={index} className={"plans-details small-100"}>
                <div className="flexcenterend">
                  <button
                    className="SecondaryButton"
                    onClick={() => {
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
                    <span>Edit</span>
                  </button>
                </div>
                <div className="flexcenterbetween my-2">
                  <p className="fontMid">{classItem.className}</p>
                  <p>
                    <span className="fontMid">{classItem.cost}</span>
                    <span>/class</span>
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
                  <span>{classItem?.date},</span>
                  <span>
                    {classItem?.from} - {classItem?.to}
                  </span>
                </p>
                <div className="flexcenterstart gap-2">
                  <div className="repeat">{classItem?.repeat}</div>
                  <div className="mins">{classItem?.mins}</div>
                  <div className="includedIn">{classItem?.includedIn}</div>
                </div>
                <p className="opacitySmall font-smaller my-2">Coaches</p>
                <div className="flexcenterstart">
                  {classItem?.coaches.map((coach, index) => {
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
                <p className="opacitySmall font-smaller my-2">About Class</p>
                <p className="font-smaller">
                  {" "}
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
                <p className="opacitySmall font-smaller my-2">Class Included</p>
                <div className="flexcenterstart flex-wrap">
                  {classItem?.includedFeaturs.map((feature, index) => {
                    return (
                      <div key={index} className=" m-1 p-1 flexcenterstart ">
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
              <p className="main-color">Add New Class</p>
            </div>
          </div>
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
              Add Class
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form>
                <div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Class Name"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Class Name"
                          name="className"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Cost"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Cost"
                          name="classCost"
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Capacity"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Capacity"
                          name="classCapacity"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <label
                        htmlFor="coaches"
                        className="flexcenterstart font-smaller"
                      >
                        Coaches
                      </label>
                      <MultiSelect
                        id="coaches"
                        className={"multiSelect"}
                        options={coachesOptions}
                        value={selectedCoaches}
                        onChange={setSelectedCoaches}
                        labelledBy="Select Coaches"
                      />
                    </div>
                  </div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Duration (in mintus)"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Duration"
                          name="classDuration"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Included In"
                        id={"floatingInput"}
                      >
                        <Form.Select name="includedIn">
                          <option value="" disabled selected>
                            Not included
                          </option>
                          {Plans.map((plan, index) => {
                            return (
                              <option key={index} value={plan.value}>
                                {plan.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Repeat"
                        id={"floatingInput"}
                      >
                        <Form.Select name="repeat">
                          <option value="" disabled selected>
                            select value
                          </option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="onTime">One Time</option>
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                  </div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Date"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="date"
                          placeholder="Date"
                          name="date"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="From"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="time"
                          placeholder="From"
                          name="from"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="To"
                        id={"floatingInput"}
                      >
                        <Form.Control type="time" placeholder="To" name="to" />
                      </FloatingLabel>
                    </div>
                  </div>

                  <div className="mb-2 w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      id={"floatingInput"}
                    >
                      <Form.Control
                        type="text"
                        placeholder="description"
                        name="description"
                      ></Form.Control>
                    </FloatingLabel>
                  </div>
                  <div className="mb-2 w-100 includedFitures">
                    <p className="font-bold">Class Includes</p>
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
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setModalShowAddClass(false);
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

      <div className="modalEditClass">
        <Modal
          show={modalShowEditClass}
          onHide={() => setModalShowEditClass(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton id="modal">
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Class
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form>
                <div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Class Name"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Class Name"
                          name="className"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Cost"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Cost"
                          name="classCost"
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Capacity"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Capacity"
                          name="classCapacity"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <label
                        htmlFor="coaches"
                        className="flexcenterstart font-smaller"
                      >
                        Coaches
                      </label>
                      <MultiSelect
                        id="coaches"
                        className={"multiSelect"}
                        options={coachesOptions}
                        value={selectedCoaches}
                        onChange={setSelectedCoaches}
                        labelledBy="Select Coaches"
                      />
                    </div>
                  </div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Duration (in mintus)"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Duration"
                          name="classDuration"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Included In"
                        id={"floatingInput"}
                      >
                        <Form.Select name="includedIn">
                          <option value="" disabled selected>
                            Not included
                          </option>
                          {Plans.map((plan, index) => {
                            return (
                              <option key={index} value={plan.value}>
                                {plan.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Repeat"
                        id={"floatingInput"}
                      >
                        <Form.Select name="repeat">
                          <option value="" disabled selected>
                            select value
                          </option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="onTime">One Time</option>
                        </Form.Select>
                      </FloatingLabel>
                    </div>
                  </div>
                  <div className="flexcenterbetween midCol gap-2 my-2">
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Date"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="date"
                          placeholder="Date"
                          name="date"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="From"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="time"
                          placeholder="From"
                          name="from"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="To"
                        id={"floatingInput"}
                      >
                        <Form.Control type="time" placeholder="To" name="to" />
                      </FloatingLabel>
                    </div>
                  </div>

                  <div className="mb-2 w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Description"
                      id={"floatingInput"}
                    >
                      <Form.Control
                        type="text"
                        placeholder="description"
                        name="description"
                      ></Form.Control>
                    </FloatingLabel>
                  </div>
                  <div className="mb-2 w-100 includedFitures">
                    <p className="font-bold">Class Includes</p>
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
                    Edit class
                  </button>
                  <button
                    onClick={() => {
                      setModalShowEditClass(false);
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
  );
};

export default Classes;
