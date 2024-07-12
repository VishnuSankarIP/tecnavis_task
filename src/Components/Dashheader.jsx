import React from 'react'
import { Form } from 'react-bootstrap'
import { BsJustify } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Dashheader({openSidebar,setSearchKey}) {

  const handleLogout=()=>{
    sessionStorage.clear()
    navigate('/')
  }

  return (
   <>
   <header className='header'>
        <div className='menu-icon'>
        <BsJustify className='icon' onClick={openSidebar}/>
        </div>
        <div className="header-left me-2">
           
            <div className="searchDiv ">
            <Form.Control
              type="text"
              placeholder="Search"
              className="searchbar mr-sm-2"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            </div>
        </div>
        <div className="header-right">
         <Link to={'/'}> <button onClick={handleLogout} className='btnlogout rounded'>Logout<i class="fa-solid fa-right-from-bracket ms-2" style={{color:'white'}}></i></button></Link> 
        </div>
    </header>
   </>
  )
}

export default Dashheader