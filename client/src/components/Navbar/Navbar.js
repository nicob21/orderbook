import React from "react";
import ActionButtons from "../ActionButtons/ActionButtons";
import Input from "../Input/Input";

const Navbar = (props) => {
  const { userId, changeUserId, refreshUserOrders } = props;
  const [editUser, setEditUser] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top w-100 d-flex flex-nowrap">
      <a className="navbar-brand" href="/">
        Orderbook
      </a>
      <div className="d-flex justify-content-end align-items-center w-100">
        <span className="mr-2">User ID:</span>
        {editUser === false ? (
          <>
            {userId}
            <i
              className="bi bi-pencil ml-3"
              style={{ cursor: "pointer" }}
              onClick={() => setEditUser(userId)}
            />
          </>
        ) : (
          <>
            <Input
              id="userId"
              value={editUser}
              onChange={(id, value) => setEditUser(value)}
              style={{ width: "60px" }}
            />
            <ActionButtons
              confirmAction={() => {
                changeUserId(editUser);
                setEditUser(false);
                refreshUserOrders(editUser);
              }}
              cancelAction={() => setEditUser(false)}
              className="ml-2"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
