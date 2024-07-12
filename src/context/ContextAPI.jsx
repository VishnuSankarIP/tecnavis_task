import React, { createContext, useState } from 'react'
export const addResponseContext=createContext()
export const editResponsecontext=createContext()

function ContextAPI({children}) {
    const [addResponse,setAddResponse]=useState("")
    const [editResponse,setEditResponse]=useState("")

  return (
    <>
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
       <editResponsecontext.Provider value={{editResponse,setEditResponse}}>
       {children}
       </editResponsecontext.Provider>
    </addResponseContext.Provider>
    </>
  )
}

export default ContextAPI