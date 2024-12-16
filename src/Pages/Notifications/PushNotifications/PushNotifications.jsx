import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import "./PushNotifications.css";
import { useFormik } from "formik";
import { FloatingLabel, Form } from "react-bootstrap";
import {
  SendNotificationAllValidation,
  SendNotificationValidation,
} from "../../../Validations/SendNotificationValidation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import HeadingNoBack from "../../../components/HeadingNoBack/Heading";

const PushNotifications = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  const { gymId } = useSelector((state) => state.user);

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
    try {
      actions.setSubmitting(true);
      await axiosPrivate.post(`/user-notifications`, {
        ...values,
        type: "private",
        gym: gymId,
      });
      toast.success(t("Notification sent successfully"));
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t("Error sending notification"));
      }
      console.error("Error sending notification:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const onSubmitAll = async (values, actions) => {
    console.log(values);
    try {
      actions.setSubmitting(true);
      await axiosPrivate.post(`/user-notifications`, {
        ...values,
        type: "public",
        gym: gymId,
      });
      toast.success(t("Notification sent to all users successfully"));
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error(t("Error sending notification"));
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formikSingle = useFormik({
    initialValues: {
      phone: "",
      message: "",
    },
    validationSchema: SendNotificationValidation,
    onSubmit: onSubmitSingle,
  });

  const formikAll = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: SendNotificationAllValidation,
    onSubmit: onSubmitAll,
  });
  return (
    <div className="pushNotif">
      {windowWidth > 1024 && (
        <HeadingNoBack content={t("Push Notifications")} />
      )}

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
            {t("Single user")}
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
            {t("All users")}
          </div>
        </div>
        {currentPage === 1 && (
          <div className="pushNotifBody m-2">
            <form onSubmit={formikSingle.handleSubmit}>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("phone")}
                  id={
                    formikSingle.errors.phone && formikSingle.touched.phone
                      ? "floatingError"
                      : "floatingInput"
                  }
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder={t("phone")}
                    onChange={formikSingle.handleChange}
                    onBlur={formikSingle.handleBlur}
                    value={formikSingle.values.phone}
                    name="phone"
                  />
                </FloatingLabel>
                {formikSingle.errors.phone && formikSingle.touched.phone && (
                  <small className="error-message">
                    {formikSingle.errors.phone}
                  </small>
                )}
              </div>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Message")}
                  id={
                    formikSingle.errors.message && formikSingle.touched.message
                      ? "floatingError"
                      : "floatingInput"
                  }
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Message")}
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
                  {t("Send")}
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
                  label={t("Message")}
                  id={
                    formikAll.errors.message && formikAll.touched.message
                      ? "floatingError"
                      : "floatingInput"
                  }
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Message")}
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
                  {t("Send")}
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
