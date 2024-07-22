// Header.tsx
import React from "react"
import { Link } from "react-router-dom"
import { createThirdwebClient } from "thirdweb"
import { ConnectButton } from "thirdweb/react"
import { createWallet, walletConnect } from "thirdweb/wallets"
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
]
const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID",
})
const Header: React.FC = () => {
  return (
    <div className="p-2 flex justify-between items-center br-1 sticky top-4 z-10 h-14 mt-2">
      <div className="flex items-center">
        <div className="flex justify-center items-center bg-white rounded-full w-14 h-14 ">
          <Link to="/">Logo</Link>
        </div>
        <div className="flex gap-2 items-center bg-white br-1 h-[60px] p-2 rounded-lg border-2 shadow-md border-teal-500">
          <nav className="flex gap-6 items-center text-black">
            <Link
              to="/"
              className="text-lg font-semibold hover:bg-teal-300 hover:text-black rounded-full p-2"
            >
              Home
            </Link>
            <Link
              to="/Register"
              className="text-lg font-semibold hover:bg-teal-300 hover:text-black rounded-full p-2"
            >
              Register
            </Link>
            <Link
              to="/Dashboard"
              className="text-lg font-semibold hover:bg-teal-300 hover:text-black rounded-full p-2"
            >
              Dashboard
            </Link>
            <Link
              to="/services"
              className="text-lg font-semibold hover:bg-teal-300 hover:text-black rounded-full p-2"
            >
              Services
            </Link>
            <Link
              to="/create"
              className="text-lg font-semibold hover:bg-teal-300 hover:text-black rounded-full p-2"
            >
              Create
            </Link>
          </nav>
        </div>
        <div className="rounded-xl flex items-center justify-center ml-2 border-2 border-teal-500">
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={"light"}
            connectButton={{ label: "Connect" }}
            connectModal={{ size: "compact" }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
