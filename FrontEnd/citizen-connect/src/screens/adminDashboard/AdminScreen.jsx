import React from "react";
import { AreaCards,  AreaTable } from "../../components";
import AreaTopAdmin from "../../components/AdminPages/AdminDashboard/AreaTopAdmin/AdminDash";

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
