import React, { useState } from "react";
import "./Coaches.css";
import Heading from "../../components/Heading/Heading";
import avatar from "../../assetss/default/5856.jpg";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const Coaches = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShow(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const coachesLocal = [
    {
      name: "John Doe",
      number: "+201100435756",
      shift: "7 Pm - 2 Am",
      Attendance: "Attend",
      isActive: true,
    },
    {
      name: "Jane Doe",
      number: "+201100435756",
      shift: "7 Pm - 2 Am",
      Attendance: "Attend",
      isActive: true,
    },
    {
      name: "Anna Doe",
      number: "+201100435756",
      shift: "7 Pm - 2 Am",
      Attendance: "Attend",
      isActive: false,
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
                  <th>Coach name(12)</th>
                  <th>Number</th>
                  <th>Shift</th>
                  <th>Attendance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coachesLocal.map((coach) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          <div className="profilePic">
                            <img
                              src={coach?.image || avatar}
                              alt="profilePic"
                              className="widthSmall cursor-pointer"
                              onClick={() => {
                                navigate("/coachprofile");
                              }}
                            />
                          </div>
                          <div className="profileName mx-3">
                            {coach?.isActive === false && (
                              <span className="text-danger">Pending ...</span>
                            )}
                            {coach?.isActive === true && !coach?.name && (
                              <span className="text-danger">no name</span>
                            )}
                            {coach?.isActive === true && coach?.name && (
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  navigate("/coachprofile");
                                }}
                              >
                                {coach?.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td data-label="Phone">{coach?.number}</td>
                      <td data-label="Shift">{coach?.shift}</td>
                      <td data-label="Attendance"> {coach?.Attendance}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="PrimaryButton"
                            onClick={() => handleShowEdit()}
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
      <div className="modalAddCoach">
        <Modal show={show} onHide={handleClose}>
          {sendInvite && (
            <div>
              <Modal.Header className="modala">
                <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                  <Modal.Title className="modala">
                    <span className="modalHeadTitle">Invite Coach</span>
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
      </div>
      <div className="modalEditCoach">
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <div>
            <Modal.Header className="modala">
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Modal.Title className="modala">
                  <span className="modalHeadTitle">Edit Coach</span>
                </Modal.Title>
                <button
                  className="btn-close bg-secondary"
                  onClick={() => {
                    setShowEdit(false);
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
                  <div className="my-2 flexcenterbetween gap-2">
                    <button className="SecondaryButton w-100" type="submit">
                      Edit
                    </button>
                    <button className="DangerButton w-100">Delete Coach</button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Coaches;
