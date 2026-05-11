import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import './ActivePolls.css'

const ActivePolls = () => {
  return (
    <div className='polls'>
        <div className='polls-heading'>
            <h3>Active Polls</h3>
            <p className='view-polls'>View All <FaArrowRightLong className='icon'/></p>
        </div>
    </div>
  )
}

export default ActivePolls