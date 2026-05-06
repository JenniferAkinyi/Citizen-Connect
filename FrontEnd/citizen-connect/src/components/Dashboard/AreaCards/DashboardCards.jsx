import React, { useEffect, useState } from "react";
import { fetchIncidents, fetchPolls, fetchUsers } from "../../../services/api";
import { BiWorld } from "react-icons/bi";
import { CiSquareAlert } from "react-icons/ci";
import { MdHowToVote } from "react-icons/md";
import { useUser } from "../../../context/userContext";
import "./DashboardCards.css";

const DashboardCards = () => {
  const [incidentCount, setIncidentCount] = useState(0);
  const [activePollsCount, setActivePollsCount] = useState(0);
  const [members, setMembers] = useState(0);

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      try {
        const incidents = await fetchIncidents();
        const polls = await fetchPolls();
        const users = await fetchUsers();

        setIncidentCount(incidents.length);
        const activePolls = polls.filter(
          (poll) => poll.status === 'active'
        )
        setActivePollsCount(activePolls.length);

        if (user) {
          const sameLocationUsers = users.filter(
            (u) => u.location === user.location,
          );
          setMembers(sameLocationUsers.length);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadData();
  }, [user]);

  return (
    <div className="dashboard-cards">
      <div className="community-card">
        <div className="community-title">
          <p className="title">Community Impact</p>
          <p className="subtitle">
            Your collective voice is shaping our county
          </p>
        </div>
        <div className="contributors">
          <p>
            <span>{members}</span> Contributors in {user?.location}
          </p>
          <BiWorld className="world-icon" />
        </div>
      </div>
      <div className="card">
        <div className="report">
          <CiSquareAlert className="alert-icon" />
          <div className="report-title">
            <h5>Report incidents</h5>
            <h5>In your county</h5>
          </div>
        </div>
        <div className="counter">
          <p>{incidentCount}</p>
          <h3>Total Incidents</h3>
        </div>
      </div>
      <div className="card">
        <div className="vote">
          <MdHowToVote className="vote-icon" />
          <div className="vote-title">
            <h5>Vote in polls</h5>
            <h5>In your county</h5>
          </div>
        </div>
        <div className="counter">
          <p>{activePollsCount}</p>
          <h3>Active Polls</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
