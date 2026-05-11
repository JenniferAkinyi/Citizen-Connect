import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { reportIncident } from "../../services/api";
import { CiSquareAlert } from "react-icons/ci";
import { FaLocationDot, FaCamera } from "react-icons/fa6";
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

  const [step, setStep] = useState(1);
  const detailsRef = useRef(null);
  const locationRef = useRef(null);
  const mediaRef = useRef(null);

  const scrollToSection = (section, stepNumber) => {
    setStep(stepNumber);

    section.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
      userId,
      media: mediaUrl ? [{ url: mediaUrl, type: "image" }] : [],
    };

    try {
      await reportIncident(incidentData);

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
        <p>
          Your contribution helps to build a better county. Provide accurate
          details below to facilitate easy resolution.
        </p>
      </div>
      <div className="reporting-card">
        <div className="reporting-left">
          <div className="stepper">
            <div className="step-wrapper">
              <div
                className={`step ${step === 1 ? "active" : ""}`}
                onClick={() => scrollToSection(detailsRef, 1)}
              >
                <div className="circle">1</div>
                <div className="label">Details & Category</div>
              </div>
              <div className="line" />
            </div>

            <div className="step-wrapper">
              <div
                className={`step ${step === 2 ? "active" : ""}`}
                onClick={() => scrollToSection(locationRef, 2)}
              >
                <div className="circle">2</div>
                <div className="label">Location</div>
              </div>
              <div className="line" />
            </div>

            <div className="step-wrapper">
              <div
                className={`step ${step === 3 ? "active" : ""}`}
                onClick={() => scrollToSection(mediaRef, 3)}
              >
                <div className="circle">3</div>
                <div className="label">Media Upload</div>
              </div>
            </div>
          </div>
        </div>
        <div className="reporting-right">
          <div className="reporting-right">
            <div ref={detailsRef} className="form-section">
              <h3 className="title-step">
                <CiSquareAlert className="icon" />
                Step 1: Incident Details
              </h3>
              <div className="title-category">
                <div id="title-group">
                  <label htmlFor="title">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <div id="title-group">
                  <label htmlFor="category">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="corruption">Corruption</option>
                    <option value="crime">Crime</option>
                    <option value="safety">Safety</option>
                    <option value="natural disaster">Natural Disaster</option>
                    <option value="power outage">Power Outage</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </div>

            <div ref={locationRef} className="form-section">
              <h3 className="title-step">
                <FaLocationDot className="icon" />
                Step 2: Location
              </h3>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div ref={mediaRef} className="form-section">
              <h3 className="title-step">
                <FaCamera className="icon" />
                Step 3: Upload Photos
              </h3>
              <input
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Image URL"
              />
            </div>
            <div className="form-section">
              <div className="submition">
                <p>Thank you for filling up the form</p>
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incident;
