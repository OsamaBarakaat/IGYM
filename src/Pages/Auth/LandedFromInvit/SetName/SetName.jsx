import React from "react";
import { useDispatch } from "react-redux";
import { FloatingLabel, Form } from "react-bootstrap";

import "./SetName.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SetNameValidationSchema } from "../../../../Validations/SetNameValidation";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { setUser } from "../../../../Sotre/Action/User.action";

const SetName = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const onSubmit = async (values, actions) => {
    console.log("user signed in : ", values);
    actions.setSubmitting(true);
    setTimeout(() => {
      actions.resetForm();
      actions.setSubmitting(false);
    }, 1000);

    try {
      const res = await axiosPrivate.patch("/owners/update-my-profile", {
        name: values.name,
        phones: [values.phone],
      });
      console.log(res.data.data);
      toast.success("name and phone set successfully");
      dispatch(setUser(res.data.data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
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
      name: "",
      phone: "",
    },
    validationSchema: SetNameValidationSchema,
    onSubmit,
  });
  return (
    <div className="signin">
      <div className="main-cont-signin">
        <div className="signin-header">
          <p>finally set name and phone.</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <FloatingLabel
              controlId="floatingInput"
              label="name"
              id={
                errors.name && touched.name ? "floatingError" : "floatingInput"
              }
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
              />
            </FloatingLabel>
            {errors.name && touched.name && (
              <small className="error-message">{errors.name}</small>
            )}
          </div>
          <div>
            <FloatingLabel
              controlId="floatingInput"
              label="phone"
              id={
                errors.phone && touched.phone
                  ? "floatingError"
                  : "floatingInput"
              }
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                name="phone"
              />
            </FloatingLabel>
            {errors.phone && touched.phone && (
              <small className="error-message">{errors.phone}</small>
            )}
          </div>

          <div className="my-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="SecondaryButton w-100"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetName;
