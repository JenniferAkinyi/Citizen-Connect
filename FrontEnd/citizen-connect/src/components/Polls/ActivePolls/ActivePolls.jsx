import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPolls } from "../../../services/api";
import "./ActivePolls.css";
import VoteModal from "../VoteModal/VoteModal";

const ActivePolls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const getDaysLeft = (expiresAt) => {
    const today = new Date();
    const expiry = new Date(expiresAt);

    const difference = expiry - today;

    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (daysLeft > 1) {
      return `Ends in ${daysLeft} days`;
    }

    if (daysLeft === 1) {
      return "Ends tomorrow";
    }

    if (daysLeft === 0) {
      return "Ends today";
    }

    return "Expired";
  };
  useEffect(() => {
    const getPolls = async () => {
      try {
        const response = await fetchPolls();

        const activePolls = response.filter(
          (poll) => poll.status.toLowerCase() === "active",
        );

        activePolls.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setPolls(activePolls);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    getPolls();
  }, []);
  const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || [];

  return (
    <div className="polls">
      <div className="polls-heading">
        <h3>Active Polls</h3>
        <p className="view-polls">
          View All <FaArrowRightLong className="icon" />
        </p>
      </div>
      <div className="polls-container">
        {polls.length > 0 ? (
          polls.map((poll) => (
            <div className="poll-card" key={poll.id}>
              <div className="poll-top">
                <span className="poll-status active">{poll.status}</span>

                <span className="poll-date">{getDaysLeft(poll.expiresAt)}</span>
              </div>
              <h4>{poll.question}</h4>
              <p className="poll-description">{poll.description}</p>
              <button
                className={`vote-btn ${
                  votedPolls.includes(poll.id) ? "edit-vote" : ""
                }`}
                onClick={() => setSelectedPoll(poll)}
              >
                {votedPolls.includes(poll.id)
                  ? "Edit Your Vote"
                  : "Cast Your Vote"}
              </button>
            </div>
          ))
        ) : (
          <div className="no-polls">
            <p>No active polls available.</p>
          </div>
        )}
      </div>
      {selectedPoll && (
        <VoteModal
          poll={selectedPoll}
          closeModal={() => setSelectedPoll(null)}
        />
      )}
    </div>
  );
};

export default ActivePolls;
