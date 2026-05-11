import React, { useState, useEffect } from "react";
import { fetchPolls, addVote } from "../../../services/api";
import "./FeaturedPoll.css";

const FeaturedPoll = () => {
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const getPolls = async () => {
      try {
        const response = await fetchPolls();
        const activePolls = response.filter((poll) => poll.status === "active");
        const sortedPolls = activePolls.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        if (sortedPolls.length > 0) {
          setPoll(sortedPolls[0]);
        }
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    getPolls();
  }, []);
  const getDaysRemaining = (expiresAt) => {
    const today = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="taskboardpolls">
      <h2 className="heading">Featured Poll</h2>
      {!poll ? (
        <p>No active polls available at the moment.</p>
      ) : (
        <div className="recent-poll-card">
          <h4>{poll.question}</h4>
          <p>{poll.description}</p>
          <div className="poll-options">
            {poll.options.map((option) => (
              <button key={option.id} className="poll-option-btn">
                {option.text}
              </button>
            ))}
          </div>
          <button className="submit-btn">Submit</button>
          <p className="poll-expiry">
            Ending in {getDaysRemaining(poll.expiresAt)} days
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedPoll;
