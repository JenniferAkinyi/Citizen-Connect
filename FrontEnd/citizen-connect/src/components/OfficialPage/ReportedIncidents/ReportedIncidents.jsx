import React, { useEffect, useState } from "react";
import "./ReportedIncidents.css";
import { fetchIncidents} from "../../../services/api";

const ReportedIncidents = () => {
  const [incidents, setIncidents] = useState([]);
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
    </section>
  );
};

export default ReportedIncidents;