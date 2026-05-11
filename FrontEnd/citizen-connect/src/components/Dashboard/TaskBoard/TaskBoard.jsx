import React, { useEffect, useState } from "react";
import "./Taskboard.css";
import { fetchIncidents, fetchPolls } from "../../../services/api";
import { useUser } from "../../../context/userContext";

const TaskBoard = () => {
  const [incidents, setIncidents] = useState([]);
  const [userLocation, setUserLocation] = useState("");
  const [selected, setSelected] = useState("Filter Category");
  const [currentPage, setCurrentPage] = useState(1);

  const incidentsPerPage = 3;
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
        const filteredIncidents = response
          .filter((incident) => {
            const matchesLocation = incident.location === userLocation;
            const matchesCategory =
              selected === "" || selected === "Filter Category"
                ? true
                : incident.category.toLowerCase() === selected.toLowerCase();
            return matchesLocation && matchesCategory;
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setIncidents(filteredIncidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    if (userLocation) {
      getIncidents();
    }
  }, [userLocation, selected]);
  const indexOfLastIncident = currentPage * incidentsPerPage;

  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;

  const currentIncidents = incidents.slice(
    indexOfFirstIncident,
    indexOfLastIncident,
  );

  const totalPages = Math.ceil(incidents.length / incidentsPerPage);

  return (
    <div className="taskboard">
      <div className="taskboard-heading">
        <h2 className="heading-title">Community Incident Feed</h2>
        <div className="selection">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">All Incidents</option>
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
      <div className="taskboard-right">
        {incidents.length === 0 ? (
          <div className="no-incidents">
            <p>No incidents in this category reported.</p>
          </div>
        ) : (
          currentIncidents.map((incident) => (
            <div key={incident.id} className="taskboard-report-card1">
              {incident.media?.length > 0 && (
                <img src={incident.media[0].url} alt="incident" />
              )}

              <div className="report-content">
                <div className="incident-info">
                  <div className="info-left">
                    <p className="category">{incident.category}</p>

                    <p className="date">
                      {new Date(incident.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="info-right">
                    <p className={`status ${incident.status.toLowerCase()}`}>
                      {incident.status}
                    </p>
                  </div>
                </div>

                <h4>{incident.title}</h4>

                <p className="desc">{incident.description}</p>
              </div>
            </div>
          ))
        )}
        {incidents.length > incidentsPerPage && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
