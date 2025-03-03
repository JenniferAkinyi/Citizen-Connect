import React, { useEffect, useState } from 'react';
import { fetchPolls } from '../../services/api';
import './Polls.css';

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getPolls = async () => {
      try {
        const response = await fetchPolls();
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };
    getPolls();
  }, []);

  return (
    <div className="polls-container">
      <h2>Available Polls</h2>
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
        </div>
      ))}
    </div>
  );
};

export default Polls;