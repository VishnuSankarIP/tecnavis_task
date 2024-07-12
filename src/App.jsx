import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     </Routes>
    </>
  )
}

export default App
