import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import { FloatingLabel, Form } from "react-bootstrap";
import "./EditRole.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const EditRole = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [roleData, setRoleData] = useState(null);
  
  const { roleId } = useParams();
  
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
  const handleItemClick = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const fetchRole = async () => {
    try {
      const { data } = await axiosPrivate.get(`/gyms/${gymId}/roles/${roleId}`);
      setRoleData(data.data);
      setSelectedItems(data.data.permissions);
      console.log("roleData", data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.patch(
        `/gyms/${gymId}/roles/${roleId}`,
        {
          name: nameInputRef.current.value,
          permissions: selectedItems,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <div>
      <Heading content={"Edit Role"} />
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
                  defaultValue={roleData?.name}
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
                Edit Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
