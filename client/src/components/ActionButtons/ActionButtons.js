import React from "react";

const ActionButtons = (props) => {
  const { cancelAction, confirmAction } = props;

  return (
    <div className={props.className}>
      <button type="button" className="btn btn-light" onClick={cancelAction}>
        Cancel
      </button>
      <button
        type="button"
        className="btn btn-primary mx-2"
        onClick={confirmAction}
      >
        Confirm
      </button>
    </div>
  );
};

export default ActionButtons;
