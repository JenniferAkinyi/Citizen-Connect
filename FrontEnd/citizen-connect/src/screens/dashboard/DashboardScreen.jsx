import React from 'react'
import AreaTop from '../../components/Dashboard/AreaTop/AreaTop';
import Taskboard from '../../components/Dashboard/TaskBoard/TaskBoard';

const DashboardScreen = () => {
  return (
    <div className='content-area'>
      <AreaTop/>
      <Taskboard/>
    </div>
  )
}

export default DashboardScreen