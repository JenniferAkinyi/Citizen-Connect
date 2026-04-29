import React from 'react'
import AreaTop from '../../components/Dashboard/AreaTop/AreaTop';
import Taskboard from '../../components/Dashboard/TaskBoard/TaskBoard';
import DashboardCards from '../../components/Dashboard/AreaCards/DashboardCards';

const DashboardScreen = () => {
  return (
    <div className='content-area'>
      <AreaTop/>
      <DashboardCards/>
      <Taskboard/>
    </div>
  )
}

export default DashboardScreen