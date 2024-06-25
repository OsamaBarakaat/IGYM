import React from "react";
import "./Subscreption.css";
import avatar from "../../assetss/default/5856.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import { GiMetalDisc, GiOldKing, GiSilverBullet } from "react-icons/gi";
import { PiLampThin, PiMetaLogo } from "react-icons/pi";
import { CoinsIcon } from "lucide-react";

const Subscreption = () => {
  const plansOfOwner = [
    {
      name: "Silver",
      price: "$100",
      capacity: "100 member capacity",
      icon: <GiSilverBullet size={40} color="white" />,
      current: false,
    },
    {
      name: "Gold",
      price: "$200",
      capacity: "200 member capacity",
      icon: <CoinsIcon size={40} color="gold" />,
      current: true,
      dayesLeft: 78,
      totalDayes: 90,
    },
    {
      name: "Platinum",
      price: "$300",
      capacity: "300 member capacity",
      icon: <GiMetalDisc size={40} color="#ac0785" />,
      current: false,
    },
  ];
  return (
    <div className="subscreption mx-3" style={{ minHeight: "100vh" }}>
      <div className="bigCard p-2 w-100 rounded-2 d-flex justify-content-start align-items-center">
        <div className="logo-small">
          <img src={avatar} alt="default" />
        </div>
        <span>Gym Owner</span>
      </div>
      <div className="plansOfOwner">
        {plansOfOwner.map((plan, index) => {
          return (
            <div className="bigCard ppoo">
              {plan.current && <div className="currentAbs">Current</div>}
              <div className="planName fontMid">{plan.name}</div>
              <div className="price fontLarge">{plan.price}</div>
              {plan.current ? (
                <div className="plansOfOwenrBody">
                  <div className="uncrowdedProgressbar">
                    <CircularProgressbar
                      value={(plan.dayesLeft / plan.totalDayes) * 100}
                      text={`${plan.dayesLeft} / ${plan.totalDayes}`}
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
                    <div className="icon">{plan.icon}</div>
                    <div className="daysLeft fontMid">90 days</div>
                  </div>
                </div>
              )}
              <div className="capacity fontMid">{plan.capacity}</div>
              <hr />
              <div className="d-flex justify-content-center align-items-center">
                {plan.current ? (
                  <button className="SecondaryButton">Renew</button>
                ) : (
                  <button className="SecondaryButton">Upgrade</button>
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
