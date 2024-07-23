import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import Home from "./pages/Home"
import Policies from "./components/Policies"
import CreateInsuranceScheme from "./pages/Create"
import { InsuranceContextProvider } from "./contexts/context"
import Dashboard from "./pages/Dashboard"
import RegisterUser from "./pages/Register"

const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const isAndroid = () => /Android/i.test(navigator.userAgent)
    const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent)

    if (isAndroid() || isIOS()) {
      setShowPopup(true)
    }
  }, [])

  const openMetaMask = () => {
    const metaMaskLink = "https://metamask.app.link/dapp/cryptocover.vercel.app"

    window.location.href = metaMaskLink
  }

  const handleCancel = () => {
    setShowPopup(false)
  }

  return (
    <InsuranceContextProvider>
      <div className="relative h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Policies />} />
            <Route path="/create" element={<CreateInsuranceScheme />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="popup blue-glassmorphism text-white p-4 w-60">
              <p className="mb-4">Do you want to open MetaMask?</p>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="flex items-center justify-center w-12 bg-teal-600 text-black py-1"
                  onClick={openMetaMask}
                >
                  Yes
                </button>
                <button
                  className="flex items-center justify-center w-12 bg-red-600 text-black py-1"
                  onClick={handleCancel}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InsuranceContextProvider>
  )
}

export default App
