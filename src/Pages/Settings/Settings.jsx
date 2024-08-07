import React, { useEffect, useState } from "react";
import "./Settings.css";
import Heading from "../../components/Heading/Heading";
import {
  FloatingLabel,
  Form,
  Offcanvas,
  Modal,
  NavDropdown,
} from "react-bootstrap";
import avatar from "../../assetss/default/5856.jpg";
import * as Yup from "yup";
import { planValidationSchema } from "../../Validations/PlanValidation";
import { Formik, ErrorMessage, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../Sotre/Action/Theme.action";
import { SendInviteValidation } from "../../Validations/SendInviteValidation";
import axiosInstance, { privateAxiosInstance } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { convertToCreatedAtFormat } from "../../createdAt";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import GymProfile from "../GymProfile/GymProfile";
import Roles from "../Roles/Roles";
const Settings = () => {
  const [members, setMembers] = useState([]);
  const [toggled, setToggled] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();

  // Load initial toggle state from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setToggled(true);
    }
  }, []);

  const handleClick = () => {
    const newToggledState = !toggled;
    setToggled(newToggledState);
    const theme = newToggledState ? "dark" : "light"; // Toggle theme based on new state
    dispatch(setTheme(theme));
    localStorage.setItem("theme", theme);
  };
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalAddPlan, setModalShowAddPlan] = useState(false);
  const [modalEditPlan, setModalShowEditPlan] = useState(false);
  const dispatch = useDispatch();
  // <=================>  Add Plan <=================>
  const onSubmit = async (values, actions) => {
    console.log("Form submitted:", values);
    try {
      const { data } = await axiosPrivate.post("/owner-plans/", {
        name: values.name,
        maxTrainees: values.maxTrainees,
        cost: values.cost,
        branches: values.branches,
        duration: values.duration,
        description: values.description,
      });
      console.log("res", data);
      toast.success("Plan added successfully");
      setPlans([data?.data, ...plans]);
      setTimeout(() => {
        setModalShowAddPlan(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    setTimeout(() => {
      actions.resetForm();
      actions.setSubmitting(false);
    }, 1000);
  };
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      maxTrainees: "",
      cost: "",
      branches: "",
      duration: "",
      description: "",
    },
    validationSchema: planValidationSchema,
    onSubmit,
  });

  // get plans
  const [plans, setPlans] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState(null);

  // Update editPlan form when selectedPlan changes

  const handleShowEditPlan = async (plan) => {
    setSelectedPlan(plan);
    setModalShowEditPlan(true);
  };

  const editPlan = useFormik({
    initialValues: {
      name: "",
      maxTrainees: "",
      cost: "",
      branches: "",
      duration: "",
      description: "",
    },
    validationSchema: planValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        const { data } = await axiosPrivate.put(
          `/owner-plans/${selectedPlan?._id}`,
          {
            name: values.name,
            maxTrainees: values.maxTrainees,
            cost: values.cost,
            branches: values.branches,
            duration: values.duration,
            description: values.description,
          }
        );
        console.log("res", data);
        toast.success("Plan updated successfullyyy");
        const editedPlans = plans.map((plan) => {
          if (selectedPlan?._id === plan._id) {
            return data?.data;
          }
          return plan;
        });

        setPlans(editedPlans);
      } catch (error) {
        console.log(error);
        toast.error("Something went wronggg");
      }
    },
  });

  //delete plan
  const handleDeletePlan = async (id) => {
    try {
      const res = await axiosPrivate.delete(`/owner-plans/${id}`);
      console.log("res", res);
      toast.success("Plan deleted successfully");
      const newPlans = plans.filter((plan) => {
        return plan._id !== id;
      });
      setPlans(newPlans);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const { gymId } = useSelector((state) => state.user);

  // =========== Add Plan ===========
  const [inviteLink, setInviteLink] = useState(null);
  const handleSendInvite = async (values, actions) => {
    try {
      const { data } = await privateAxiosInstance.post(
        `gyms/${gymId}/members`,
        {
          email: values.email,
          role: values.role,
          clientUrl: "https://my-gym-panel.vercel.app/setpass/",
        }
      );
      setInviteLink(data.data.inviteLink);
      actions.resetForm();
      actions.setSubmitting(false);
      toast.success("Invite sent successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  console.log(inviteLink);
  const sendInvite = useFormik({
    initialValues: {
      email: "",
      role: "",
    },
    validationSchema: SendInviteValidation,
    onSubmit: handleSendInvite,
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [numberOfPages, setNumberOfPages] = useState(0);

  // Roles
  const [roles, setRoles] = useState([]);
  const fetchRoles = async () => {
    try {
      const { data } = await privateAxiosInstance.get(`/gyms/${gymId}/roles`);
      setRoles(data.data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await privateAxiosInstance.get(
          `/gyms/${gymId}/members?page=${page}&limit=${limit}`
        );
        console.log("members", data.data.documents);
        setMembers(data.data.documents);
        setLoading(false);
      } catch (error) {}
    };
    fetchMembers();
  }, [page, limit]);
  console.log(numberOfPages);
  const pageArr = [];
  for (let i = 0; i < numberOfPages; i++) {
    pageArr.push(i);
  }
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const handleShowEdit = (admin) => {
    console.log("admin", admin);
    setSelectedAdmin(admin);
    editMember.setValues({ role: admin.role._id });
    setShowEdit(true);
  };

  // <=======> Edit member <=======> //
  const editMember = useFormik({
    initialValues: {
      role: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        const res = await axiosPrivate.patch(
          `gyms/${gymId}/members/${selectedAdmin?._id}`,
          {
            role: values.role,
          }
        );
        console.log("res", res);
        setMembers(
          members.map((member) =>
            member._id === res.data.data._id ? res.data.data : member
          )
        );
        toast.success("Member role updated successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });
  const suspendUser = async (id) => {
    try {
      const res = await axiosPrivate.patch(
        `gyms/${gymId}/members/${selectedAdmin?._id}`,
        {
          isSuspended: true,
        }
      );
      console.log("res", res);
      setMembers(
        members.map((member) =>
          member._id === res.data.data._id ? res.data.data : member
        )
      );
      setShowEdit(false);
      toast.success("Member suspended successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const activateUser = async (id) => {
    try {
      const res = await axiosPrivate.patch(
        `gyms/${gymId}/members/${selectedAdmin?._id}`,
        {
          isSuspended: false,
        }
      );
      console.log("res", res);
      setMembers(
        members.map((member) =>
          member._id === res.data.data._id ? res.data.data : member
        )
      );
      setShowEdit(false);
      toast.success("Member activated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // <=======> Edit member <=======> //

  // copy

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!inviteLink) {
      return;
    }
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setInviteLink(null);
    }, 2000);
  };

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    // More languages
  ];

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
    // You should put this into a context so the whole app will be able to access it and avoid prop drilling
  };
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className="GeneralSettingsOne" style={{ minHeight: "100vh" }}>
      <aside className="GeneralSettingsOneSidebar">
        <p className="cursor-pointer">Settings</p>
        <nav className="GeneralSettingsOneNav">
          <ul>
            <li
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              Gym Profile
            </li>
            <li
              onClick={() => {
                setCurrentPage(2);
              }}
            >
              Members
            </li>
            <li
              onClick={() => {
                setCurrentPage(3);
              }}
            >
              Prefrences
            </li>
            <li
              onClick={() => {
                setCurrentPage(4);
              }}
            >
              Roles
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-GS-content">
        <div className="secondNav">
          <div className="head">Settings</div>
          <div className="secondNavItems">
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(2);
              }}
            >
              Gym Profile
            </div>
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(2);
              }}
            >
              Members
            </div>
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(3);
              }}
            >
              Prefrences
            </div>
            <div
              className="myInfoSecondNav"
              onClick={() => {
                setCurrentPage(4);
              }}
            >
              Roles
            </div>
          </div>
        </div>
        {currentPage === 1 && (
          <>
            <GymProfile />
          </>
        )}
        {currentPage === 2 && (
          <div className="myInfo">
            <div className="myInfoHeading">
              <Heading content={"Staff members"} />
            </div>
            <div className="myInfoContent">
              <div className="tableContainer">
                <div className="addMember px-4">
                  <button className="PrimaryButton" onClick={handleShow}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                    </span>
                    <span>Invite new</span>
                  </button>
                </div>
                <table className="mainTable">
                  <thead>
                    <tr>
                      <th>Member name</th>
                      <th>Role</th>
                      <th>Join date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((admin) => {
                      return (
                        <tr>
                          <td>
                            <div className="d-flex align-items-center justify-content-start">
                              <div className="profilePic">
                                <img
                                  src={admin?.image || avatar}
                                  alt="profilePic"
                                  className="widthSmall"
                                />
                              </div>
                              <div className="profileName mx-3">
                                {admin?.name || "No Name"}
                              </div>
                            </div>
                          </td>
                          <td>{admin?.role.name}</td>
                          <td>{convertToCreatedAtFormat(admin?.createdAt)}</td>
                          <td>
                            <div className="d-flex justify-content-center">
                              <button
                                className="PrimaryButton"
                                onClick={() => handleShowEdit(admin)}
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center align-items-center pagination my-2">
                  <div className="w-50 d-flex justify-content-between align-items-center">
                    <button
                      className={`PrimaryButtonTwo cursor-not-allowed ${
                        page === 1 && "cursor-not-allowed"
                      }`}
                      onClick={() => {
                        setPage(page - 1);
                      }}
                      disabled={true}
                    >
                      Previous
                    </button>
                    <div className="pages">
                      {pageArr.map((page) => {
                        return (
                          <span
                            className="mx-3 pag-item"
                            onClick={() => {
                              setPage(page + 1);
                            }}
                          >
                            {page + 1}
                          </span>
                        );
                      })}
                    </div>
                    <button
                      className={`PrimaryButtonTwo cursor-not-allowed ${
                        page === numberOfPages && "cursor-not-allowed"
                      }`}
                      onClick={() => {
                        setPage(page + 1);
                      }}
                      disabled={true}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentPage === 3 && (
          <div>
            <div className="myInfo">
              <div className="myInfoHeading">
                <Heading content={"Theme&Language"} />
              </div>

              <div className="bigCard m-3">
                <p> change theme</p>
                <div
                  onClick={handleClick}
                  className={`toggle${toggled ? " night" : ""}`}
                >
                  <div className="notch">
                    <div className="crater" />
                    <div className="crater" />
                  </div>
                  <div>
                    <div className="shape sm" />
                    <div className="shape sm" />
                    <div className="shape md" />
                    <div className="shape lg" />
                  </div>
                </div>
              </div>
              <div className="bigCard m-3">
                <p>change Language</p>
                <div className="d-flex justify-content-between">
                  {/* <select
                    value={selectedLanguage}
                    onChange={handleChangeLanguage}
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.name}
                      </option>
                    ))}
                  </select> */}
                  <NavDropdown
                    className="w-50"
                    title="Choose Language"
                    id="basic-nav-dropdown"
                    value={selectedLanguage}
                    onChange={handleChangeLanguage}
                  >
                    {languages.map((language) => (
                      <React.Fragment>
                        <NavDropdown.Item
                          key={language.code}
                          value={language.code}
                        >
                          {language.name}
                        </NavDropdown.Item>
                      </React.Fragment>
                    ))}
                  </NavDropdown>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentPage === 4 && (
          <div>
            <Roles />
          </div>
        )}
        <div className="offCanvasAddMember">
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            id="offCanvas"
          >
            <Offcanvas.Header>
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Offcanvas.Title>
                  <span className="offCanvasHeadTitle">Invite member</span>
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
              <form onSubmit={sendInvite.handleSubmit}>
                <div>
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      id={
                        sendInvite.errors.email && sendInvite.touched.email
                          ? "floatingError"
                          : "floatingInput"
                      }
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={sendInvite.handleChange}
                        onBlur={sendInvite.handleBlur}
                        value={sendInvite.values.email}
                      />
                    </FloatingLabel>
                    {sendInvite.errors.email && sendInvite.touched.email && (
                      <small className="error-message">
                        {sendInvite.errors.email}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Select role"
                      id={
                        sendInvite.errors.role && sendInvite.touched.role
                          ? "floatingError"
                          : "floatingInput"
                      }
                    >
                      <Form.Select
                        name="role"
                        onChange={sendInvite.handleChange}
                        onBlur={sendInvite.handleBlur}
                        value={sendInvite.values.role}
                      >
                        <option value="" disabled>
                          Select role
                        </option>
                        {roles.map((role) => (
                          <option key={role} value={role._id}>
                            {role.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                    {sendInvite.errors.role && sendInvite.touched.role && (
                      <small className="error-message">
                        {sendInvite.errors.role}
                      </small>
                    )}
                  </div>
                  <div className="my-2">
                    <button
                      className="SecondaryButton w-100"
                      disabled={sendInvite.isSubmitting}
                      type="submit"
                    >
                      Invite
                    </button>
                    <br />
                    <button
                      type="button"
                      className={`PrimaryButtonTwo w-100 transition ${
                        !inviteLink && "cursor-not-allowed"
                      }`}
                      disabled={!inviteLink}
                      onClick={handleCopy}
                    >
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
                      <span>{copied ? "Copied!" : "Copy link"}</span>
                      {/* <span>Copy link</span> */}
                    </button>
                  </div>
                </div>
              </form>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="offCanvasEditMember">
          <Offcanvas
            show={showEdit}
            onHide={handleCloseEdit}
            placement="end"
            id="offCanvas"
          >
            <Offcanvas.Header>
              <div className="d-flex justify-content-between w-100 align-items-center mt-2">
                <Offcanvas.Title>
                  <span className="offCanvasHeadTitle">Edit member</span>
                </Offcanvas.Title>
                <button
                  className="btn-close bg-secondary"
                  onClick={() => {
                    setShowEdit(false);
                  }}
                ></button>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="editHead">
                <div className="profilePic d-flex justify-content-center align-items-center flex-column">
                  <img
                    src={selectedAdmin?.image || avatar}
                    alt="profilePic"
                    className="widthMedium"
                  />
                  <div className="profileName text-center fontLarge my-2">
                    {selectedAdmin?.name}
                    <p className="text-center text-small-opacity">
                      <p>{selectedAdmin?.role.name}</p>
                      <p>{selectedAdmin?.email}</p>
                      <p>{selectedAdmin?.phones[0]}</p>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-start opacity-75">Edit role</p>
              </div>
              <form onSubmit={editMember.handleSubmit}>
                <div>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Select role"
                    id="floatingInput"
                    className="mb-3"
                  >
                    <Form.Select
                      value={editMember.values.role}
                      name="role"
                      onChange={editMember.handleChange}
                      onBlur={editMember.handleBlur}
                    >
                      <option value="">Select role</option>
                      {roles.map((role) => (
                        <option key={role} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div>
                  <button
                    className="SecondaryButton w-100"
                    type="submit"
                    disabled={editMember.isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </form>

              <div>
                <p className="text-start opacity-75 my-5">Other actions</p>
              </div>
              <div className="flexcenteraround">
                <button className="PrimaryButtonTwo w-100">
                  {selectedAdmin?.isSuspended ? (
                    <>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="green"
                          class="bi bi-check2-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg>
                      </span>
                      <span
                        onClick={() => {
                          activateUser(selectedAdmin?._id);
                        }}
                      >
                        Activate
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-slash-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z" />
                        </svg>
                      </span>
                      <span
                        onClick={() => {
                          suspendUser(selectedAdmin?._id);
                        }}
                      >
                        Suspend
                      </span>
                    </>
                  )}
                </button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="modalAddPlan">
          <Modal
            show={modalAddPlan}
            onHide={() => setModalShowAddPlan(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton id="modal">
              <Modal.Title id="contained-modal-title-vcenter">
                Add Plan
              </Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal">
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="mb-2">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Plan Name"
                        id={
                          errors.name && touched.name
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder="Plan Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FloatingLabel>
                      {errors.name && touched.name && (
                        <small className="error-message">{errors.name}</small>
                      )}
                    </div>
                    <div className="RowMid">
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Branches"
                          id={
                            errors.branches && touched.branches
                              ? "floatingError"
                              : "floatingInput"
                          }
                          className=" w-100"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Branches"
                            name="branches"
                            value={values.branches}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FloatingLabel>
                        {errors.branches && touched.branches && (
                          <small className="error-message">
                            {errors.branches}
                          </small>
                        )}
                      </div>
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Max Trainees"
                          id={
                            errors.maxTrainees && touched.maxTrainees
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="number"
                            placeholder="Max Trainees"
                            name="maxTrainees"
                            value={values.maxTrainees}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FloatingLabel>
                        {errors.maxTrainees && touched.maxTrainees && (
                          <small className="error-message">
                            {errors.maxTrainees}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="costpermonth">
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Cost"
                          id={
                            errors.cost && touched.cost
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="number"
                            placeholder="Cost"
                            name="cost"
                            value={values.cost}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></Form.Control>
                        </FloatingLabel>
                        {errors.cost && touched.cost && (
                          <small className="error-message">{errors.cost}</small>
                        )}
                      </div>
                      <p>Per</p>
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Duration(months)"
                          id={
                            errors.duration && touched.duration
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="number"
                            placeholder="Duration"
                            value={values.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="duration"
                          ></Form.Control>
                        </FloatingLabel>
                        {errors.duration && touched.duration && (
                          <small className="error-message">
                            {errors.duration}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Description"
                        id={
                          errors.description && touched.description
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder="description"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                      {errors.description && touched.description && (
                        <small className="error-message">
                          {errors.description}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="flexcenteraround">
                    <button
                      className="SecondaryButton"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setModalShowAddPlan(false);
                      }}
                      className="DangerButton"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div className="modalEditPlan">
          <Modal
            show={modalEditPlan}
            onHide={() => setModalShowEditPlan(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton id="modal">
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Plan
              </Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal">
              <div>
                <form onSubmit={editPlan.handleSubmit}>
                  <div>
                    <div className="mb-2">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Plan Name"
                        id={
                          editPlan.errors.name && editPlan.touched.name
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder="Plan Name"
                          name="name"
                          value={editPlan.values.name}
                          onChange={editPlan.handleChange}
                          onBlur={editPlan.handleBlur}
                        />
                      </FloatingLabel>
                      {editPlan.errors.name && editPlan.touched.name && (
                        <small className="error-message">
                          {editPlan.errors.name}
                        </small>
                      )}
                    </div>
                    <div className="RowMid">
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Branches"
                          id={
                            editPlan.errors.branches &&
                            editPlan.touched.branches
                              ? "floatingError"
                              : "floatingInput"
                          }
                          className=" w-100"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Branches"
                            name="branches"
                            value={editPlan.values.branches}
                            onChange={editPlan.handleChange}
                            onBlur={editPlan.handleBlur}
                          />
                        </FloatingLabel>
                        {editPlan.errors.branches &&
                          editPlan.touched.branches && (
                            <small className="error-message">
                              {editPlan.errors.branches}
                            </small>
                          )}
                      </div>
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Max Trainees"
                          id={
                            editPlan.errors.maxTrainees &&
                            editPlan.touched.maxTrainees
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="number"
                            placeholder="Max Trainees"
                            name="maxTrainees"
                            value={editPlan.values.maxTrainees}
                            onChange={editPlan.handleChange}
                            onBlur={editPlan.handleBlur}
                          />
                        </FloatingLabel>
                        {editPlan.errors.maxTrainees &&
                          editPlan.touched.maxTrainees && (
                            <small className="error-message">
                              {editPlan.errors.maxTrainees}
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="costpermonth">
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Cost"
                          id={
                            editPlan.errors.cost && editPlan.touched.cost
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="number"
                            placeholder="Cost"
                            name="cost"
                            value={editPlan.values.cost}
                            onChange={editPlan.handleChange}
                            onBlur={editPlan.handleBlur}
                          ></Form.Control>
                        </FloatingLabel>
                        {editPlan.errors.cost && editPlan.touched.cost && (
                          <small className="error-message">
                            {editPlan.errors.cost}
                          </small>
                        )}
                      </div>
                      <p>Per</p>
                      <div className="mb-2">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Duration"
                          id={
                            editPlan.errors.duration &&
                            editPlan.touched.duration
                              ? "floatingError"
                              : "floatingInput"
                          }
                        >
                          <Form.Control
                            type="number"
                            placeholder="Duration"
                            value={editPlan.values.duration}
                            onChange={editPlan.handleChange}
                            onBlur={editPlan.handleBlur}
                            name="duration"
                          ></Form.Control>
                        </FloatingLabel>
                        {editPlan.errors.duration &&
                          editPlan.touched.duration && (
                            <small className="error-message">
                              {editPlan.errors.duration}
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="mb-2 w-100">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Description"
                        id={
                          editPlan.errors.description &&
                          editPlan.touched.description
                            ? "floatingError"
                            : "floatingInput"
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder="description"
                          name="description"
                          value={editPlan.values.description}
                          onChange={editPlan.handleChange}
                          onBlur={editPlan.handleBlur}
                        ></Form.Control>
                      </FloatingLabel>
                      {editPlan.errors.description &&
                        editPlan.touched.description && (
                          <small className="error-message">
                            {editPlan.errors.description}
                          </small>
                        )}
                    </div>
                  </div>
                  <div className="flexcenteraround">
                    <button
                      className="SecondaryButton"
                      type="submit"
                      disabled={editPlan.isSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        setModalShowEditPlan(false);
                      }}
                      className="DangerButton"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Settings;
