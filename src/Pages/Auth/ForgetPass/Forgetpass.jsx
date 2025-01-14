import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Sotre/Action/User.action";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

import "./Forgetpass.css";
import "../Signin/Signin.css";
import { useNavigate } from "react-router-dom";
import { forgetpassValidationSchema } from "../../../Validations/ForgetpassValidation";
import { useFormik } from "formik";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Forgetpass = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log("user signed in : ", values);
    actions.setSubmitting(true);
    try {
      const res = await axiosInstance.post("/owners/forget-password", {
        email: values.email,
        clientUrl: "https://igym.vercel.app/resetpassword/",
      });
      console.log(res);
      toast.success(t("Email sent successfully"));
      if (res.status === 200) {
        navigate("/wesent");
      }
    } catch (error) {
      console.log(error);
      if (error.message === "timeout of 10000ms exceeded") {
        toast.error("Network Error");
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t("Something went wrong"));
      }
    }
    setTimeout(() => {
      actions.resetForm();
      actions.setSubmitting(false);
    }, 1000);
  };
  const [currentStyle, setCurrentStyle] = useState("send-email");
  const showWeSent = () => setCurrentStyle("we-sent");
  const dispatch = useDispatch();
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetpassValidationSchema,
    onSubmit,
  });
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
            {t("Please")} <strong>{t("enter your email address")}</strong>,{" "}
            {t("and we'll send you a link to reset your password.")}
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <FloatingLabel
              controlId="floatingInput"
              label={t("Email")}
              id={
                errors.email && touched.email
                  ? "floatingError"
                  : "floatingInput"
              }
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder={t("Email")}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FloatingLabel>
          </div>
          {errors.email && touched.email && (
            <small className="error-message">{errors.email}</small>
          )}

          <div className="my-3">
            <button
              className="SecondaryButton w-100"
              // onClick={() => {
              //   navigate("/wesent");
              // }}
              type="submit"
              disabled={isSubmitting}
            >
              {t("Continue")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgetpass;
