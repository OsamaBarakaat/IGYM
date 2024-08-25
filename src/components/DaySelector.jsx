import { FloatingLabel, Form } from "react-bootstrap";

const DaySelector = ({ selectedDay, onDayChange, repeatType }) => {
  let days = Array.from({ length: 31 }, (_, i) => i + 1);

  if (repeatType === "weekly") {
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  } else {
    days = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  return (
    <div className="w-100">
      <FloatingLabel
        controlId="floatingInput"
        label="Day"
        id="floatingInput"
        // id={
        //   addClass.errors.repeatType && addClass.touched.repeatType
        //     ? "floatingError"
        //     : "floatingInput"
        // }
      >
        <Form.Select
          name="repeatDay"
          value={selectedDay}
          onChange={onDayChange}
        >
          <option value="" disabled selected>
            select value
          </option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day.toString().padStart(2, "0")}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      {/* <small className="error-message">{addClass.errors.repeatType}</small> */}
    </div>
  );
};


 


export default DaySelector;
