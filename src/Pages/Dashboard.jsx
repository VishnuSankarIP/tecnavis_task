import React, { useState } from 'react'
import Dashheader from '../Components/Dashheader'
import Sidebar from '../Components/Sidebar'
import DashHome from '../Components/DashHome'

function Dashboard() {
 const [openSidebarToggle,setOpenSidebarToggle]=useState(false)

 const openSidebar=()=>{
  setOpenSidebarToggle(!openSidebarToggle)
 }

  return (
    <>
    <div className="grid-container">
      <Dashheader openSidebar={openSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar}/>
      <DashHome/>
    </div>
    </>
  )
}

export default Dashboard