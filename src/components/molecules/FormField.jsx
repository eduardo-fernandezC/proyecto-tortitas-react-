import React from "react";
import { Input } from "../atoms/Input";

export const FormField = ({ label, name, type, value, onChange, placeholder }) => (
  <Input
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required
  />
);