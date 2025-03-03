import React, { useEffect, useState } from "react";
import "./AllIncidents.css";
import { fetchIncidents } from "../../services/api";

const AllIncidents = () => {
  const [incidents, setIncidents] = useState([]);

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

  return (
    <section className="all-incidents">
      <div className="incidents-right">
        <h2>Recently Reported Incidents</h2>
        <div className="incidents-report-card">
          {Array.isArray(incidents) &&
            incidents.map((incident) => (
              <div key={incident.id} className="incidents-report-card-item">
                {incident.media.length > 0 && (
                  <img src={incident.media[0].url} alt="incident" />
                )}
                <h4>Title: {incident.title}</h4>
                <p>Description: {incident.description}</p>
                <p>Location: {incident.location}</p>
                <p>
                  Reported on: {new Date(incident.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AllIncidents;
