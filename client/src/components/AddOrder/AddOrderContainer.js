import React from "react";
import update from "immutability-helper";
import { get } from "lodash";

import AddOrder from "./AddOrder";

import { fetchPost } from "../../api/fetch";

const AddOrderContainer = (props) => {
  const { userId, refreshOrders } = props;
  const [formValues, setFormValues] = React.useState({ side: "ASK" });

  const handleChange = (id, value) => {
    setFormValues(
      update(formValues, {
        [id]: { $set: value },
      })
    );
  };

  const submitOrder = async () => {
    try {
      await fetchPost("orders", {
        userId,
        side: get(formValues, ["side"]),
        amount: get(formValues, ["amount"]),
        price: get(formValues, ["price"]),
      });
      refreshOrders();
      setFormValues({ side: get(formValues, ["side"]) });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AddOrder
      formValues={formValues}
      handleChange={handleChange}
      submitOrder={submitOrder}
    />
  );
};

export default AddOrderContainer;
