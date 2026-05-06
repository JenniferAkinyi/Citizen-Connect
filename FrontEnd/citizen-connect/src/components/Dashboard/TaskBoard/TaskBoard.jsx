import React, { useEffect, useState } from "react";
import "./Taskboard.css";
import { fetchIncidents, fetchPolls } from "../../../services/api";
import { useUser } from "../../../context/userContext";

const TaskBoard = () => {
  const [incidents, setIncidents] = useState([]);
  const [userLocation, setUserLocation] = useState("");
  const [selected, setSelected] = useState("Filter Category");
  const { user } = useUser();

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
        const sortedIncidents = response
          .filter((incident) => incident.location === userLocation)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setIncidents(sortedIncidents);
        console.log(sortedIncidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    if (userLocation) {
      getIncidents();
    }
  }, [userLocation]);

  return (
    <section className="task-board">
      <div className="taskboard-right">
        <div className="taskboard-heading">
          <h2>Community Incident Feed</h2>
          <div className="selection">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Filter Category</option>
              <option value="corruption">Corruption</option>
              <option value="crime">Crime</option>
              <option value="safety">Safety</option>
              <option value="natural disaster">Natural Disaster</option>
              <option value="power outage">Power Outage</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="taskboard-report">
          {Array.isArray(incidents) &&
            incidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="taskboard-report-card1">
                {incident.media?.length > 0 && (
                  <img src={incident.media[0].url} alt="incident" />
                )}

                <div className="report-content">
                  <p className="category">{incident.category}</p>
                  <h4>{incident.title}</h4>
                  <p className="desc">{incident.description}</p>
                  <p className="meta">📍 {incident.location}</p>
                  <p className="date">
                    {new Date(incident.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
