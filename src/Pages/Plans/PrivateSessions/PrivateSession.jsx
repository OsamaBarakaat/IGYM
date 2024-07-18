import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import axiosInstance from "../../../api/axios";
import { useSelector } from "react-redux";

const PrivateSession = () => {
  const [modalShowAddPS, setModalShowAddPS] = useState(false);
  const [modalShowEditPS, setModalShowEditPS] = useState(false);
  const [modalShowAddOfferPS, setModalShowAddOfferPS] = useState(false);
  const [modalShowEditOfferPS, setModalShowEditOfferPS] = useState(false);
  const handleClosePS = () => setModalShowAddPS(false);
  const [privateSessions, setPrivateSessions] = useState([]);

  const {gymId} = useSelector((state) => state.user);


  function getExpirationDate(document) {
    const { createdAt, expireIn, expireType } = document;

    const creationDate = new Date(createdAt);
    let expirationDate;

    switch (expireType) {
      case "days":
        expirationDate = new Date(creationDate);
        expirationDate.setDate(creationDate.getDate() + expireIn);
        break;
      case "weeks":
        expirationDate = new Date(creationDate);
        expirationDate.setDate(creationDate.getDate() + expireIn * 7);
        break;
      case "months":
        expirationDate = new Date(creationDate);
        expirationDate.setMonth(creationDate.getMonth() + expireIn);
        break;
      case "years":
        expirationDate = new Date(creationDate);
        expirationDate.setFullYear(creationDate.getFullYear() + expireIn);
        break;
      default:
        throw new Error(`Unknown expireType: ${expireType}`);
    }

    return expirationDate.toLocaleDateString();
  }

  useEffect(() => {
    const fetchPrivateSessions = async () => {
      try {
        const response = await axiosInstance.get(
          `/gyms/${gymId}/private-sessions/`
        );
        setPrivateSessions(response.data.data.documents);        
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrivateSessions();
  }, []);

  return (
    <div className="mainContent m-2 min-vh-100">
      <div className="plansOfMyGym">
        {privateSessions.map((session) => {
          return (
            <div className="plans-details">
              {session?.isOffer && <div className="offerDesign">Offer</div>}
              <div className="flexcenterend gap-2">
                {session.isOffer ? (
                  <button
                    className="SecondaryButton"
                    onClick={() => setModalShowEditOfferPS(true)}
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
                    <span>Edit Offer</span>
                  </button>
                ) : (
                  <button
                    className="SecondaryButton"
                    onClick={() => {
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
                    <span>Add Offer</span>
                  </button>
                )}
                <button
                  className="PrimaryButton"
                  onClick={() => setModalShowEditPS(true)}
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
              <div className="privateSessionBody my-3">
                <div className="flexcenterbetween">
                  <p className="fontLarge">
                    {session.sessions} Sessions package
                  </p>
                  {session.isOffer ? (
                    <p>
                      <span className="fontMid">
                        {session.cost} <span>EGP</span>
                      </span>{" "}
                      / {session.sessions} sessions
                    </p>
                  ) : (
                    <p>
                      <span className="fontMid">
                        {session.cost} <span>EGP</span>{" "}
                      </span>
                      / {session.sessions} sessions
                    </p>
                  )}
                </div>
                <div className="flexcenterstart">
                  <p className="font-smaller opacitySmall">
                    Expires in {getExpirationDate(session)}
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
            <p className="main-color">Add Private Session</p>
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
              Add Private Session
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Cost"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Cost"
                          name="cost"
                        />
                      </FloatingLabel>
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Sessions Number"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          placeholder="Sessions Number"
                          name="sessions"
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                  </div>
                  <p className="opacitySmall font-small"> Expires In</p>
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
                  </div>
                </div>

                <div className="flexcenterbetween  gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    Add Private Session
                  </button>
                  <button
                    onClick={() => {
                      setModalShowAddPS(false);
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
              Edit Private Session
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Cost"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Cost"
                          name="cost"
                        />
                      </FloatingLabel>
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Sessions Number"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          placeholder="Sessions Number"
                          name="sessions"
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                  </div>
                  <p className="opacitySmall font-small"> Expires In</p>
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
                  </div>
                </div>

                <div className="flexcenterbetween  gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    Edit Private Session
                  </button>
                  <button className="DangerButton w-100">
                    Delete Private Session
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
              Edit Offer on private session
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Offer Price"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Offer Price"
                          name="offerPrice"
                        />
                      </FloatingLabel>
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Sessions Number"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Sessions Number"
                          name="sessions"
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                  </div>
                  <p className="opacitySmall font-small"> Expires In</p>
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
                  </div>
                </div>

                <div className="flexcenterbetween gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    Edit Offer
                  </button>
                  <button
                    onClick={() => {
                      setModalShowEditOfferPS(false);
                    }}
                    className="DangerButton w-100"
                  >
                    Delete Offer
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
              Add Offer on private session
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal">
            <div>
              <form>
                <div>
                  <div className="flexcenterbetween gap-2">
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Offer Price"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Offer Price"
                          name="offerPrice"
                        />
                      </FloatingLabel>
                    </div>

                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        min={0}
                        label="Sessions Number"
                        id={"floatingInput"}
                      >
                        <Form.Control
                          type="number"
                          placeholder="Sessions Number"
                          name="sessions"
                        ></Form.Control>
                      </FloatingLabel>
                    </div>
                  </div>
                  <p className="opacitySmall font-small"> Expires In</p>
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
                  </div>
                </div>

                <div className="flexcenterbetween gap-2">
                  <button className="SecondaryButton w-100" type="submit">
                    Add Offer
                  </button>
                  <button
                    onClick={() => {
                      setModalShowAddOfferPS(false);
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

export default PrivateSession;
