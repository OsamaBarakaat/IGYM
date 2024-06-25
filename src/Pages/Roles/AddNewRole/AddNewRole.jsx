import React, { useState } from "react";
import Heading from "../../../components/Heading/Heading";
import { FloatingLabel, Form } from "react-bootstrap";
import "./AddNewRole.css";

const AddNewRole = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    { id: 1, name: "Home", icon: "🏠" },
    { id: 2, name: "Trainees", icon: "👥" },
    { id: 3, name: "Coaches", icon: "🏋️‍♂️" },
    { id: 4, name: "Plans", icon: "📋" },
    { id: 5, name: "Classes", icon: "🏃‍♂️" },
    { id: 6, name: "Subscreptions", icon: "🧮" },
    { id: 7, name: "Notifications", icon: "🔔" },
    { id: 8, name: "Settings", icon: "📊" },
    { id: 9, name: "Profile", icon: "👤" },
  ];
  const handleItemClick = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <div>
      <Heading content={"Add New Role"} />
      <div className="main-content">
        <div className="form bigCard">
          <form>
            <div className="w-100">
              <FloatingLabel
                controlId="floatingInput"
                label="Role Name"
                id={"floatingInput"}
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="role name"
                  name="roleName"
                />
              </FloatingLabel>
            </div>
            <div className="w-100">
              <label htmlFor="roleIncludes">Role Includes:</label>
              <div className="role-selection">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`role-item ${
                      selectedItems.includes(item.id) ? "selected" : ""
                    }`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <div className="icon">{item.icon}</div>
                    <p>{item.name}</p>
                    {selectedItems.includes(item.id) && (
                      <div className="check-mark">✔️</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-100">
              <button type="submit" className="SecondaryButton">
                Add Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewRole;
