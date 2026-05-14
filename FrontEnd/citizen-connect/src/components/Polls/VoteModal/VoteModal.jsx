import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { castVote, updateVote } from "../../../services/api";
import "./VoteModal.css";

const VoteModal = ({ poll, closeModal }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const savedVotes =
      JSON.parse(localStorage.getItem("userVotes")) || {};

    const existingVote = savedVotes[poll.id];
    if (existingVote) {
      setHasVoted(true);
      setSelectedOption(existingVote);
    }
  }, [poll.id]);

  const handleVote = async () => {
    if (!selectedOption) {
      setMessage("Please select an option.");
      return;
    }
    try {
      console.log("hasVoted:", hasVoted);
      console.log("pollId:", poll.id);
      console.log("selectedOption:", selectedOption);

      if (hasVoted) {
        await updateVote({
          pollId: poll.id,
          optionId: selectedOption,
        });

        setMessage("Vote updated successfully!");
      } else {
        await castVote({
          pollId: poll.id,
          optionId: selectedOption,
        });

        setMessage("Vote submitted successfully!");
      }
      const savedVotes =
        JSON.parse(localStorage.getItem("userVotes")) || {};

      savedVotes[poll.id] = selectedOption;

      localStorage.setItem(
        "userVotes",
        JSON.stringify(savedVotes)
      );
      setHasVoted(true);

      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {
      console.error("Vote Error:", error);

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to submit vote.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="vote-modal">
        <div className="modal-header">
          <h3>{poll.question}</h3>

          <button onClick={closeModal}>
            <IoClose />
          </button>
        </div>

        <p className="poll-description">
          {poll.description}
        </p>

        <div className="vote-options">
          {poll.options.map((option) => (
            <label
              key={option.id}
              className={`vote-option ${
                selectedOption === option.id
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="vote"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() =>
                  setSelectedOption(option.id)
                }
              />

              <span>{option.text}</span>
            </label>
          ))}
        </div>

        {message && (
          <p className="vote-message">{message}</p>
        )}

        <button
          className={`submit-vote-btn ${
            hasVoted ? "update-btn" : ""
          }`}
          onClick={handleVote}
        >
          {hasVoted ? "Update Vote" : "Submit Vote"}
        </button>
      </div>
    </div>
  );
};

export default VoteModal;