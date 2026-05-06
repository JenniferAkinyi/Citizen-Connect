import React from 'react'
import AreaTop from '../../components/Dashboard/AreaTop/AreaTop';
import Taskboard from '../../components/Dashboard/TaskBoard/TaskBoard';
import DashboardCards from '../../components/Dashboard/AreaCards/DashboardCards';
import FeaturedPoll from '../../components/Dashboard/FeaturedPoll/FeaturedPoll';

const DashboardScreen = () => {
  return (
    <div>
      <div>
        <AreaTop/>
        <DashboardCards/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Taskboard/>
        <FeaturedPoll/>
      </div>
    </div>
  )
}

export default DashboardScreen