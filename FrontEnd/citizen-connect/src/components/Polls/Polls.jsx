import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import "./Polls.css";
import ActivePolls from "./ActivePolls/ActivePolls";
import Results from "./PastResults/Results";
import CreatePollModal from "./CreatePollModal";

const Polls = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="poll-container">
      <div className="polls-topbar">
        <div className="title">
          <h2>Civic Engagement Builder</h2>
          <p>
            Design, deploy and monitor community sentiment in real time
          </p>
        </div>
        <button
          className="create-poll"
          onClick={() => setShowModal(true)}
        >
          <IoMdAdd className="icon" />
          Create New Poll
        </button>
      </div>
      <div className="poll-view">
        <ActivePolls />
        <Results />
      </div>

      {showModal && (
        <CreatePollModal closeModal={() => setShowModal(false)} />
      )}

    </div>
  );
};

export default Polls;