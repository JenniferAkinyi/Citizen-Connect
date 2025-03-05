import React from "react";

import AreaTopOfficial from "../../components/OfficialPage/OfficialDashboard/AreaTopOfficial/AreaTopOfficial";
import OfficialCards from "../../components/OfficialPage/OfficialDashboard/areaCards/OfficialCards";
import OfficialTable from "../../components/OfficialPage/OfficialDashboard/AreaTable/OfficialTable";


const OfficialScreen = () => {
  return (
    <div className="content-area">
      <AreaTopOfficial />
      <OfficialCards />
      <OfficialTable />
    </div>
  );
};

export default OfficialScreen;