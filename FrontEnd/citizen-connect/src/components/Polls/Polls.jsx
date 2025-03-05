import React, { useEffect, useState } from "react";
import { fetchPolls, fetchUserVotes, addVote } from "../../services/api";
import "./Polls.css";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getPollsAndVotes = async () => {
      try {
        const response = await fetchPolls();
        setPolls(response.data);

        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        const userId = loggedInUser.id;
        const votesResponse = await fetchUserVotes(userId);

        const votes = votesResponse.data;

        if (!Array.isArray(votes)) {
          throw new Error("Votes response is not an array");
        }

        const initialSelectedOptions = {};
        votes.forEach((vote) => {
          initialSelectedOptions[vote.pollId] = vote.optionId;
        });
        setSelectedOptions(initialSelectedOptions);
      } catch (error) {
        console.error(error);
      }
    };
    getPollsAndVotes();
  }, []);

  const handleOptionChange = (pollId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [pollId]: optionId,
    }));
  };

  const handleSubmit = async (e, pollId) => {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const userId = loggedInUser.id;
    const optionId = selectedOptions[pollId];

    if (!optionId) {
      setMessage("Please select an option before submitting your vote.");
      return;
    }

    try {
      const response = await addVote({ pollId, userId, optionId });
      setMessage("Vote added successfully!");
    } catch (error) {
      console.error("Error adding vote:", error);
      setMessage("Failed to add vote.");
    }
  };

  return (
    <div className="polls-container">
      <h2>Available Polls</h2>
      {message && <p className="message">{message}</p>}
      {Array.isArray(polls) &&
        polls.map((poll) => (
          <div key={poll.id} className="poll-card">
            <h3>{poll.question}</h3>
            <p>{poll.description}</p>
            <p>Status: {poll.status}</p>
            <p>Created At: {new Date(poll.createdAt).toLocaleDateString()}</p>
            {poll.expiresAt && (
              <p>Closes At: {new Date(poll.expiresAt).toLocaleDateString()}</p>
            )}
            <p>Total Votes: {poll.totalVotes}</p>
            <form onSubmit={(e) => handleSubmit(e, poll.id)}>
              {poll.options.map((option) => (
                <div key={option.id}>
                  <input
                    type="radio"
                    id={option.id}
                    name={`poll-${poll.id}`}
                    value={option.id}
                    checked={selectedOptions[poll.id] === option.id}
                    onChange={() => handleOptionChange(poll.id, option.id)}
                  />
                  <label htmlFor={option.id}>{option.text}</label>
                </div>
              ))}
              <button type="submit">Submit Vote</button>
            </form>
          </div>
        ))}
    </div>
  );
};

export default Polls;
