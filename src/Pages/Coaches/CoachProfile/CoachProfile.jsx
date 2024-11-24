import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import defaultt from "../../../assetss/default/5856.jpg";
import "./CoachProfile.css";
import { FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { privateAxiosInstance } from "../../../api/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const CoachProfile = () => {
  const { t } = useTranslation();
  const [coach, setCoach] = useState({});
  const { gymId } = useSelector((state) => state.user);
  const { coachId } = useParams();
  const navigate = useNavigate();
  console.log("coachId", coachId);

  const nameRef = useRef();
  const salaryRef = useRef();
  const shiftFromRef = useRef();
  const shiftToRef = useRef();
  const aboutRef = useRef();
  const qualificationsRef = useRef();
  const specialityRef = useRef();

  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    try {
      const { data } = await privateAxiosInstance.get(
        `/gyms/${gymId}/coaches/${coachId}`
      );

      setCoach(data.data);
      console.log("data", data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      salary: salaryRef.current.value,
      shiftFrom: shiftFromRef.current.value,
      shiftTo: shiftToRef.current.value,
      about: aboutRef.current.value,
      qualification: qualificationsRef.current.value,
      speciality: specialityRef.current.value,
    };

    console.log(data);

    try {
      await axiosPrivate.patch(`/gyms/${gymId}/coaches/${coachId}`, data);
      toast.success(t("Coach updated successfully"));
      navigate("/coaches");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/gyms/${gymId}/coaches/${coachId}`);
      toast.success(t("Coach deleted successfully"));
      navigate("/coaches");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="m-2">
      <Heading content={t("Coach Profile")} />
      <form action="">
        <div className="mainContentOfCoach ">
          <div className="imageAndsave bigCard d-flex justify-content-center align-items-center flex-column">
            <div className="coachImage ">
              <img
                src={coach?.user?.image || defaultt}
                className="logoLarge"
                alt="Coach"
              />
            </div>
            <div className="saveAndDelete d-flex flex-column w-75 gap-2">
              <button className="SecondaryButton w-100" onClick={handleSave}>
                {t("Save")}
              </button>
              <button
                className="DangerButton w-100"
                type="button"
                onClick={() => {
                  handleDelete();
                }}
              >
                {t("Delete")}
              </button>
            </div>
          </div>
          <div className="coachData w-100 bigCard flex-grow-1">
            <div className="inputsInCoachProfile">
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("First Name")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Coach Name")}
                    defaultValue={coach?.name}
                    ref={nameRef}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Profile Name")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Profile Name")}
                    defaultValue={coach?.user?.name}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Email")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="email"
                    placeholder={t("Email")}
                    name="email"
                    defaultValue={coach?.user?.email}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Phone Number")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Phone Number")}
                    name="phoneNumber"
                    defaultValue={coach?.user?.phone}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Date of Birth")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="date"
                    placeholder={t("Date of Birth")}
                    name="dateOfBirth"
                    defaultValue={coach?.user?.birthDate.split("T")[0]}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("City")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("City")}
                    name="city"
                    defaultValue={"Cairo"}
                    disabled
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <div className="flexcenterbetween gap-2">
                  <FloatingLabel
                    controlId="floatingInput"
                    label={t("Shift From")}
                    id={"floatingInput"}
                  >
                    <Form.Control
                      type="time"
                      placeholder={t("Shift")}
                      name="shiftFrom"
                      defaultValue={coach?.shiftFrom}
                      ref={shiftFromRef}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label={t("Shift To")}
                    id={"floatingInput"}
                  >
                    <Form.Control
                      type="time"
                      placeholder={t("Shift")}
                      defaultValue={coach?.shiftTo}
                      ref={shiftToRef}
                    />
                  </FloatingLabel>
                </div>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label={t("Salary")}
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder={t("Salary")}
                    name="salary"
                    defaultValue={coach?.salary}
                    ref={salaryRef}
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="coachDetails my-3 bigCard">
        <div className="about my-1">
          <FloatingLabel
            controlId="floatingInput"
            label={t("About")}
            id={"floatingInput"}
          >
            <Form.Control
              type="text"
              placeholder={t("About")}
              name="about"
              defaultValue={coach?.about}
              ref={aboutRef}
            />
          </FloatingLabel>
        </div>
        <div className="qualifications my-1">
          <FloatingLabel
            controlId="floatingInput"
            label={t("Qualifications")}
            id={"floatingInput"}
          >
            <Form.Control
              type="text"
              placeholder={t("Qualifications")}
              name="qualifications"
              defaultValue={coach?.qualification}
              ref={qualificationsRef}
            />
          </FloatingLabel>
        </div>
        <div className="specialities my-1">
          <FloatingLabel
            controlId="floatingInput"
            label={t("Specialities")}
            id={"floatingInput"}
          >
            <Form.Control
              type="text"
              placeholder={t("Specialities")}
              name="specialities"
              defaultValue={coach?.speciality}
              ref={specialityRef}
            />
          </FloatingLabel>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
