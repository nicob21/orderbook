import React from "react";

import AddOrderContainer from "../AddOrder/AddOrderContainer";
import MyOrders from "../MyOrders/MyOrders";
import AllOrders from "../AllOrders/AllOrders";
import Navbar from "../Navbar/Navbar";

import "./App.css";
import { fetchGet } from "../../api/fetch";

const App = () => {
  const [userId, setUserId] = React.useState(1);
  const [userOrders, setUserOrders] = React.useState();
  const [allOrders, setAllOrders] = React.useState();

  const changeUserId = (newId) => {
    if (!isNaN(parseInt(newId))) {
      setUserId(parseInt(newId));
    }
  };

  const fetchOrders = async (userId) => {
    try {
      if (userId) {
        setUserOrders(await fetchGet(`orders?userId=${userId}`));
      } else {
        setAllOrders(await fetchGet("orders"));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const refreshOrders = async () => {
    fetchOrders();
    fetchOrders(userId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar
          userId={userId}
          changeUserId={changeUserId}
          refreshUserOrders={(userId) => fetchOrders(userId)}
        />
      </header>
      <div className="container-fluid p-0 App-content">
        <AddOrderContainer userId={userId} refreshOrders={refreshOrders} />
        <MyOrders
          orders={userOrders}
          fetchOrders={() => fetchOrders(userId)}
          refreshOrders={refreshOrders}
        />
        <AllOrders orders={allOrders} fetchOrders={fetchOrders} />
      </div>
    </div>
  );
};

export default App;
