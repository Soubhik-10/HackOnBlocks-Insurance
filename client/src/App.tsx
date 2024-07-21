// App.tsx
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Policies from "./components/Policies"
import CreateInsuranceScheme from "./pages/Create"
import PolicyPage from "./pages/PolicyPage"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Policies />} />
        <Route path="/create" element={<CreateInsuranceScheme />} />
        <Route path="/dashboard" element={<PolicyPage pid={4} />} />
      </Routes>
    </Router>
  )
}

export default App
