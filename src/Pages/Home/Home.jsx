import React from "react";
import "./Home.css";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import sourceData from "../../data/data.json";
import revenue from "../../data/revenue.json";
import Heading from "../../components/Heading/Heading";
import avatar from "../../assetss/default/5856.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import { date } from "yup";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const percentage = 23;
  const upcomingPayments = [
    {
      id: 1,
      name: "Emilli Willson",
      amount: "$ 1,200",
      date: "12/06/2021",
    },
    {
      id: 2,
      name: "Emilli Willson",
      amount: "$ 100",
      date: "15/06/2021",
    },
    {
      id: 3,
      name: "Emilli Willson",
      amount: "$ 50",
      date: "18/06/2021",
    },
    {
      id: 4,
      name: "Emilli Willson",
      amount: "$ 70",
      date: "20/06/2021",
    },
    {
      id: 5,
      name: "Emilli Willson",
      amount: "$ 30",
      date: "22/06/2021",
    },
  ];

  const checkIn = [
    {
      id: 1,
      name: "Emilli Willson",
      date: "12/06/2021",
      expirationDate: "12/06/2022",
    },
    {
      id: 2,
      name: "Emilli Willson",
      date: "15/06/2021",
      expirationDate: "15/06/2022",
    },
    {
      id: 3,
      name: "Emilli Willson",
      date: "18/06/2021",
      expirationDate: "18/06/2022",
    },
    {
      id: 4,
      name: "Emilli Willson",
      date: "20/06/2021",
      expirationDate: "20/06/2022",
    },
    {
      id: 5,
      name: "Emilli Willson",
      date: "22/06/2021",
      expirationDate: "22/06/2022",
    },
  ];
  return (
    <div className="Home">
      <Heading content="Home" />
      <div className="m-4 upperPart">
        <div className="card-home card-one">
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-piggy-bank-fill"
              viewBox="0 0 16 16"
              strokeWidth={2}
            >
              <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595m7.173 3.876a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199m-8.999-.65a.5.5 0 1 1-.276-.96A7.6 7.6 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.6 6.6 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0" />
            </svg>
          </div>
          <div className="card-body">
            <p className="card-title">My Balance</p>
            <p className="card-details">$ 38,988</p>
          </div>
        </div>
        <div
          className="card-home card-two"
          onClick={() => {
            navigate("/revenueexpenses");
          }}
        >
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-wallet"
              viewBox="0 0 16 16"
            >
              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1" />
            </svg>
          </div>
          <div className="card-body">
            <p className="card-title">Revenue</p>
            <p className="card-details">$ 3,700</p>
          </div>
        </div>
        <div
          className="card-home card-three"
          onClick={() => {
            navigate("/revenueexpenses");
          }}
        >
          <div className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cash-stack"
              viewBox="0 0 16 16"
            >
              <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
            </svg>
          </div>
          <div className="card-body">
            <p className="card-title">Expenses</p>
            <p className="card-details">$ 1,288</p>
          </div>
        </div>
        <div className="upcomingPayments">
          <div className="upcomingPaymentsTitle">
            <p>Upcoming Payments</p>
          </div>
          <div className="upcomingPaymentsBody">
            {upcomingPayments.map((item) => (
              <div className="upcomingPaymentsItem" key={item.id}>
                <div className="upcomingPaymentsItemImg">
                  <img src={avatar} alt="userImg" className="w-10" />
                </div>
                <div className="upcomingPaymentsItemBody">
                  <p>{item.name}</p>
                  <p>{item.date}</p>
                </div>
                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dountChart ">
          <Doughnut
            data={{
              labels: [
                "Expert Plan",
                "Advanced Plan",
                "Master Plan",
                "Starter Plan",
              ],
              datasets: [
                {
                  label: "count",
                  data: [100, 200, 300, 250],
                  backgroundColor: ["#396AFF", "#FF82AC", "#16DBCC", "#FFBB38"],
                  hoverBackgroundColor: "rgba(55, 55, 55, 0.786)",
                  hoverBorderColor: "#396AFF",
                  borderWidth: 2,
                  borderColor: "#fff",
                },
              ],
            }}
          />
        </div>
        <div className="uncrowded">
          <p className="upcomingPaymentsTitle">Gym Status</p>
          <div className="uncrowdedProgress">
            <div className="uncrowdedProgressbar">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  path: { stroke: "#396AFF", strokeWidth: 8 },
                  text: { fill: "#396AFF" },
                }}
              />
            </div>
            <div className="text-center opacity-75">
              <h3>Un-Crowded</h3>
              <p>now is the best time to go and enjoy your exercise</p>
            </div>
          </div>
          <div className="flexcenteraround">
            <div className="upcomingPaymentsItemImg">
              <img src={avatar} className="w-10" alt="img" />
            </div>
            <div className="upcomingPaymentsItemImg">
              <img src={avatar} className="w-10" alt="img" />
            </div>
            <div className="upcomingPaymentsItemImg">
              <img src={avatar} className="w-10" alt="img" />
            </div>
            <div className="upcomingPaymentsItemImg">
              <img src={avatar} className="w-10" alt="img" />
            </div>
            <div className="upcomingPaymentsItemImg">
              <img src={avatar} className="w-10" alt="img" />
            </div>
            <div className="upcomingPaymentsItemImg">
              <img src={avatar} className="w-10" alt="img" />
            </div>
          </div>
        </div>
      </div>
      <div className="downPart">
        <div className="monthlyTrafic">
          <div className="flexcenterbetween opacity-75">
            <p>Weekly Trafic</p>
            <p className="primary-color">+2.45%</p>
          </div>
          <Bar
            data={{
              labels: sourceData.map((item) => item.label),
              datasets: [
                {
                  label: "Weekly Trafic",
                  data: sourceData.map((item) => item.sales),
                  backgroundColor: "#396AFF",
                  borderColor: "#396AFF",
                  hoverBackgroundColor: "#E7EDFF",
                  hoverBorderColor: "#FF82AC",
                  borderWidth: 2,
                  borderRadius: 10,
                  pointStyle: "star",
                },
              ],
            }}
          />
        </div>
        <div className="checkIn opacity-75">
          <p>check in</p>
          <div className="checkInBody">
            {checkIn.map((item) => {
              return (
                <div className="checkInRow">
                  <div className="upcomingPaymentsItemImg">
                    <img src={avatar} alt="img" className="w-10" />
                  </div>
                  <div>
                    <p>{item.name}</p>
                    <p className="opacity-75">{item.date}</p>
                  </div>
                  <div>
                    <p>Expiration Date</p>
                    <p className="opacity-75">{item.expirationDate}</p>
                  </div>

                  <div>
                    <button className="btn btn-primary">View</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
