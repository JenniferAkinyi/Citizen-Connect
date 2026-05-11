import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Actions.css";

const Actions = () => {
  return (
    <div className="quick-actions">
      <p className="heading">Quick Actions</p>
      <div className="buttons">
        <Link to="/incident" className="incident-button">
          <MdAddCircleOutline />
          Report Incident
        </Link>
        <button className="map-button">
          <FaMapMarkedAlt />
          View Incident Map
        </button>
      </div>
    </div>
  );
};

export default Actions;
