import React from "react";
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
// import Ad from "./components/Ad"
// import Login from "./components/Login"

import "./App.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Login /> */}
      {/* <Ad /> */}
      <Outlet />
    </div>
  )
}

export default App