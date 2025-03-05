import React from "react";
import { AreaCards, AreaTable, CreatePoll } from "../../components";
import AreaTopAdmin from "../../components/AdminPages/AdminDashboard/AreaTopAdmin/AdminDash";
import PollMng from "../../components/AdminPages/PollManagement/PollMng";

const AdminScreen = () => {
  return (
    <div className="content-area">
      <AreaTopAdmin />
      <AreaCards />
      <AreaTable />
    </div>
  );
};

export default AdminScreen;