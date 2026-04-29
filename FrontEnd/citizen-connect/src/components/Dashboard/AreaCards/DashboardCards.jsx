import React, { useEffect, useState } from "react";
import { fetchIncidents, fetchPolls } from "../../../services/api";
import "./DashboardCards.css";

const DashboardCards = () => {
  const [incidentCount, setIncidentCount] = useState(0);
  const [activePollsCount, setActivePollsCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const incidents = await fetchIncidents();
        console.log(incidents)
        const polls = await fetchPolls();
        setIncidentCount(incidents.length);
        console.log(polls)
        setActivePollsCount(polls.length);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="dashboard-cards">
      <div className="card">
        <p>{incidentCount}</p>
        <h3>Total Incidents</h3>
      </div>

      <div className="card">
        <p>{activePollsCount}</p>
        <h3>Polls</h3>
      </div>
    </div>
  );
};

export default DashboardCards;