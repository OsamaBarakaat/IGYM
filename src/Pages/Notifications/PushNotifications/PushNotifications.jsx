import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import "./PushNotifications.css";
import { useFormik } from "formik";
import { signinValidationSchema } from "../../../Validations/SigninValidation";
import { FloatingLabel, Form } from "react-bootstrap";
import { SendNotificationValidation } from "../../../Validations/SendNotificationValidation";
import { toast } from "react-toastify";

const PushNotifications = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const onSubmitSingle = async (values, actions) => {
    console.log(values);
    actions.setSubmitting(true);
    toast.success("Notification sent to single user successfully");
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  };

  const onSubmitAll = async (values, actions) => {
    console.log(values);
    try {
      actions.setSubmitting(true);
      // Simulating an async action (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Notification sent to all users successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Error sending notification");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formikSingle = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    validationSchema: SendNotificationValidation,
    onSubmit: onSubmitSingle,
  });

  const formikAll = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: SendNotificationValidation,
    onSubmit: onSubmitAll,
  });
  return (
    <div className="pushNotif">
      {windowWidth > 1024 && <Heading content={"Push Notifications"} />}

      <div className="pushNotifcontent bigCard my-3">
        <div className="pushNootifHead flexcenteraround m-2">
          <div
            className={
              currentPage === 1
                ? `main-color border-bottom-main w-50 m-2 cursor-pointer`
                : `w-50 m-2 cursor-pointer`
            }
            onClick={() => {
              setCurrentPage(1);
            }}
          >
            Single user
          </div>
          <div
            className={
              currentPage === 2
                ? ` main-color w-50 m-2 cursor-pointer border-bottom-main`
                : `w-50 m-2 cursor-pointer`
            }
            onClick={() => {
              setCurrentPage(2);
            }}
          >
            all users
          </div>
        </div>
        {currentPage === 1 && (
          <div className="pushNotifBody m-2">
            <form onSubmit={formikSingle.handleSubmit}>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  id={
                    formikSingle.errors.email && formikSingle.touched.email
                      ? "floatingError"
                      : "floatingInput"
                  }
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    onChange={formikSingle.handleChange}
                    onBlur={formikSingle.handleBlur}
                    value={formikSingle.values.email}
                    name="email"
                  />
                </FloatingLabel>
                {formikSingle.errors.email && formikSingle.touched.email && (
                  <small className="error-message">
                    {formikSingle.errors.email}
                  </small>
                )}
              </div>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Message"
                  id={
                    formikSingle.errors.message && formikSingle.touched.message
                      ? "floatingError"
                      : "floatingInput"
                  }
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Message"
                    onChange={formikSingle.handleChange}
                    onBlur={formikSingle.handleBlur}
                    value={formikSingle.values.message}
                    name="message"
                  />
                </FloatingLabel>
                {formikSingle.errors.message &&
                  formikSingle.touched.message && (
                    <small className="error-message">
                      {formikSingle.errors.message}
                    </small>
                  )}
              </div>
              <div className="pushNotifFooter my-2">
                <button
                  className="SecondaryButton w-100"
                  type="submit"
                  disabled={formikSingle.isSubmitting}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
        {currentPage === 2 && (
          <div className="pushNotifBody m-2">
            <form onSubmit={formikAll.handleSubmit}>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Message"
                  id={
                    formikAll.errors.message && formikAll.touched.message
                      ? "floatingError"
                      : "floatingInput"
                  }
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Message"
                    onChange={formikAll.handleChange}
                    onBlur={formikAll.handleBlur}
                    value={formikAll.values.message}
                    name="message"
                  />
                </FloatingLabel>
                {formikAll.errors.message && formikAll.touched.message && (
                  <small className="error-message">
                    {formikAll.errors.message}
                  </small>
                )}
              </div>
              <div className="pushNotifFooter my-2">
                <button
                  className="SecondaryButton w-100"
                  type="submit"
                  disabled={formikAll.isSubmitting}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PushNotifications;
