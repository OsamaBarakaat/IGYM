import React, { useEffect, useState } from "react";
import "./Subscreption.css";
import avatar from "../../assetss/default/5856.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import { GiOldKing } from "react-icons/gi";
import { privateAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Subscreption = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState([]);
  const { plan: myPlan } = useSelector((state) => state.user);

  const fetchPlans = async () => {
    try {
      const { data } = await privateAxiosInstance.get("/owner-plans");
      setPlans(data.data.documents);
      console.log("plans", data.data.documents);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  function calculateDaysFromJoinDate(joinDate) {
    const joinDateObj = new Date(joinDate);
    const currentDate = new Date();
    const differenceInTime = currentDate - joinDateObj;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="subscreption mx-3" style={{ minHeight: "100vh" }}>
      <div className="bigCard p-2 w-100 rounded-2 d-flex justify-content-start align-items-center">
        <div className="logo-small">
          <img src={avatar} alt="default" />
        </div>
        <span>{t("Gym Owner")}</span>
      </div>
      <div className="plansOfOwner">
        {plans.map((plan, index) => {
          return (
            <div className="bigCard ppoo">
              {plan._id === myPlan.id && (
                <div className="currentAbs">{t("Current")}</div>
              )}
              <div className="planName fontMid">{plan.name}</div>
              <div className="price fontLarge">{plan.cost}</div>
              {plan._id === myPlan.id &&
              new Date(myPlan.expireAt) > new Date() ? (
                <div className="plansOfOwenrBody">
                  <div className="uncrowdedProgressbar">
                    <CircularProgressbar
                      value={
                        (calculateDaysFromJoinDate(myPlan.joinDate) /
                          (plan.duration * 30)) *
                        100
                      }
                      text={`${calculateDaysFromJoinDate(myPlan.joinDate)} / ${
                        plan.duration * 30
                      }`}
                      styles={{
                        path: { stroke: "#396AFF", strokeWidth: 5 },
                        text: { fill: "#396AFF" },
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="plansOfOwenrBody">
                  <div
                    className="otherPlan d-flex justify-content-center align-items-center flex-column gap-2"
                    style={{
                      backgroundColor:
                        plan.name === "Gold"
                          ? "#f8ffbd"
                          : plan.name === "Platinum"
                          ? "#b3ebfc"
                          : "#C0C0C0",
                      color: "black",
                    }}
                  >
                    <div className="icon">
                      <GiOldKing />
                    </div>
                    <div className="daysLeft fontMid">
                      {plan.duration * 30} {t("Days")}
                    </div>
                  </div>
                </div>
              )}
              <div className="capacity fontMid">
                {t("up to")} {plan.maxTrainees} {t("Traineess")}
              </div>
              <hr />
              <div className="d-flex justify-content-center align-items-center">
                {plan._id === myPlan.id ? (
                  <a
                    href="https://gym-lp.vercel.app/#pricing"
                    target="_blank"
                    className="SecondaryButton text-decoration-none"
                  >
                    {t("Renew")}
                  </a>
                ) : (
                  <a
                    href="https://gym-lp.vercel.app/#pricing"
                    target="_blank"
                    className="SecondaryButton text-decoration-none"
                  >
                    {t("Upgrade")}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscreption;
