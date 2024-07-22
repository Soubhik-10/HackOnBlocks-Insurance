// App.tsx
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Policies from "./components/Policies"
import CreateInsuranceScheme from "./pages/Create"
import { InsuranceContextProvider } from "./contexts/context"
import Dashboard from "./pages/Dashboard"
import RegisterUser from "./pages/Register"

const App: React.FC = () => {
  return (
    <InsuranceContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Policies />} />
          <Route path="/create" element={<CreateInsuranceScheme />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </InsuranceContextProvider>
  )
}

export default App
