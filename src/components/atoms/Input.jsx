import React from "react";
export const Input = ({ label, type = "text", name, value, onChange, required, placeholder }) => {
  return (
    <div className="mb-3 text-start">
      <label className="form-label fw-bold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};