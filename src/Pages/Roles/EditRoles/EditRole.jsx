import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import { FloatingLabel, Form } from "react-bootstrap";
import "./EditRole.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const EditRole = () => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [roleData, setRoleData] = useState(null);

  const { roleId } = useParams();

  const { gymId } = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();
  const nameInputRef = useRef();

  const items = [
    { id: "HOME", name: t("Home"), icon: "🏠" },
    { id: "TRAINEES", name: t("Trainees"), icon: "👥" },
    { id: "COACHES", name: t("Coaches"), icon: "🏋️‍♂️" },
    { id: "PLANS", name: t("Plans"), icon: "📋" },
    { id: "CLASSES", name: t("Classes"), icon: "🏃‍♂️" },
    { id: "NOTIFICATIONS", name: t("Notifications"), icon: "🔔" },
    { id: "GYM_INFO", name: t("Gym Info"), icon: "📊" },
    { id: "MEMBERS", name: t("Members"), icon: "👤" },
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
      toast.success(t("Role updated successfully"));
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
      <Heading content={t("Edit Role")} />
      <div className="main-content">
        <div className="form bigCard">
          <form onSubmit={handleSubmit}>
            <div className="w-100">
              <FloatingLabel
                controlId="floatingInput"
                label={t("Role Name")}
                id={"floatingInput"}
                className="mb-3"
              >
                <Form.Control
                  ref={nameInputRef}
                  type="text"
                  placeholder={t("Role Name")}
                  name="roleName"
                  defaultValue={roleData?.name}
                />
              </FloatingLabel>
            </div>
            <div className="w-100">
              <label htmlFor="roleIncludes">{t("Role Includes:")}</label>
              <div className="role-selection">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`role-item text-center ${
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
                {t("Edit Role")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
