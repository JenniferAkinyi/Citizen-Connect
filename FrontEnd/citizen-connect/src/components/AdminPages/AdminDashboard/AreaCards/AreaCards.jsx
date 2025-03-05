import React, { useState, useEffect } from "react";
import AreaCard from "./AreaCard";
import { fetchIncidents, fetchPolls } from "../../../../services/api";

const AreaCards = () => {
  const [incidents, setIncidents] = useState([])
  const [polls, setPolls] = useState([]);

  useEffect(() =>{
    const getIncidents = async () => {
      try{
        const response = await fetchIncidents()
        setIncidents(response.data);

      } catch(error){
        console.error("Error fetching incidents:", error);
      }
    }
    getIncidents();
  }, [])
  useEffect(() =>{
    const getPolls = async () => {
      try{
        const response = await fetchPolls()
        setPolls(response.data);

      } catch(error){
        console.error("Error fetching polls:", error);
      }
    }
    getPolls();
  }, [])
  const totalIncidents = incidents.length;
  const totalPolls = polls.length
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        cardInfo={{
          title: "Total Incidents Reported",
          value: totalIncidents,
          text: "The total number of incidents reported.",
        }}
      />
      <AreaCard
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

export default AreaCards;