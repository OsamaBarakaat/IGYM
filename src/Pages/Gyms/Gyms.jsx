import React, { useState } from "react";
import airGym from "../../assetss/default/airGym.jpg";
import "./Gyms.css";
import { FloatingLabel, Form, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Gyms = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notify = () => toast.success("Invation sent successfully!");
  const navigate = useNavigate();
  return (
    <div className="gyms" style={{ minHeight: "100vh" }}>
      <div className="searchBar position-relative">
        <div>
          <input
            type="text"
            className="inputSearch w-100 p-4 border-0"
            placeholder="Search ..."
          />
        </div>
        <div className="buttonOnSearch">
          <button className="SecondaryButton" onClick={handleShow}>
            Add new
          </button>
        </div>
      </div>
      <div className="tableContainer">
        <table className="mainTableTwo">
          <thead>
            <tr>
              <th>Gyms(12)</th>
              <th>Owner</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Join date</th>
              <th>Trainees</th>
              <th>Latest payment</th>
              <th>Upcoming payemtns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Gym" className="tdOfImg">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/gyminfo");
                  }}
                >
                  Air Gym
                </span>
                <span>
                  <img
                    src={airGym}
                    alt="Gym "
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/gyminfo");
                    }}
                  />
                </span>
              </td>
              <td data-label="Owner">Otto</td>
              <td data-label="Plan">@mdo</td>
              <td data-label="Status">@mdo</td>
              <td data-label="Join date">Mark</td>
              <td data-label="Trainees">Otto</td>
              <td data-label="Latest payment">@mdo</td>
              <td data-label="Upcoming payment">100$</td>
            </tr>
            <tr>
              <td data-label="Gym" className="tdOfImg">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/gyminfo");
                  }}
                >
                  Air Gym
                </span>
                <span>
                  <img
                    src={airGym}
                    alt="Gym"
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/gyminfo");
                    }}
                  />
                </span>
              </td>
              <td data-label="Owner">Otto</td>
              <td data-label="Plan">@mdo</td>
              <td data-label="Status">@mdo</td>
              <td data-label="Join date">Mark</td>
              <td data-label="Trainees">Otto</td>
              <td data-label="Latest payment">@mdo</td>
              <td data-label="Upcoming payment">100$</td>
            </tr>
            <tr>
              <td data-label="Gym" className="tdOfImg">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/gyminfo");
                  }}
                >
                  Air Gym
                </span>
                <span>
                  <img
                    src={airGym}
                    alt="Gym"
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/gyminfo");
                    }}
                  />
                </span>
              </td>
              <td data-label="Owner">Otto</td>
              <td data-label="Plan">@mdo</td>
              <td data-label="Status">@mdo</td>
              <td data-label="Join date">Mark</td>
              <td data-label="Trainees">Otto</td>
              <td data-label="Latest payment">@mdo</td>
              <td data-label="Upcoming payment">100$</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          id="offCanvas"
        >
          <Offcanvas.Header>
            <div className="d-flex justify-content-between w-100 align-items-center mt-2">
              <Offcanvas.Title>
                <span className="offCanvasHeadTitle">Invite Gym owner</span>
              </Offcanvas.Title>
              <button
                className="btn-close bg-secondary"
                onClick={() => {
                  setShow(false);
                }}
              ></button>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  id="floatingInput"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="email" />
                </FloatingLabel>
              </div>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Select plan"
                  id="floatingInput"
                  className="mb-3"
                >
                  <Form.Select>
                    <option className="p-2">
                      <span className="p-2">plan platinum</span>
                    </option>
                    <option>plan gold</option>
                    <option>plan selver</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
              <div className="my-2">
                <button
                  className="SecondaryButton w-100"
                  onClick={() => {
                    notify();
                  }}
                >
                  Invite
                </button>
                <br />
                <button className="PrimaryButtonTwo w-100 transition">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-link-45deg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                    </svg>
                  </span>
                  <span>Copy link</span>
                </button>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Gyms;
