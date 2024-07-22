import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { ThirdwebProvider } from "thirdweb/react"
import "./index.css"
import { InsuranceContextProvider } from "./context/context"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <InsuranceContextProvider>
      <App />
      </InsuranceContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
)
