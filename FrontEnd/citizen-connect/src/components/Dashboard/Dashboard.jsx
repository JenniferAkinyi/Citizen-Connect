import React from 'react'
import DashboardCard from './AreaCards/DashboardCards'
import TaskBoard from './TaskBoard/TaskBoard'
import FeaturedPoll from './FeaturedPoll/FeaturedPoll'
import './Dashboard.css'
import Actions from './Actions/Actions'

const Dashboard = () => {
  return (
    <div>
        <DashboardCard />
        <div className="main2">
            <TaskBoard/>
            <div className="main2-side">
              <Actions />
              <FeaturedPoll />
            </div>
        </div>
    </div>
  )
}

export default Dashboard