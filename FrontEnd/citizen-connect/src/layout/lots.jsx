import React, { useEffect, useState } from "react";
import "./TaskBoard.css";
import { fetchIncidents } from "../../../services/api";
import { fetchPolls } from "../../../services/api";

const TaskBoard = () => {
  const [incidents, setIncidents] = useState([]);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getIncidents = async () => {
      try {
        const response = await fetchIncidents();
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    getIncidents();
  }, []);

  useEffect(() => {
    const getPolls = async () => {
      try {
        const response = await fetchPolls();
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    getPolls();
  }, []);

  return (
    <section className="task-board">
      <div className="taskboard-right">
        <div className="taskboard-report-card">
          <h3>Recently Reported Incidents</h3>
          {Array.isArray(incidents) &&
            incidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="taskboard-report-card-item">
                {incident.media.length > 0 && (
                  <img src={incident.media[0].url} alt="incident" />
                )}
                <h4>Title: {incident.title}</h4>
                <p>Description: {incident.description}</p>
                <p>Location: {incident.location}</p>
                <p>
                  Reported on:{" "}
                  {new Date(incident.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* <div className="taskboard-left">
          <div className="taskboard-recent-polls">
            <h3>Recent Polls</h3>
            {Array.isArray(polls) && polls.map((poll) => (
              <div key={poll.id} className="taskboard-poll-card">
                <h4>{poll.title}</h4>
                <p>{poll.description}</p>
                <p>{new Date(poll.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div> */}
    </section>
  );
};

export default TaskBoard;
