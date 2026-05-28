import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { Toaster } from "react-hot-toast";

import Login from './pages/Login';

import Signin from './pages/Signin';

import Notebook from './pages/Notebook';

const App = () => {

  const token =
    localStorage.getItem("token");

  return (

    <div>

      <BrowserRouter>

        {/* TOAST */}

        <Toaster position="top-right" />

        <Routes>

          {/* LOGIN PAGE */}

          <Route
            path="/"
            element={
              token
                ? <Navigate to="/notebook" />
                : <Login />
            }
          />

          {/* SIGNIN PAGE */}

          <Route
            path="/signin"
            element={<Signin />}
          />

          {/* PROTECTED NOTEBOOK PAGE */}

          <Route
            path="/notebook"
            element={
              token
                ? <Notebook />
                : <Navigate to="/" />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App;