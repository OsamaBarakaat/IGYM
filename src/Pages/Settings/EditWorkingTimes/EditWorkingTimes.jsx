import React, { useEffect, useState } from "react";
import "./EditWorkingTimes.css";
import Heading from "../../../components/Heading/Heading";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance, { privateAxiosInstance } from "../../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditWorkingTimes = () => {
  const { t } = useTranslation();
  const [workingDays, setWorkingDays] = useState({
    friday: null,
    saturday: null,
    sunday: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
  });
  const { gymId } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const days = [
    "friday",
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
  ];

  const handleChange = (e, day) => {
    const { name, value } = e.target;
    console.log(name, value);
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [name]: value,
      },
    }));
  };

  const handleCloseDay = (day) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: null,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("Form submitted:", workingDays);

    e.preventDefault();
    try {
      const response = await privateAxiosInstance.put(`/gyms/${gymId}/branch`, {
        workingTimes: workingDays,
      });

      console.log("data", response.data);
      toast.success(t("Working times updated successfully"));
      navigate("/settings");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchGymInfo = async () => {
    try {
      const response = await axiosInstance.get(`/gyms/${gymId}`);
      console.log("gymInfo", response.data.data.branchInfo.workingTimes);
      setWorkingDays(response.data.data.branchInfo.workingTimes);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGymInfo();
  }, []);

  function changeName(name) {
    if (name === "friday") return t("Friday");
    if (name === "saturday") return t("Saturday");
    if (name === "sunday") return t("Sunday");
    if (name === "monday") return t("Monday");
    if (name === "tuesday") return t("Tuesday");
    if (name === "wednesday") return t("Wednesday");
    if (name === "thursday") return t("Thursday");
  }
  return (
    <div>
      <Heading content={t("Edit Working Times")} />
      <div className="bigCard">
        <form onSubmit={handleSubmit}>
          {days.map((day) => (
            <div key={day} className="day-container">
              <label
                className="w-100 text-capitalize d-flex align-items-center justify-content-between"
                htmlFor={day.toLowerCase()}
              >
                {changeName(day)}
                <Button variant="danger" onClick={() => handleCloseDay(day)}>
                  {t("Close the day")}
                </Button>
              </label>
              <div className="flexcenterbetween midCol gap-2">
                <div className="w-100">
                  <FloatingLabel
                    controlId={`opening-${day}`}
                    label={t("Opening")}
                    className="floating-label"
                  >
                    <Form.Control
                      type="time"
                      className="text-small"
                      placeholder={t("Opening")}
                      name="opening"
                      value={workingDays[day]?.opening || ""}
                      onChange={(e) => handleChange(e, day)}
                    />
                  </FloatingLabel>
                </div>
                <div className="w-100">
                  <FloatingLabel
                    controlId={`closing-${day}`}
                    label={t("Closing")}
                    className="floating-label"
                  >
                    <Form.Control
                      type="time"
                      placeholder={t("Closing")}
                      className="text-small"
                      name="closing"
                      value={workingDays[day]?.closing || ""}
                      onChange={(e) => handleChange(e, day)}
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
                        {t("Peak Hours")}
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
                      placeholder={t("Peak Hours")}
                      className="text-small"
                      name="peak"
                      value={workingDays[day]?.peak || ""}
                      onChange={(e) => handleChange(e, day)}
                    />
                  </FloatingLabel>
                </div>
                <div className="w-100">
                  <FloatingLabel
                    controlId={`female-${day}`}
                    label={
                      <div className="label-with-icon">
                        {t("Female Hours")}
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
                      className="text-small"
                      name="female"
                      value={workingDays[day]?.female || ""}
                      onChange={(e) => handleChange(e, day)}
                    />
                  </FloatingLabel>
                </div>
              </div>
            </div>
          ))}
          <Button type="submit" className="w-100">
            {t("Save")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditWorkingTimes;
