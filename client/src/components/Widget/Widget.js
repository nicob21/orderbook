import React from "react";

const Widget = (props) => {
  const { title } = props;

  return (
    <div className="card m-2" style={{ border: "none" }}>
      <h5 className="card-header text-left bg-secondary ">{title}</h5>
      <div
        className="card-body bg-dark"
        style={{ overflow: "auto", ...props.style }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Widget;
