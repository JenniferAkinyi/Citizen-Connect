import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPoll } from "../../services/api";

const CreatePollModal = ({ closeModal }) => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: "" }]);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pollData = {
      question,
      description,
      status: "unverified",
      expiresAt: new Date(expiresAt).toISOString(),

      options: options.filter((option) => option.text.trim() !== ""),
    };

    try {
      await createPoll(pollData);
      setMessage("Poll created successfully!");
      setMessageType("success");

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.error("Error creating poll:", error);

      setMessage("Failed to create poll.");
      setMessageType("error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Poll</h2>

          <button className="close-btn" onClick={closeModal}>
            <IoClose />
          </button>
        </div>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Question</label>

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter poll question"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the poll"
              required
            />
          </div>

          <div className="form-group">
            <label>Expiry Date</label>

            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Options</label>

            {options.map((option, index) => (
              <div className="option-input" key={index}>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />

                <button
                  type="button"
                  className="remove-option"
                  onClick={() => removeOption(index)}
                >
                  <IoClose />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-option-btn"
              onClick={addOption}
            >
              + Add Option
            </button>
          </div>

          <button type="submit" className="submit-poll">
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePollModal;
