import React from "react";
export const Title = ({ text, size = "h1", className = "titulo" }) => {
  const Tag = size;
  return <Tag className={className}>{text}</Tag>;
};
