// App.tsx
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Policies from "./components/Policies"
import CreateInsuranceScheme from "./pages/Create"
import PolicyPage from "./pages/PolicyPage"
import RegisterUser from "./pages/Register"
import { ThirdwebProvider } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
export const client = createThirdwebClient({
  clientId: "89a5e5b847b9dbdf1aa28f3b1363cc9e",
});
const App: React.FC = () => {
  return (
    <ThirdwebProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Policies />} />
        <Route path="/create" element={<CreateInsuranceScheme />} />
        <Route path="/dashboard" element={<PolicyPage pid={4} />} />
        <Route path="/register" element={<RegisterUser/>}/>
      </Routes>
    </Router>
    </ThirdwebProvider>
  )
}

export default App
