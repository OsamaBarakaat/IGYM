import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Sotre/Action/User.action";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { signinValidationSchema } from "../../../Validations/SigninValidation";
import { useFormik } from "formik";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const { t, i18n } = useTranslation();
  const [showEye, setShowEye] = useState(false);
  const [typeOfPass, setTypeOfPass] = useState("password");
  const [loadingInput, setLoadingInput] = useState(false);
  const navigate = useNavigate();
  const showPassword = () => {
    setShowEye(true);
    if (typeOfPass === "password") {
      setTypeOfPass("text");
    } else setTypeOfPass("password");
  };
  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    setLoadingInput(true);
    console.log("user signed in : ", values);
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);

    try {
      const { data } = await axiosInstance.post("/owners/login", {
        email: values.email,
        password: values.password,
      });
      console.log(data);
      dispatch(
        setUser({
          data: data?.data?.userData,
          gymId: data?.data?.gymId,
          plan: data?.data?.plan,
          token: data.data.accessToken,
        })
      );

      // dispatch(
      //   setUser({ data: res.data.data.user, token: res.data.data.accessToken })
      // );
      setLoadingInput(false);
      navigate("/");
      toast.success(t("user signed in successfully"));
    } catch (error) {
      console.log(error);
      if (error.message === "timeout of 90000ms exceeded") {
        toast.error("Network Error");
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t("Something went wrong"));
      }
      setLoadingInput(false);
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
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit,
  });
  return (
    <div className="signin">
      <div className="main-cont-signin">
        <div className="signin-header">
          <p>
            {t("Track metrics and boost performance.")}{" "}
            <strong>{t("Sign in")}</strong> {t("to your gym dashboard.")}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
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
                style={{ fontSize: "16px" }}
                className="inputSignIn"
                type="text"
                placeholder={t("Email")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
              />
            </FloatingLabel>
            {errors.email && touched.email && (
              <small className="error-message">{errors.email}</small>
            )}
          </div>
          <div>
            <FloatingLabel
              controlId="floatingInput"
              label={t("password")}
              id={
                errors.password && touched.password
                  ? "floatingError"
                  : "floatingInput"
              }
              className="mb-3"
            >
              <Form.Control
                type={typeOfPass}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
                placeholder={t("password")}
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
          </div>
          {errors.password && touched.password && (
            <small className="error-message">{errors.password}</small>
          )}
          <div>
            <p
              onClick={() => {
                navigate("/forgetpass");
              }}
              className="main-color font-wheight cursor-pointer font-smaller my-2"
            >
              {t("Forget Password?")}
            </p>
          </div>
          <div className="my-3">
            <button
              type="submit"
              className="SecondaryButton w-100 flexcentercenter"
            >
              <span className="mx-1">{t("Sign in")}</span>
              {loadingInput && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                >
                  <span className="visually-hidden">{t("Loading...")}</span>
                </Spinner>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
