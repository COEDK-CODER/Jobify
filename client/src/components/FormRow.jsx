import React from "react";

const FormRow = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelName}
      </label>
      <input
        type={props.inputType}
        id={props.inputTypeId}
        name={props.name}
        className="form-input"
        defaultValue={props.defaultValue}
        required
      />
    </div>
  );
};

export default FormRow;
