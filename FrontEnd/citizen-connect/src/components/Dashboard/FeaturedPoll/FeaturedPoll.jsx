import React, { useState, useEffect } from "react";
import { fetchPolls } from "../../../services/api";

const FeaturedPoll = () => {
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    const getPolls = async () => {
      try {
        const response = await fetchPolls();
        setPolls(response);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    getPolls();
  }, []);
  return (
    <div className="taskboard-left">
      <h2>Featured poll</h2>
      <div className="taskboard-recent-polls">
        {Array.isArray(polls) &&
          polls.map((poll) => (
            <div key={poll.id} className="taskboard-poll-card">
              <h4>{poll.question}</h4>
              <p>{poll.description}</p>
              <p>{new Date(poll.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedPoll;
