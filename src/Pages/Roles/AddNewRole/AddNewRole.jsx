import React, { useRef, useState } from "react";
import Heading from "../../../components/Heading/Heading";
import { FloatingLabel, Form } from "react-bootstrap";
import "./AddNewRole.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddNewRole = () => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
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
    { id: "STAFF", name: t("Staff"), icon: "👤" },
    { id: "FINANCIAL", name: t("Financial"), icon: "💵" },
    { id: "UPCOMINGPAYEMENTS", name: t("UpcomingPayemnt"), icon: "💱" },
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
      toast.error(t("Please fill name and select permissions"));
      return;
    }
    try {
      const { data } = await axiosPrivate.post(`/gyms/${gymId}/roles`, {
        name,
        permissions,
      });
      console.log(data);
      if (data) {
        toast.success(t("Role added successfully"));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Heading content={t("Add New Role")} />
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
                {t("Add Role")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewRole;
