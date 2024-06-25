import React, { useState } from "react";
import "./Trainees.css";
import Heading from "../../components/Heading/Heading";
import avatar from "../../assetss/default/5856.jpg";
import { convertToCreatedAtFormat } from "../../createdAt";
import { FloatingLabel, Form, Modal, Offcanvas } from "react-bootstrap";
import OtpInput from "react-otp-input";

const Trainees = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showSingleMessage, setShowSignleMessage] = useState(false);
  const handleCloseSingleMessage = () => setShowSignleMessage(false);
  const [showEditTrainee, setShowEditTrainee] = useState(false);
  const handleCloseEditTrainee = () => setShowEditTrainee(false);
  const [otp, setOtp] = useState("");

  const traineesLocal = [
    {
      name: "John Doe",
      number: "+201100435756",
      gender: "Male",
      plan: "Starter",
      isActive: true,
      joinDate: "2021-09-01",
      expireDate: "2022-09-01",
    },
    {
      name: "Jane Doe",
      number: "+201100435756",
      gender: "male",
      plan: "Starter",
      isActive: false,
      joinDate: "2021-09-01",
      expireDate: "2022-09-01",
    },
    {
      name: "Anna Doe",
      number: "+201100435756",
      gender: "Female",
      plan: "Starter",
      isActive: true,
      joinDate: "2021-09-01",
      expireDate: "2022-09-01",
    },
  ];
  const [sendInvite, setSendInvite] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  return (
    <div className="myInfo">
      <div className="myInfoHeading">
        <Heading content={"Staff members"} />
      </div>
      <div className="myInfoContent">
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
                <span>Invite new</span>
              </button>
              <input
                type="search"
                className="w-50 p-2 rounded-3 searchInput"
                placeholder="Search ..."
              />
            </div>
            <table className="mainTableTwo">
              <thead>
                <tr>
                  <th>Member name(12)</th>
                  <th>Number</th>
                  <th>Gender</th>
                  <th>Plan</th>
                  <th>Join date</th>
                  <th>Expire date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {traineesLocal.map((admin) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          <div className="profilePic">
                            <img
                              src={admin?.image || avatar}
                              alt="profilePic"
                              className="widthSmall"
                            />
                          </div>
                          <div className="profileName mx-3">
                            {admin?.isActive === false && (
                              <span className="text-danger">Pending ...</span>
                            )}
                            {admin?.isActive === true && !admin?.name && (
                              <span className="text-danger">no name</span>
                            )}
                            {admin?.isActive === true && admin?.name && (
                              <span className="">{admin?.name}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td data-label="Phone">{admin?.number}</td>
                      <td data-label="Gender">{admin?.gender}</td>
                      <td data-label="Plan"> {admin?.plan}</td>
                      <td data-label="Join Date">
                        {convertToCreatedAtFormat(admin?.joinDate)}
                      </td>
                      <td data-label="Expire Date">
                        {convertToCreatedAtFormat(admin?.expireDate)}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center flex-column">
                          <button
                            className="SecondaryButton my-1"
                            onClick={() => setShowEditTrainee(true)}
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
                          <button
                            className="PrimaryButton"
                            onClick={() => setShowSignleMessage(true)}
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
                            <span>Send Message</span>
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
                  className={`PrimaryButtonTwo cursor-not-allowed `}
                  // onClick={() => {
                  //   setPage(page - 1);
                  // }}
                  disabled={true}
                >
                  Previous
                </button>
                {/* <div className="pages">
                  {pageArr.map((page) => {
                    return (
                      <span
                        className="mx-3 pag-item"
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        {page + 1}
                      </span>
                    );
                  })}
                </div> */}
                <button
                  className={`PrimaryButtonTwo cursor-not-allowed`}
                  // onClick={() => {
                  //   setPage(page + 1);
                  // }}
                  disabled={true}
                >
                  Next
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
                    <span className="offCanvasHeadTitle">Invite member</span>
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
                        label="Name"
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          name="name"
                        />
                      </FloatingLabel>
                      {/* {sendInvite.errors.email && sendInvite.touched.email && (
                    <small className="error-message">
                      {sendInvite.errors.email}
                    </small>
                  )} */}
                    </div>
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Phone number"
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="number"
                          name="number"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="mb-3">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Select plan"
                        id={"floatingInput"}
                      >
                        <Form.Select name="plan">
                          <option value="" disabled>
                            Select Plan
                          </option>
                          <option value={"starter"}>Starter</option>
                          <option value={"advanced"}>Advanced</option>
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
                        onClick={() => {
                          setShowVerify(true);
                          setSendInvite(false);
                        }}
                      >
                        Verify
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
                    <span className="offCanvasHeadTitle">Set OTP</span>
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
                        Confirm
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
            show={showEditTrainee}
            onHide={handleCloseEditTrainee}
            placement="end"
            id="offCanvas"
          >
            <Offcanvas.Header>
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Offcanvas.Title>
                  <span className="offCanvasHeadTitle">
                    Edit Trainee details
                  </span>
                </Offcanvas.Title>
                <button
                  className="btn-close bg-secondary"
                  onClick={() => {
                    setShowEditTrainee(false);
                  }}
                ></button>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <form>
                <div>
                  <div>
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
                  </div>
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Select plan"
                      id={"floatingInput"}
                    >
                      <Form.Select name="plan">
                        <option value="" disabled>
                          Select Plan
                        </option>
                        <option value={"starter"}>Starter</option>
                        <option value={"advanced"}>Advanced</option>
                      </Form.Select>
                    </FloatingLabel>
                  </div>
                  <div>
                    <button
                      className="SecondaryButton w-100"
                      onClick={() => {
                        setShowEditTrainee(false);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="sendSingleMessage">
          <Modal show={showSingleMessage} onHide={handleCloseSingleMessage}>
            <div>
              <Modal.Header className="modala">
                <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                  <Modal.Title className="modala">
                    <span className="offCanvasHeadTitle">
                      Send Single Message
                    </span>
                  </Modal.Title>
                  <button
                    className="btn-close bg-secondary"
                    onClick={() => {
                      setShowSignleMessage(false);
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
                        label="Name"
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          name="name"
                        />
                      </FloatingLabel>
                    </div>
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Message"
                        id={"floatingInput"}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          min={0}
                          placeholder="type your message here ..."
                          name="message"
                        />
                      </FloatingLabel>
                    </div>

                    <div className="my-2">
                      <button
                        className="SecondaryButton w-100"
                        type="submit"
                        onClick={() => {
                          setShowSignleMessage(false);
                        }}
                      >
                        Send Message
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
