import React, { useState } from "react";
import Heading from "../../components/Heading/Heading";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Profile.css";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reSetUser, setUser } from "../../Sotre/Action/User.action";
import { useFormik } from "formik";
import { changepassValidationSchema } from "../../Validations/ChangepassValidation";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axiosInstance from "../../api/axios";
import avatar from "../../assetss/default/5856.jpg";
const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalShow, setModalShow] = useState(false);
  const [userName, setUserName] = useState("Osama Barakat");
  const [userEmail, setUserEmail] = useState("osama@gmail.com");
  const [userPhone, setUserPhone] = useState("01100435756");
  const [userImage, setUserImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEye, setShowEye] = useState(false);
  const [showEyeOfConfirm, setShowEyeOfConfirm] = useState(false);
  const [showEyeOfReConfirm, setShowEyeOfReConfirm] = useState(false);

  const navigate = useNavigate();
  const {data:userData} = useSelector((state) => state.user);
  console.log(userData);
  const dispatch = useDispatch();
  const handleUpload = () => {
    if (userImage) {
      console.log("Image uploaded:", userImage);
    } else {
      console.log("No image selected.");
    }
  };

  const LogOut = async () => {
    try {
      await axiosInstance.post("/admins/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      toast.success("Logged out successfully");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("jwt");
      dispatch(reSetUser());
      navigate("/signin");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setUserImage(imageFile);
  };
  console.log(userImage);
  const formData = new FormData();
  formData.append("image", userImage);
  const updateImage = async () => {
    try {
      const res = await axiosPrivate.patch(
        "/admins/update-my-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      toast.success("Image updated successfully");
      dispatch(setUser(res.data.data));
      setUserImage(null);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const onSubmit = async (values, actions) => {
    console.log("user signed in : ", values);
    actions.setSubmitting(true);

    try {
      const res = await axiosPrivate.patch("/admins/update-my-password", {
        currentPassword: values.oldPassword,
        password: values.newPassword,
        passwordConfirm: values.confirmPassword,
      });
      console.log(res);
      toast.success("Password changed successfully");
      setTimeout(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      actions.setSubmitting(false);
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
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changepassValidationSchema,
    onSubmit,
  });
  const axiosPrivate = useAxiosPrivate();
  const updateProfile = useFormik({
    initialValues: {
      name: userData?.name,
      phones:
        userData?.phones && userData.phones.length > 0
          ? userData.phones[0]
          : "",
    },
    onSubmit: async (values) => {
      console.log(values);

      try {
        const res = await axiosPrivate.patch("/admins/update-my-profile", {
          name: values.name,
          phones: [values?.phones],
        });
        console.log(res.data.data);
        toast.success("Profile updated successfully");
        dispatch(setUser(res.data.data));
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });
  const [typeOfPass, setTypeOfPass] = useState("password");
  const showPassword = () => {
    setShowEye(true);
    if (typeOfPass === "password") {
      setTypeOfPass("text");
    } else setTypeOfPass("password");
  };
  const [typeOfConfirmPass, setTypeOfConfirmPass] = useState("password");
  const showConfirmPassword = () => {
    setShowEyeOfConfirm(true);
    if (typeOfConfirmPass === "password") {
      setTypeOfConfirmPass("text");
    } else setTypeOfConfirmPass("password");
  };
  const [typeOfReConfirmPass, setTypeReOfConfirmPass] = useState("password");
  const showReConfirmPassword = () => {
    setShowEyeOfReConfirm(true);
    if (typeOfReConfirmPass === "password") {
      setTypeReOfConfirmPass("text");
    } else setTypeReOfConfirmPass("password");
  };

  return (
    <div className="Profile" style={{ minHeight: "100vh" }}>
      <aside className="profileSide">
        <p className="cursor-pointer">Profile</p>
        <nav className="profileNav">
          <ul>
            <li
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              My info
            </li>
            <li
              onClick={() => {
                setCurrentPage(2);
              }}
            >
              Chnage Password
            </li>
            <li onClick={() => setModalShow(true)}>Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="main-profile-content">
        <div className="secondNav">
          <div className="head">Profile</div>
          <div className="secondNavItems">
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              My info
            </div>
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(2);
              }}
            >
              Change Password
            </div>
          </div>
        </div>
        {currentPage === 1 && (
          <div className="myInfo">
            <div className="myInfoHeading">
              <Heading content={"My info"} />
            </div>
            <div className="myInfoContent">
              <div className="imgContainer">
                <div className="h3OfimgContainer">
                  <p>Profile image</p>
                </div>
                <div className="imgContContainer">
                  <div>
                    <img src={userData?.image || avatar} alt="profile img" />
                  </div>
                  <div className="transition">
                    {userImage ? (
                      <>
                        <div className="d-flex gap-1">
                          <button
                            className="PrimaryButton"
                            onClick={updateImage}
                          >
                            Upload
                          </button>
                          <button
                            className="SecondaryButton"
                            onClick={() => {
                              setUserImage(null);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="userImage"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />

                        <label htmlFor="userImage" className="PrimaryButton">
                          Change image
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="details">
                <div className="detailsContainer">
                  <div className="titleAndEdit">
                    <p>Your details</p>
                    <button className="PrimaryButton" onClick={handleShow}>
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
                  <div className="detailsContainerdata">
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Your name"
                        id="floatingInput"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name"
                          defaultValue={userData?.name}
                          readOnly
                        />
                      </FloatingLabel>
                    </div>
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        id="floatingInput"
                        className="opacity-50"
                      >
                        <Form.Control
                          type="email"
                          disabled
                          placeholder="email"
                          defaultValue={userData?.email}
                        />
                      </FloatingLabel>
                    </div>
                    <div>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Phone"
                        id="floatingInput"
                        className="mb-3"
                      >
                        {userData &&
                          userData.phones &&
                          userData.phones.length > 0 && (
                            <Form.Control
                              type="number"
                              placeholder="phone number"
                              defaultValue={userData.phones[0]}
                              readOnly
                            />
                          )}
                      </FloatingLabel>
                    </div>
                  </div>
                </div>
              </div>
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
                      <span className="offCanvasHeadTitle">
                        Edit your details
                      </span>
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
                  <form onSubmit={updateProfile.handleSubmit}>
                    <div>
                      <div>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Your name"
                          id="floatingInput"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            placeholder="name"
                            name="name"
                            value={updateProfile.values.name}
                            onChange={updateProfile.handleChange}
                            onBlur={updateProfile.handleBlur}
                          />
                        </FloatingLabel>
                      </div>
                      <div>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Phone"
                          id="floatingInput"
                          className="mb-3"
                        >
                          <Form.Control
                            type="number"
                            name="phones"
                            placeholder="phone number"
                            value={updateProfile.values.phones}
                            onChange={updateProfile.handleChange}
                            onBlur={updateProfile.handleBlur}
                          />
                        </FloatingLabel>
                      </div>
                      <div>
                        <button
                          className="SecondaryButton w-100"
                          type="submit"
                          disabled={updateProfile.isSubmitting}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </Offcanvas.Body>
              </Offcanvas>
            </div>

            <div className="DangerButtonContainer">
              <button
                className="DangerButton"
                onClick={() => setModalShow(true)}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {currentPage === 2 && (
          <div className="changePassword">
            <Heading content={"Change password"} />
            <form onSubmit={handleSubmit}>
              <div className="changePasswordContent">
                <div className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Old password"
                    id={
                      errors.oldPassword && touched.oldPassword
                        ? "floatingError"
                        : "floatingInput"
                    }
                  >
                    <Form.Control
                      type={typeOfPass}
                      required
                      name="oldPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.oldPassword}
                      placeholder="Current password"
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
                  {errors.oldPassword && touched.oldPassword && (
                    <small className="error-message">
                      {errors.oldPassword}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="New password"
                    id={
                      errors.newPassword && touched.newPassword
                        ? "floatingError"
                        : "floatingInput"
                    }
                  >
                    <Form.Control
                      type={typeOfConfirmPass}
                      placeholder="new password"
                      required
                      name="newPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
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
                        onClick={(e) => {
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
                  {errors.newPassword && touched.newPassword && (
                    <small className="error-message">
                      {errors.newPassword}
                    </small>
                  )}
                </div>
                <div>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Confirm new password"
                    id={
                      errors.confirmPassword && touched.confirmPassword
                        ? "floatingError"
                        : "floatingInput"
                    }
                    className="mb-3"
                  >
                    <Form.Control
                      type={typeOfReConfirmPass}
                      required
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="confirm new password"
                      value={values.confirmPassword}
                    />
                    {!showEyeOfReConfirm ? (
                      <span onClick={showReConfirmPassword}>
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
                          setShowEyeOfReConfirm(false);
                          setTypeReOfConfirmPass("password");
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
                    <small className="error-message">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>
                <div>
                  <button
                    className={
                      (errors.confirmPassword && touched.confirmPassword) ||
                      (errors.newPassword && touched.newPassword) ||
                      (errors.oldPassword && touched.oldPassword)
                        ? "SecondaryButton w-100 opacityL cursor-not-allowed"
                        : `SecondaryButton w-100`
                    }
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        <div>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="modalOfLogout">
              <p>Are you sure you want to logout ?</p>
            </Modal.Body>
            <div className="modalOfLogout">
              <Modal.Footer>
                <div className="d-flex justify-content-around w-100 gap-1">
                  <button
                    className="DangerButton flex-grow-2"
                    onClick={() => {
                      LogOut();
                    }}
                  >
                    Logout
                  </button>
                  <button
                    className="SecondaryButton flex-grow-1"
                    onClick={() => {
                      setModalShow(false);
                    }}
                  >
                    Keep me in
                  </button>
                </div>
              </Modal.Footer>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Profile;
