import React from "react";
import "./Heading.css";

const Heading = ({ content }) => {
  return (
    <div className="titleContainer">
      <h2 className="title">{content}</h2>
    </div>
  );
};

export default Heading;
