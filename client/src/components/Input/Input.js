import React from "react";

const Input = (props) => {
  const { id, value, onChange, type = "text" } = props;

  return (
    <input
      id={id}
      type={type}
      className="form-control bg-dark text-light"
      style={props.style}
      value={value || ""}
      onChange={(e) => onChange(id, e.target.value)}
    />
  );
};

export default Input;
