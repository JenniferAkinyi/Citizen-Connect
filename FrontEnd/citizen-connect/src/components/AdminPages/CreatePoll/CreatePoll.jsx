import React, { useState, useEffect } from "react";
import { createPoll } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "./CreatePoll.css";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]); 
  const [expiresAt, setExpiresAt] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.id) {
      setUserId(loggedInUser.id);
    }
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() || options.some((opt) => opt.trim() === "")) {
      setMessage("Question and at least two options are required.");
      return;
    }

    setLoading(true);
    try {
      const formattedExpiresAt = expiresAt ? new Date(expiresAt).toISOString() : null;
      await createPoll({
        question,
        description,
        options: options.map((option) => ({ text: option })), 
        expiresAt: formattedExpiresAt,
        createdBy: userId, 
      });

      setMessage("Poll created successfully!");
      setQuestion("");
      setDescription("");
      setOptions(["", ""]);
      setExpiresAt("");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 500);
    } catch (error) {
      console.error("Error creating poll:", error);
      setMessage("Failed to create poll.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="poll-form">
      <h2>Create a New Poll</h2>
      {message && <p className="message">{message}</p>}

      <label>Poll Question:</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      <label>Description (optional):</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Options:</label>
      {options.map((option, index) => (
        <div key={index} className="option-input">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
          {options.length > 2 && (
            <button type="button" onClick={() => removeOption(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button className="add-option-btn" type="button" onClick={addOption}>
        Add Option
      </button>

      <label>Expiration Date (optional):</label>
      <input
        type="datetime-local"
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
      />

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </button>
    </form>
  );
};

export default CreatePoll;
