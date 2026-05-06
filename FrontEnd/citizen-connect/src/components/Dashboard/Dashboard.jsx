import React from 'react'
import AreaTop from './AreaTop/AreaTop'
import DashboardCard from './AreaCards/DashboardCards'
import TaskBoard from './TaskBoard/TaskBoard'
import FeaturedPoll from './FeaturedPoll/FeaturedPoll'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
        <AreaTop />
        <DashboardCard />
        <div className="main2">
            <TaskBoard/>
            <FeaturedPoll />
        </div>
    </div>
  )
}

export default Dashboard