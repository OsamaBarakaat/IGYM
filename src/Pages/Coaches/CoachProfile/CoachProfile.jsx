import React from "react";
import Heading from "../../../components/Heading/Heading";
import defaultt from "../../../assetss/default/5856.jpg";
import "./CoachProfile.css";
import { FloatingLabel, Form } from "react-bootstrap";

const CoachProfile = () => {
  return (
    <div className="m-2">
      <Heading content={"Coach Profile"} />
      <div className="mainContentOfCoach ">
        <div className="imageAndsave bigCard d-flex justify-content-center align-items-center flex-column">
          <div className="coachImage ">
            <img src={defaultt || ""} className="logoLarge" alt="Coach" />
          </div>
          <div className="saveAndDelete d-flex flex-column w-75 gap-2">
            <button className="SecondaryButton w-100">Save</button>
            <button className="DangerButton w-100">Delete</button>
          </div>
        </div>
        <div className="coachData w-100 bigCard flex-grow-1">
          <form action="">
            <div className="inputsInCoachProfile">
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name"
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    defaultValue={"Osama"}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Last Name"
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    defaultValue={"Barakat"}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    defaultValue={"charlenereed@gmail.com "}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    defaultValue={"(123) 456-7890"}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Date of Birth"
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    defaultValue={"2021-08-01"}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label="City"
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    defaultValue={"Cairo"}
                  />
                </FloatingLabel>
              </div>
              <div className="inputFeild">
                <div className="flexcenterbetween gap-2">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Shift From"
                    id={"floatingInput"}
                  >
                    <Form.Control
                      type="time"
                      placeholder="Shift"
                      name="shiftFrom"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Shift To"
                    id={"floatingInput"}
                  >
                    <Form.Control
                      type="time"
                      placeholder="Shift"
                      name="shiftTo"
                    />
                  </FloatingLabel>
                </div>
              </div>
              <div className="inputFeild">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Salary"
                  id={"floatingInput"}
                >
                  <Form.Control
                    type="text"
                    placeholder="Salary"
                    name="salary"
                    defaultValue={"5000"}
                  />
                </FloatingLabel>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="coachDetails my-3 bigCard">
        <div className="about my-1">
          <FloatingLabel
            controlId="floatingInput"
            label="About"
            id={"floatingInput"}
          >
            <Form.Control
              type="text"
              placeholder="About"
              name="about"
              defaultValue={
                "Great job on your consistent effort and positive attitude during our sessions. Your progress in [specific skill/aspect] is impressive. To optimize results, let's fine-tune [specific technique]."
              }
            />
          </FloatingLabel>
        </div>
        <div className="qualifications my-1">
          <FloatingLabel
            controlId="floatingInput"
            label="Qualifications"
            id={"floatingInput"}
          >
            <Form.Control
              type="text"
              placeholder="Qualifications"
              name="qualifications"
              defaultValue={
                "Certification from accredited coaching institution. Minimum 5 years of coaching experience. Ongoing professional development and education. Strong communication and interpersonal skills. Ongoing professional development and education"
              }
            />
          </FloatingLabel>
        </div>
        <div className="specialities my-1">
          <FloatingLabel
            controlId="floatingInput"
            label="Specialities"
            id={"floatingInput"}
          >
            <Form.Control
              type="text"
              placeholder="Specialities"
              name="specialities"
              defaultValue={
                "Strength and Conditioning Programs.Personalized Nutrition Guidance.Functional Movement Training.Sports-Specific Training. Mindfulness and Stress Management."
              }
            />
          </FloatingLabel>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
