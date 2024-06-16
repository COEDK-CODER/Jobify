import React from "react";

function FormRowSelect({ name, labelText, list, defaultValue = "" }) {
  return (
    <div className="form-row">
      <label htmlFor={labelText} className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="form-select"
      >
        {Object.values(list).map((x) => {
          return (
            <option value={x} key={x}>
              {x}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
