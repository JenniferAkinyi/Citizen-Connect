import React, { useState, useEffect } from "react";
import OfficialCard from "./OfficialCard";
import { fetchIncidents, fetchPolls } from "../../../../services/api";

const OfficialCards = () => {
  const [incidents, setIncidents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser && loggedInUser.location) {
          setLocation(loggedInUser.location);
        } else {
          console.error("User location is not available in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const getIncidents = async () => {
      try {
        const response = await fetchIncidents();
        const filteredIncidents = response.data.filter(
          (incident) => incident.location === location
        );
        setIncidents(filteredIncidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    if (location) {
      getIncidents();
    }
  }, [location]);

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

  const totalIncidents = incidents.length;
  const totalPolls = polls.length;

  return (
    <section className="content-area-cards">
      <OfficialCard
        colors={["#e4e8ef", "#475be8"]}
        cardInfo={{
          title: `Total Incidents In ${location}`,
          value: totalIncidents,
          text: "The total number of incidents reported.",
        }}
      />
      <OfficialCard
        colors={["#e4e8ef", "#4ce13f"]}
        cardInfo={{
          title: "All Active Polls",
          value: totalPolls,
          text: "Total of available polls",
        }}
      />
    </section>
  );
};

export default OfficialCards;