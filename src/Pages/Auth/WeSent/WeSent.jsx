import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Sotre/Action/User.action";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

import "./WeSent.css";
import "../Signin/Signin.css";
import { useNavigate } from "react-router-dom";

const WeSent = () => {
  const navigate = useNavigate();
  const [currentStyle, setCurrentStyle] = useState("send-email");
  const showWeSent = () => setCurrentStyle("we-sent");
  const dispatch = useDispatch();
  return (
    <div className="signin">
      <div className="main-cont-signin">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </div>

        <div className="signin-header">
          <p>
            We've sent an email to <strong>Osama@gmail.com </strong> with a link
            to reset your password.
          </p>
        </div>

        <div className="my-3 ">
          {/* <button className="SecondaryButton w-100">Resend Email</button> */}
          {/* <button className="PrimaryButton w-100">sign in</button> */}
        </div>
      </div>
    </div>
  );
};

export default WeSent;
