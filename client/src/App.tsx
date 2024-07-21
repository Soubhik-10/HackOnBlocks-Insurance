// App.tsx
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Policies from "./components/Policies"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Policies />} />
      </Routes>
    </Router>
  )
}

export default App
