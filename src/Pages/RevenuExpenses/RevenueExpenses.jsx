import React, { useState } from "react";
import {
  Modal,
  Button,
  Tab,
  Tabs,
  Table,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { FaDollarSign, FaHandHoldingUsd } from "react-icons/fa";
import "./RevenueExpenses.css";
import { Plus, Trash2Icon } from "lucide-react";

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
  const [showModalRevenue, setShowModalRevenue] = useState(false);
  const [showModalExpense, setShowModalExpense] = useState(false);
  const [isRevenueModal, setIsRevenueModal] = useState(true);
  const [key, setKey] = useState("all");

  const handleShowModalRevenue = () => {
    setShowModalRevenue(true);
  };
  const handleShowModalExpense = () => {
    setShowModalExpense(true);
  };
  const handleCloseModalRevenue = () => setShowModalRevenue(false);
  const handleCloseModalExpense = () => setShowModalExpense(false);

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
      handleCloseModalRevenue();
    } else {
      setExpenses([...expenses, newTransaction]);
      handleCloseModalExpense();
    }
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

  const expenseTitles = ["Rent", "Food", "Maintenance", "Bill", "Other"];

  const [selectedCards, setSelectedCards] = useState([]);
  const [formData, setFormData] = useState(
    expenseTitles.reduce(
      (acc, title) => {
        acc[title] = { cost: "", rebete: "" };
        return acc;
      },
      { extra: { title: "", cost: "", rebete: "" } }
    )
  );

  const handleCardClick = (card) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(card)
        ? prevSelected.filter((selectedCard) => selectedCard !== card)
        : [...prevSelected, card]
    );
  };

  const handleInputChange = (e, card) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [card]: { ...prevData[card], [name]: value },
    }));
  };

  const handleAddClick = () => {
    const filledCards = Object.keys(formData)
      .filter(
        (card) =>
          formData[card].title || formData[card].cost || formData[card].rebete
      )
      .map((card) => ({ card, ...formData[card] }));
  };

  return (
    <div className="m-4">
      <div className="contOfCardsAndChart mb-4">
        <div className="CardsOfContOne mb-4">
          <div
            className="bigCard adadada w-100 h-100 cursor-pointer"
            onClick={() => handleShowModalRevenue(true)}
          >
            <h5 className="card-title d-flex justify-content-start mb-3">
              Income
            </h5>
            <div className="card-body d-flex justify-content-center align-items-center flex-column h-75">
              <div className="roundeddd roundeddd-one plusHidden">
                <FaHandHoldingUsd size={40} className="mb-2" color="#396AFF" />
              </div>
              <div className="roundeddd roundeddd-one hiddenPlus">
                <Plus size={40} className="mb-2" color="#396AFF" />
              </div>

              <h4 className="mt-3">$3,700</h4>
            </div>
          </div>
        </div>
        <div className="CardsOfContTwo mb-4">
          <div
            className=" bigCard sdsdsdsd w-100 h-100 cursor-pointer"
            onClick={() => handleShowModalExpense(true)}
          >
            <h5 className="card-title d-flex justify-content-start mb-3">
              Expense
            </h5>
            <div className="card-body d-flex justify-content-center align-items-center flex-column h-75">
              <div className="roundeddd roundeddd-two plusHiddenTwo">
                <FaDollarSign size={40} className="mb-2" color="#FF82AC" />
              </div>
              <div className="roundeddd roundeddd-one hiddenPlusTwo">
                <Plus size={40} className="mb-2" color="#FF82AC" />
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

      <Modal show={showModalRevenue} onHide={handleCloseModalRevenue} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cardsInRevenue">
            {Object.keys(formData).map((card, index) => (
              <div
                key={index}
                className={`card ${
                  selectedCards.includes(card) ? "selected" : ""
                }`}
                onClick={() => handleCardClick(card)}
              >
                <div className="cardHead">
                  <div className="flexcentercenter">
                    <div className="cardHeadRounded">
                      <FaHandHoldingUsd
                        size={40}
                        className="mb-2"
                        color="#396AFF"
                      />
                    </div>
                  </div>
                </div>
                <div className="cardBody">
                  <div className="w-100 mb-3">
                    <FloatingLabel
                      controlId={`floatingInput${index}`}
                      label="Title"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData[card].title}
                        onChange={(e) => handleInputChange(e, card)}
                      />
                    </FloatingLabel>
                  </div>
                  <div className="w-100 mb-3">
                    <FloatingLabel
                      controlId={`floatingCost${index}`}
                      label="Cost"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Cost"
                        name="cost"
                        value={formData[card].cost}
                        onChange={(e) => handleInputChange(e, card)}
                      />
                    </FloatingLabel>
                  </div>
                  <FloatingLabel
                    controlId={`floatingRebate${index}`}
                    label="Rebate"
                    className="mt-3"
                  >
                    <Form.Select
                      placeholder="Rebate"
                      name="rebate"
                      value={formData[card].rebate}
                      onChange={(e) => handleInputChange(e, card)}
                    >
                      <option value="" disabled selected>
                        Select Rebate
                      </option>
                      <option value={"daily"}>Daily</option>
                      <option value={"Weekly"}>Weekly</option>
                      <option value={"monthly"}>Monthly</option>
                      <option value={""}>No Rebate</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="my-2">
          <Button variant="secondary" onClick={handleCloseModalRevenue}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddClick}>
            Add Income
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalExpense} onHide={handleCloseModalExpense} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cardsInRevenue">
            {Object.keys(formData).map((card, index) => (
              <div
                key={index}
                className={`card ${
                  selectedCards.includes(card) ? "selected" : ""
                }`}
                onClick={() => handleCardClick(card)}
              >
                <div className="cardHead">
                  <div className="flexcentercenter">
                    <div className="cardHeadRounded">
                      <FaDollarSign
                        size={40}
                        className="mb-2"
                        color="#FF82AC"
                      />
                    </div>
                  </div>
                </div>
                <div className="cardBody">
                  {card === "extra" ? (
                    <FloatingLabel
                      controlId={`floatingInput${index}`}
                      label="Title"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData[card].title}
                        onChange={(e) => handleInputChange(e, card)}
                      />
                    </FloatingLabel>
                  ) : (
                    <h5 className="card-title">{card}</h5>
                  )}
                  <FloatingLabel
                    controlId={`floatingCost${index}`}
                    label="Cost"
                    className="mt-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Cost"
                      name="cost"
                      value={formData[card].cost}
                      onChange={(e) => handleInputChange(e, card)}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId={`floatingRebate${index}`}
                    label="Rebate"
                    className="mt-3"
                  >
                    <Form.Select
                      placeholder="Rebate"
                      name="rebate"
                      value={formData[card].rebate}
                      onChange={(e) => handleInputChange(e, card)}
                    >
                      <option value="" disabled selected>
                        Select Rebate
                      </option>
                      <option value={"daily"}>Daily</option>
                      <option value={"Weekly"}>Weekly</option>
                      <option value={"monthly"}>Monthly</option>
                      <option value={""}>No Rebate</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="my-2">
          <Button variant="secondary" onClick={handleCloseModalExpense}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddClick}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const TransactionTable = ({ data }) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Description</th>
        <th>Date</th>
        <th>Amount</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item.description}</td>
          <td>{item.date}</td>
          <td>{item.amount}</td>
          <td className="d-flex justify-content-center">
            <Button variant="danger">
              <Trash2Icon size={20} />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default RevenueExpenses;
