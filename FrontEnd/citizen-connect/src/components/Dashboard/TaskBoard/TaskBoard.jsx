import React, { useEffect, useState } from "react";
import "./TaskBoard.css";
import { fetchIncidents, fetchPolls } from "../../../services/api";

const TaskBoard = () => {
  const [incidents, setIncidents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.location) {
      setUserLocation(loggedInUser.location);
    }
  }, []);

  useEffect(() => {
    const getIncidents = async () => {
      try {
        const response = await fetchIncidents();
        const sortedIncidents = response.data
          .filter((incident) => incident.location === userLocation)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setIncidents(sortedIncidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    if (userLocation) {
      getIncidents();
    }
  }, [userLocation]);

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
        <h2>Recently Reported Incidents</h2>
        <div className="taskboard-report-card">
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
      <div className="taskboard-left">
        <h2>Recent Polls</h2>
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
    </section>
  );
};

export default TaskBoard;