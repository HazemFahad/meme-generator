import React from "react";

export const Meme = ({ template, onClick }) => {
  return (
    <img
      className="memePhoto"
      style={{ width: 200 }}
      key={template.id}
      src={template.url}
      alt="template"
      onClick={onClick}
    ></img>
  );
};
