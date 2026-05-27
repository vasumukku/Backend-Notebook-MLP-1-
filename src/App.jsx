import React from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router'

import Login from './pages/Login'
import Signin from './pages/Signin'
import Notebook from './pages/Notebook'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} /> 
          <Route path="/signin" element={<Signin />} /> 
          <Route path="/Notebook" element={<Notebook />} /> 

         
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
