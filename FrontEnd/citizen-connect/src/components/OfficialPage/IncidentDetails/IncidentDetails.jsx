import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIncidentById } from "../../../services/api";
import "./IncidentDetails.css";

const IncidentDetails = () => {
  const { incidentId } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIncidentDetails = async () => {
      try {
        const response = await fetchIncidentById(incidentId);
        setIncident(response.data);
      } catch (error) {
        setError("Error fetching incident details");
      } finally {
        setLoading(false);
      }
    };
    getIncidentDetails();
  }, [incidentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!incident) {
    return <div>No incident found</div>;
  }

  return (
    <div className="incident-details">
      <h2>Incident Details</h2>
      <p><strong>ID:</strong> {incident.id}</p>
      <p><strong>Title:</strong> {incident.title}</p>
      <p><strong>Location:</strong> {incident.location}</p>
      <p><strong>Category:</strong> {incident.category}</p>
      <p><strong>Status:</strong> {incident.status}</p>
      <p><strong>Reported At:</strong> {new Date(incident.createdAt).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {incident.description}</p>
    </div>
  );
};

export default IncidentDetails;