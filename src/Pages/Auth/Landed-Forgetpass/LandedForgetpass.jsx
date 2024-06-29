import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Sotre/Action/User.action";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

import "./LandedForgetpass.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { resetpassValidationSchema } from "../../../Validations/ForgetpassValidation";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";

const LandedForgetpass = () => {
  const [showEye, setShowEye] = useState(false);
  const [typeOfPass, setTypeOfPass] = useState("password");
  const [showEyeOfConfirm, setShowEyeOfConfirm] = useState(false);
  const [typeOfConfirmPass, setTypeOfConfirmPass] = useState("password");
  const navigate = useNavigate();
  const showPassword = () => {
    setShowEye(true);
    if (typeOfPass === "password") {
      setTypeOfPass("text");
    } else setTypeOfPass("password");
  };
  const showConfirmPassword = () => {
    setShowEyeOfConfirm(true);
    if (typeOfConfirmPass === "password") {
      setTypeOfConfirmPass("text");
    } else setTypeOfConfirmPass("password");
  };

  const dispatch = useDispatch();
  const { invitToken } = useParams();
  const onSubmit = async (values, actions) => {
    try {
      console.log(values);
      actions.setSubmitting(true);
      setTimeout(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      }, 1000);

      const { data } = await axiosInstance.patch(
        `/owners/reset-password/${invitToken}`,
        {
          password: values.newPassword,
          passwordConfirm: values.confirmPassword,
        }
      );

      console.log(data.data.accessToken);
      console.log(data.data.refreshToken);
      console.log(data.data.user);

      dispatch(setUser(data.data.user));
      // localStorage.setItem("accessToken", data?.data?.accessToken);
      // localStorage.setItem("jwt", data?.data?.refreshToken);

      toast.success("Password has been set successfully");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      console.error(error);

      // Reset form and set submitting to false in case of error
      actions.resetForm();
      actions.setSubmitting(false);

      if (error.response) {
        // Handle specific HTTP errors (e.g., 404, 500, etc.)
        console.error("HTTP Error:", error.response.status);
        toast.error("An error occurred. Please try again later.");
      } else if (error.request) {
        // Handle network errors (e.g., no response received)
        console.error("Network Error:", error.request);
        toast.error("Network error. Please check your internet connection.");
      } else {
        // Handle other errors (e.g., client-side errors)
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

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
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetpassValidationSchema,
    onSubmit,
  });

  return (
    <div className="signin">
      <div className="main-cont-signin">
        <div className="signin-header">
          <p>
            Now you can set <strong>new password!</strong> don't forget it
            again.
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="new password"
              id={
                errors.newPassword && touched.newPassword
                  ? "floatingError"
                  : "floatingInput"
              }
            >
              <Form.Control
                type={typeOfPass}
                required
                name="newPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="new password"
              />
              {!showEye ? (
                <span onClick={showPassword}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </svg>
                </span>
              ) : (
                <span
                  onClick={() => {
                    setShowEye(false);
                    setTypeOfPass("password");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                </span>
              )}
            </FloatingLabel>
            {errors.newPassword && touched.newPassword && (
              <small className="error-message">{errors.newPassword}</small>
            )}
          </div>
          <div className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="confirm new password"
              id={
                errors.confirmPassword && touched.confirmPassword
                  ? "floatingError"
                  : "floatingInput"
              }
            >
              <Form.Control
                type={typeOfConfirmPass}
                required
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="confirm new password"
              />
              {!showEyeOfConfirm ? (
                <span onClick={showConfirmPassword}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </svg>
                </span>
              ) : (
                <span
                  onClick={() => {
                    setShowEyeOfConfirm(false);
                    setTypeOfConfirmPass("password");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                </span>
              )}
            </FloatingLabel>
            {errors.confirmPassword && touched.confirmPassword && (
              <small className="error-message">{errors.confirmPassword}</small>
            )}
          </div>
          <div className="my-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="SecondaryButton w-100"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandedForgetpass;
