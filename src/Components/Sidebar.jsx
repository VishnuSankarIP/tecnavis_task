import React from 'react'
import '../dashboard.css'
function Sidebar({ openSidebarToggle,openSidebar}) {
  return (
    <>

<aside id="sidebar" className={openSidebarToggle?"sidebar-responsive":""}>
<div className='sidebar-title'>
      <div className="sidebar-brand">
     Employee portal
      </div>
      <span className='icon close_icon' onClick={openSidebar}>X</span>
    </div>

    <ul className='sidebar-list'>
      <li className='sidebar-list-item'>
      <a href=''>
        Dashboard
      </a>
      </li>
      
      <li className='sidebar-list-item'>
      <a href=''>
       Categories
      </a>
      </li>
      <li className='sidebar-list-item'>
      <a href=''>
        Customers
      </a>
      </li>
     
     
     
    </ul>
</aside>
    </>
  )
}

export default Sidebar