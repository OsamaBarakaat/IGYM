import React, { useEffect, useState } from "react";
import "./History.css";
import { useTranslation } from "react-i18next";
import defaultt from "../../../assetss/default/5856.jpg";
import { useSelector } from "react-redux";
import { privateAxiosInstance } from "../../../api/axios";
import { toast } from "react-toastify";

const History = () => {
  const { t } = useTranslation();
  const [classesHistory, setClassesHistory] = useState([]);
  const { gymId } = useSelector((state) => state.user);

  const getClassesHistory = async () => {
    try {
      const { data } = await privateAxiosInstance.get(
        `gyms/${gymId}/bookings/classes-history`
      );
      setClassesHistory(data.data);
      console.log("classes", data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {getClassesHistory()},[]);

  const history = [
    {
      name: "Yoga",
      cost: 100,
      repeat: {
        day: 3,
        time: 17,
        type: "Daily",
      },
      duration: 20,
      plan: {
        name: "Basic",
      },
      coaches: [
        {
          name: "Mohamed",
          image: "",
        },
        {
          name: "Ahmed",
          image: "",
        },
      ],
      description: "aaa aaaaa  aa a  aaaa  aaaaaa aaa aaa aaa",
      features: [
        {
          name: "feature1",
          value: "value1",
        },
        {
          name: "feature2",
          value: "value2",
        },
      ],
    },
    {
      name: "Yoga",
      cost: 100,
      repeat: {
        day: 3,
        time: 17,
        type: "Daily",
      },
      duration: 20,
      plan: {
        name: "Basic",
      },
      coaches: [
        {
          name: "Mohamed",
          image: "",
        },
        {
          name: "Ahmed",
          image: "",
        },
      ],
      description: "aaa aaaaa  aa a  aaaa  aaaaaa aaa aaa aaa",
      features: [
        {
          name: "feature1",
          value: "value1",
        },
        {
          name: "feature2",
          value: "value2",
        },
      ],
    },
    {
      name: "Yoga",
      cost: 100,
      repeat: {
        day: 3,
        time: 17,
        type: "Weekly",
      },
      duration: 20,
      plan: {
        name: "Basic",
      },
      coaches: [
        {
          name: "Mohamed",
          image: "",
        },
        {
          name: "Ahmed",
          image: "",
        },
      ],
      description: "aaa aaaaa  aa a  aaaa  aaaaaa aaa aaa aaa",
      features: [
        {
          name: "feature1",
          value: "value1",
        },
        {
          name: "feature2",
          value: "value2",
        },
      ],
    },
  ];

  const calculateEndTime = (startTime, duration) => {
    return startTime + duration;
  };
  return (
    <div>
      <div className="myInfoContent m-2">
        <div className="plansOfMyGym">
          {classesHistory.map((classItem, index) => (
            <div key={index} className="plans-details small-100">
              <div className="flexcenterbetween my-2">
                <p className="fontMid">{classItem?.classData?.name}</p>
                <p>
                  <span className="fontMid">{classItem?.classData?.cost}</span>
                  <span>{t("/class")}</span>
                </p>
              </div>
              <p className="opacitySmall font-smaller d-flex justify-content-start align-items-center">
                <span className="mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-clock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                  </svg>
                </span>
                <span>{classItem?.start.split("T")[0]} - </span>
                {new Date(classItem?.start).toLocaleTimeString()}
              </p>
              <div className="flexcenterstart gap-2">
                <div className="repeat">
                  {classItem?.classData?.repeat?.type}
                </div>
                <div className="mins">
                  {classItem?.classData?.duration} mins
                </div>
                <div className="includedIn">
                  {classItem?.classData?.plan?.name}
                </div>
              </div>
              <p className="opacitySmall font-smaller my-2">{t("Coaches")}</p>
              <div className="flexcenterstart">
                {classItem?.classData?.coaches?.map((coach, index) => (
                  <div key={index} className="coach">
                    <div className="logo-extra-small flexcenterstart mx-1">
                      <img
                        src={coach.image || defaultt}
                        className="rounded-circle"
                        alt={coach.name}
                      />
                    </div>
                    <p className="font-smaller m-0">{coach?.name}</p>
                  </div>
                ))}
              </div>
              <p className="opacitySmall font-smaller my-2">
                {t("About Class")}
              </p>
              <p className="font-smaller">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chat-left-quote"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                  </svg>
                </span>{" "}
                {classItem?.classData?.description}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chat-right-quote"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                    <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                  </svg>
                </span>
              </p>
              <p className="opacitySmall font-smaller my-2">
                {t("Class Included")}
              </p>
              <div className="flexcenterstart flex-wrap">
                {classItem?.classData?.features?.map((feature, index) => {
                  return (
                    <div key={index} className=" m-1 p-1 flexcenterstart ">
                      <span className="spanSVGPrimary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-check2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                        </svg>
                      </span>
                      <span className="">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
