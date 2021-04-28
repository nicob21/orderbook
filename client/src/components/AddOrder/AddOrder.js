import React from "react";
import { get } from "lodash";
import clsx from "clsx";
import "./AddOrder.css";

import Input from "../Input/Input";
import Widget from "../Widget/Widget";

const AddOrder = (props) => {
  const { formValues, handleChange, submitOrder } = props;

  const isValidForm = () => {
    let valid = true;
    if (!get(formValues, ["amount"]) || get(formValues, ["amount"]) <= 0) {
      valid = false;
    }
    if (!get(formValues, ["price"]) || get(formValues, ["price"]) <= 0) {
      valid = false;
    }
    return valid;
  };

  return (
    <Widget title={"Place Order"} style={{ height: "105px" }}>
      <div className="d-flex align-items-end justify-content-center">
        <div className="mx-4">
          <span>Side</span>
          <div className="d-flex">
            <span
              className={clsx("side", {
                active: get(formValues, ["side"]) === "ASK",
              })}
              onClick={() => handleChange("side", "ASK")}
            >
              ASK
            </span>
            <span
              className={clsx("side", {
                active: get(formValues, ["side"]) === "BID",
              })}
              onClick={() => handleChange("side", "BID")}
            >
              BID
            </span>
          </div>
        </div>
        <div className="mx-4">
          <span>Amount</span>
          <Input
            id="amount"
            value={get(formValues, ["amount"])}
            onChange={handleChange}
            style={{ width: "100px" }}
            type="number"
          />
        </div>
        <div className="mx-4">
          <span>Price</span>
          <Input
            id="price"
            value={get(formValues, ["price"])}
            onChange={handleChange}
            style={{ width: "100px" }}
            type="number"
          />
        </div>
        <div className="mx-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={submitOrder}
            disabled={!isValidForm()}
          >
            Confirm
          </button>
        </div>
      </div>
    </Widget>
  );
};

export default AddOrder;
