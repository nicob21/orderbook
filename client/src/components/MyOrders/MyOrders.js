import React from "react";
import OrdersTable from "../OrdersTable/OrdersTable";

const MyOrders = (props) => {
  const { orders, fetchOrders, refreshOrders } = props;

  React.useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <OrdersTable orders={orders} userOrders refreshOrders={refreshOrders} />
  );
};

export default MyOrders;
