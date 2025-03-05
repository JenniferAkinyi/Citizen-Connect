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
    <div className="incident-form-container">
      <h2>Report Incident</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            readOnly 
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="corruption">Corruption</option>
            <option value="crime">Crime</option>
            <option value="insecurity">Insecurity</option>
            <option value="natural disaster">Natural Disaster</option>
            <option value="power outage">Power Outage</option>
            <option value="human rights violation">
              Human Rights Violation
            </option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mediaUrl">Media URL</label>
          <input
            type="text"
            id="mediaUrl"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
        </div>
        <button type="submit">Report Incident</button>
      </form>
    </div>
  );
};

export default Incident;