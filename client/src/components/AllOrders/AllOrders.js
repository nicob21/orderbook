import React from "react";
import OrdersTable from "../OrdersTable/OrdersTable";

const AllOrders = (props) => {
  const { orders, fetchOrders } = props;

  React.useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return <OrdersTable orders={orders} />;
};

export default AllOrders;
