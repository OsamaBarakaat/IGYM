import React, { useRef, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import { FloatingLabel, Form } from "react-bootstrap";
import "./AddNewRole.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddNewRole = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { gymId } = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  const nameInputRef = useRef();

  const items = [
    { id: "HOME", name: "Home", icon: "🏠" },
    { id: "TRAINEES", name: "Trainees", icon: "👥" },
    { id: "COACHES", name: "Coaches", icon: "🏋️‍♂️" },
    { id: "PLANS", name: "Plans", icon: "📋" },
    { id: "CLASSES", name: "Classes", icon: "🏃‍♂️" },
    { id: "NOTIFICATIONS", name: "Notifications", icon: "🔔" },
    { id: "GYM_INFO", name: "Gym Info", icon: "📊" },
    { id: "MEMBERS", name: "Members", icon: "👤" },
  ];

  const handleItemClick = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, item]
    );
  };
  console.log(selectedItems);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const permissions = selectedItems.map((item) => item.id);

    if (!name || !permissions.length) {
      toast.error("Please fill name and select permissions");
      return;
    }
    try {
      const { data } = await axiosPrivate.post(`/gyms/${gymId}/roles`, {
        name,
        permissions,
      });
      console.log(data);
      if (data) {
        toast.success("Role added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Heading content={"Add New Role"} />
      <div className="main-content">
        <div className="form bigCard">
          <form onSubmit={handleSubmit}>
            <div className="w-100">
              <FloatingLabel
                controlId="floatingInput"
                label="Role Name"
                id={"floatingInput"}
                className="mb-3"
              >
                <Form.Control
                  ref={nameInputRef}
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
                      selectedItems.some((selected) => selected.id === item.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="icon">{item.icon}</div>
                    <p>{item.name}</p>
                    {selectedItems.some(
                      (selected) => selected.id === item.id
                    ) && <div className="check-mark">✔️</div>}
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
