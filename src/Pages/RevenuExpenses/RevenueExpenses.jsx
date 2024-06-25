import React, { useState } from "react";
import { Modal, Button, Tab, Tabs, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { FaDollarSign, FaHandHoldingUsd } from "react-icons/fa";
import "./RevenueExpenses.css";

const dummyData = {
  income: [
    { description: "Service Sale", date: "28 Jan, 12.30 AM", amount: "$3,000" },
    { description: "Product Sale", date: "25 Jan, 10.40 PM", amount: "$700" },
  ],
  expenses: [
    { description: "Staff Salary", date: "28 Jan, 12.30 AM", amount: "$2,500" },
    {
      description: "Maintenance Service",
      date: "15 Jan, 03.29 PM",
      amount: "$1,050",
    },
  ],
};

const RevenueExpenses = () => {
  const [revenue, setRevenue] = useState(dummyData.income);
  const [expenses, setExpenses] = useState(dummyData.expenses);
  const [showModal, setShowModal] = useState(false);
  const [isRevenueModal, setIsRevenueModal] = useState(true);
  const [key, setKey] = useState("all");

  const handleShowModal = (isRevenue) => {
    setIsRevenueModal(isRevenue);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const addTransaction = (e) => {
    e.preventDefault();
    const { description, amount } = e.target.elements;
    const newTransaction = {
      description: description.value,
      date: new Date().toDateString(),
      amount: amount.value,
    };
    if (isRevenueModal) {
      setRevenue([...revenue, newTransaction]);
    } else {
      setExpenses([...expenses, newTransaction]);
    }
    handleCloseModal();
  };

  const data = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "My Expense",
        data: [1200, 1500, 800, 1700, 12500, 600],
        backgroundColor: "#396AFF",
        borderColor: "#396AFF",
        hoverBackgroundColor: "#E7EDFF",
        hoverBorderColor: "#FF82AC",
        borderWidth: 2,
        borderRadius: 10,
        pointStyle: "star",
      },
    ],
  };

  return (
    <div className="m-4">
      <div className="contOfCardsAndChart mb-4">
        <div className="CardsOfContOne mb-4">
          <div
            className="bigCard adadada w-100 h-100 cursor-pointer"
            onClick={() => handleShowModal(true)}
          >
            <h5 className="card-title d-flex justify-content-start mb-3">
              Income
            </h5>
            <div className="card-body d-flex justify-content-center align-items-center flex-column h-75">
              <div className="roundeddd roundeddd-one">
                <FaHandHoldingUsd size={40} className="mb-2" color="#396AFF" />
              </div>

              <h4 className="mt-3">$3,700</h4>
            </div>
          </div>
        </div>
        <div className="CardsOfContTwo mb-4">
          <div
            className=" bigCard sdsdsdsd w-100 h-100 cursor-pointer"
            onClick={() => handleShowModal(false)}
          >
            <h5 className="card-title d-flex justify-content-start mb-3">
              Expense
            </h5>
            <div className="card-body d-flex justify-content-center align-items-center flex-column h-75">
              <div className="roundeddd roundeddd-two">
                <FaDollarSign size={40} className="mb-2" color="#FF82AC" />
              </div>

              <h4 className="mt-3">$1,260</h4>
            </div>
          </div>
        </div>
        <div className="ChartOfCont mb-4">
          <div className="bigCard chartRevenueExpenses  w-100 h-100">
            <Bar data={data} />
          </div>
        </div>
      </div>

      <p className="fontMid main-text-color">Recent Transactions</p>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="transaction-tabs"
        className="mb-3 "
      >
        <Tab eventKey="all" title="All Transactions">
          <TransactionTable data={[...revenue, ...expenses]} />
        </Tab>
        <Tab eventKey="income" title="Income">
          <TransactionTable data={revenue} />
        </Tab>
        <Tab eventKey="expenses" title="Expenses">
          <TransactionTable data={expenses} />
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isRevenueModal ? "Add Revenue" : "Add Expense"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addTransaction}>
            <div className="form-group">
              <label>Description</label>
              <input
                name="description"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                name="amount"
                type="text"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const TransactionTable = ({ data }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Description</th>
        <th>Date</th>
        <th>Amount</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((transaction, index) => (
        <tr>
          <td>{transaction.description}</td>
          <td>{transaction.date}</td>
          <td>{transaction.amount}</td>
          <td className="d-flex justify-content-center align-items-center">
            <Button variant="danger">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </span>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default RevenueExpenses;
