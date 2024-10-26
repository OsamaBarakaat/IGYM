import React, { useEffect, useState } from "react";
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
import { Edit, Plus, Trash2Icon } from "lucide-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { all } from "axios";
import SmallLoader from "../../components/SmallLoader/SmallLoader";

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
  const [revenue, setRevenue] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [allTransactions, setAllTransaction] = useState([]);
  const [showModalRevenue, setShowModalRevenue] = useState(false);
  const [showModalExpense, setShowModalExpense] = useState(false);
  const [isRevenueModal, setIsRevenueModal] = useState(true);
  const [stats, setStats] = useState(null);
  const [key, setKey] = useState("all");

  const handleShowModalRevenue = () => {
    setShowModalRevenue(true);
  };
  const handleShowModalExpense = () => {
    setShowModalExpense(true);
  };
  const handleCloseModalRevenue = () => setShowModalRevenue(false);
  const handleCloseModalExpense = () => setShowModalExpense(false);
  const handleCloseModalEdit = () => setShowModalEdit(false);
  const axiosPrivate = useAxiosPrivate();
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "My Expense",
        data: stats?.monthlyExpenses,
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

  const expenseTitles = ["Rent", "Food", "Maintenance", "Bill"];

  const [selectedCards, setSelectedCards] = useState([]);
  const [formData, setFormData] = useState(
    expenseTitles.reduce(
      (acc, title) => {
        acc[title] = { cost: "" };
        return acc;
      },
      { extra: { title: "", cost: "" } }
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

  const handleAddClick = async (which) => {
    console.log(formData);
    try {
      // Map and format filledCards to match the API requirements
      const formattedCards = Object.keys(formData)
        .filter(
          (card) =>
            formData[card].title || formData[card].cost || formData[card].rebate
        )
        .map((card) => ({
          title: formData[card].title || card,
          amount: parseFloat(formData[card].cost),
          type: which, // 'income' or 'expense' based on 'which'
          repeat: {
            type: "daily",
            day: 1,
            time: "12:00",
          },
        }));

      console.log(formattedCards);

      // Determine the URL based on the 'which' parameter
      const url = `/gyms/${gymId}/transactions`;

      // Send the data to the server
      const response = await axiosPrivate.post(url, formattedCards);
      console.log("Response:", response.data);

      // Refetch the updated data
      await refetchTransactions();
      await refetchIncome();
      await refetchExpenses();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refetchTransactions = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/transactions?limit=200`
      );
      setAllTransaction(data?.data?.result?.documents); // Update your state with the fetched data
      setStats(data?.data?.stats);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const refetchIncome = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/transactions?type=income&limit=200`
      );
      setRevenue(data?.data?.result?.documents); // Update your state with the fetched data
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const refetchExpenses = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/transactions?type=expense&limit=200`
      );
      setExpenses(data?.data?.result?.documents); // Update your state with the fetched data
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const { gymId } = useSelector((state) => state.user);
  const [allTransactionsPagination, setAllTransactionsPagination] = useState();
  const [allIncomePagination, setAllIncomePagination] = useState();
  const [allExpensePagination, setAllExpensePagination] = useState();

  const pageArrAllTransactions = [];
  for (let i = 0; i < allTransactionsPagination?.numberOfPages; i++) {
    pageArrAllTransactions.push(i);
  }
  const pageArrAllIncome = [];
  for (let i = 0; i < allIncomePagination?.numberOfPages; i++) {
    pageArrAllIncome.push(i);
  }
  const pageArrAllExpense = [];
  for (let i = 0; i < allExpensePagination?.numberOfPages; i++) {
    pageArrAllExpense.push(i);
  }
  const [loading, setLoading] = useState(false);
  const fetchAllTransaction = async () => {
    setLoading(true);
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/transactions?limit=200`
      );

      setAllTransaction(data?.data?.result?.documents);
      setLoading(false);
      setAllTransactionsPagination(data?.data?.pagination);
      setStats(data?.data?.stats);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchAllIncome = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/transactions?type=income&limit=200`
      );

      setRevenue(data?.data?.result?.documents);
      setAllIncomePagination(data?.data?.pagination);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchAllExpense = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/transactions?type=expense&limit=200`
      );

      console.log("data sss", data.data);
      
      setExpenses(data?.data?.result?.documents);
      setAllExpensePagination(data?.data?.pagination);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(
        `/gyms/${gymId}/transactions/${id}`
      );
      toast.success(response.data.message);
      setAllTransaction((prev) => prev.filter((item) => item._id !== id));
      setRevenue((prev) => prev.filter((item) => item._id !== id));
      setExpenses((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchAllTransaction();
    fetchAllIncome();
    fetchAllExpense();
  }, []);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const handleEdit = async (item) => {
    console.log(item);
    setEditData(item);
    setShowModalEdit(true);
  };
  const handleEditSubmit = async (newData) => {
    try {
      const response = await axiosPrivate.patch(
        `/gyms/${gymId}/transactions/${newData._id}`,
        newData
      );
      toast.success(response.data.message);
      setAllTransaction((prev) =>
        prev.map((item) => (item._id === newData._id ? newData : item))
      );
      setRevenue((prev) =>
        prev.map((item) => (item._id === newData._id ? newData : item))
      );
      setExpenses((prev) =>
        prev.map((item) => (item._id === newData._id ? newData : item))
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
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

              <h4 className="mt-3">${stats?.income}</h4>
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

              <h4 className="mt-3">${stats?.expenses}</h4>
            </div>
          </div>
        </div>
        <div className="ChartOfCont mb-4">
          <div className="bigCard chartRevenueExpenses  w-100 h-100">
            <Bar data={data} />
          </div>
        </div>
      </div>

      {!loading ? (
        <>
          <p className="fontMid main-text-color">Recent Transactions</p>
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            id="transaction-tabs"
            className="mb-3"
          >
            <Tab eventKey="all" title="All Transactions">
              <TransactionTable
                data={allTransactions}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </Tab>
            <Tab eventKey="income" title="Income">
              <TransactionTable
                data={revenue}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </Tab>
            <Tab eventKey="expenses" title="Expenses">
              <TransactionTable
                data={expenses}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </Tab>
          </Tabs>
        </>
      ) : (
        <SmallLoader />
      )}

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
                  {/* <FloatingLabel
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
                  </FloatingLabel> */}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="my-2">
          <Button variant="secondary" onClick={handleCloseModalRevenue}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleAddClick("income");
              handleCloseModalRevenue();
            }}
          >
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
                className={`card-two-inside ${
                  selectedCards.includes(card) ? "selected-two" : ""
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
                    <>
                      <h5 className="card-title">Other</h5>
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
                    </>
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
                  {/* <FloatingLabel
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
                  </FloatingLabel> */}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="my-2">
          <Button variant="secondary" onClick={handleCloseModalExpense}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleAddClick("expense");
              handleCloseModalExpense();
            }}
          >
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="cardBody">
              <div className="w-100 mb-3">
                <FloatingLabel controlId={`floatingCost`} label="Title">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={editData.title}
                    onChange={(e) => {
                      setEditData({ ...editData, title: e.target.value });
                    }}
                  />
                </FloatingLabel>
              </div>
              <div className="w-100 mb-3">
                <FloatingLabel controlId={`floatingCost`} label="Cost">
                  <Form.Control
                    type="text"
                    placeholder="Cost"
                    name="cost"
                    value={editData.amount}
                    onChange={(e) => {
                      setEditData({ ...editData, amount: e.target.value });
                    }}
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="my-2">
          <Button variant="secondary" onClick={handleCloseModalEdit}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log(editData);
              handleCloseModalEdit();
              handleEditSubmit(editData);
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const TransactionTable = ({ data, handleDelete, handleEdit }) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Title</th>
        <th>Type</th>
        <th>Amount</th>
        {/* <th>repeat</th> */}
        <th className="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className="tableOfRepeat">
          <td>{item.title}</td>
          <td>{item.type}</td>
          <td>{item.amount}</td>
          {/* <td>
            {item.repeat ? (
              <Table>
                <thead>
                  <th>Type</th>
                  <th>Day</th>
                  <th>Time</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.repeat.type}</td>
                    <td>{item.repeat.day}</td>
                    <td>{item.repeat.time}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              "No Repeat"
            )}
          </td> */}
          <td className="d-flex justify-content-center gap-2">
            <Button
              variant="danger"
              title="Delete"
              onClick={() => {
                handleDelete(item._id);
              }}
            >
              <Trash2Icon size={20} />
            </Button>
            <button
              className="SecondaryButton"
              title="Edit"
              onClick={() => {
                handleEdit(item);
              }}
            >
              <Edit size={20} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default RevenueExpenses;
