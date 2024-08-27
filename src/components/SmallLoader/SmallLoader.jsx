import React from "react";
import { Spinner } from "react-bootstrap";

const SmallLoader = () => {
  return (
    <div>
      <div
        style={{ zIndex: 999 }}
        className="bg-light rounded p-3 d-flex justify-content-center align-items-center w-100 h-100"
      >
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default SmallLoader;
