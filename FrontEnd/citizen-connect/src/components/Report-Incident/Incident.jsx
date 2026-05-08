import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reportIncident } from "../../services/api";
import "./Incident.css";

const Incident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.id) {
      setUserId(loggedInUser.id);
      setLocation(loggedInUser.location); 
    } else {
      console.error(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const incidentData = {
      title,
      description,
      location,
      category,
      status: "pending",
      userId,
      media: mediaUrl ? [{ url: mediaUrl, type: "image" }] : [],
    };

    try {
      const response = await reportIncident(incidentData);
      setMessage("Incident reported successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("");
      setMediaUrl("");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Error reporting incident:", error);
      setMessage("Failed to report incident.");
    }
  };

  return (
    <div className="reporting">
      <div className="reporting-heading">
        <h2>Report a Civic Issue</h2>
        <p>Your contribution helps to build a better county. Provide accurate details below to facilitate easy resolution.</p>
      </div>
      <div className="reporting-card">
        <div className="reporting-left">
          <p>left</p>
        </div>
        <div className="reporting-right">
          <p>right</p>
        </div>
      </div>
    </div>
  );
};

export default Incident;