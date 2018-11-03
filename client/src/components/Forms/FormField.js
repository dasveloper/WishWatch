import React from "react";

export default ({ input, label, className, placeholder, type, meta }) => {
  const { touched, error } = meta;
  return (
    <div>
      <label className="form-label">
        {label}
        <input placeholder={placeholder} type={type} className={className} {...input} />
      </label>
      <p className="input-error">{touched && error}</p>
    </div>
  );
};
