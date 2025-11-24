import React from "react";
import "../../styles/components/atoms/button.css";

export const Button = ({ text, onClick, type = "button", className = "" }) => (
  <button type={type} onClick={onClick} className={`custom-btn ${className}`}>
    {text}
  </button>
);