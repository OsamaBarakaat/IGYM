import React from "react";
import "./EditWorkingTimes.css";
import Heading from "../../../components/Heading/Heading";
import { FloatingLabel, Form } from "react-bootstrap";

const EditWorkingTimes = () => {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <div>
      <Heading content={"Edit Working Times"} />
      <div className="bigCard">
        <form>
          {days.map((day) => (
            <div key={day} className="day-container">
              <label htmlFor={day.toLowerCase()}>{day}</label>
              <div className="flexcenterbetween midCol gap-2">
                <div className="w-100">
                  <FloatingLabel
                    controlId={`opening-${day}`}
                    label="Opening"
                    className="floating-label"
                  >
                    <Form.Control
                      type="time"
                      placeholder="Opening"
                      name="opening"
                    />
                  </FloatingLabel>
                </div>
                <div className="w-100">
                  <FloatingLabel
                    controlId={`closing-${day}`}
                    label="Closing"
                    className="floating-label"
                  >
                    <Form.Control
                      type="time"
                      placeholder="Closing"
                      name="closing"
                    />
                  </FloatingLabel>
                </div>
              </div>
              <div className="flexcenterbetween midCol gap-2">
                <div className="w-100">
                  <FloatingLabel
                    controlId={`peake-${day}`}
                    label={
                      <div className="label-with-icon">
                        Peak Hours
                        <svg
                          color="red"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-fire"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                        </svg>
                      </div>
                    }
                    className="floating-label"
                  >
                    <Form.Control
                      type="time"
                      placeholder="Peak Hours"
                      name="peakeHours"
                    />
                  </FloatingLabel>
                </div>
                <div className="w-100">
                  <FloatingLabel
                    controlId={`female-${day}`}
                    label={
                      <div className="label-with-icon">
                        Female Hours
                        <svg
                          stroke="pink"
                          strokeWidth={1.5}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-gender-female"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"
                          />
                        </svg>
                      </div>
                    }
                    className="floating-label"
                  >
                    <Form.Control
                      type="time"
                      placeholder="Female Hours"
                      name="femaleHours"
                    />
                  </FloatingLabel>
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default EditWorkingTimes;
