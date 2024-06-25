import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = () => {
    window.location.href = "/";
  };
  const navigatee = useNavigate();
  return (
    <div>
      <div id="notfound">
        <button
          onClick={() => navigatee(-1)}
          className="SecondaryButton opacity-75 m-2"
        >
          Go Back
        </button>

        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
            <h2>404 - The Page can't be found</h2>
          </div>
          <button
            onClick={navigate}
            className="SecondaryButton opacity-75 w-100 p-4 "
          >
            Go TO Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
