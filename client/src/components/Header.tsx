import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ConnectButton, useActiveAccount } from "thirdweb/react"
import { useInsuranceContext } from "../contexts/context"
import { FaBars, FaTimes } from "react-icons/fa"
import logo from "../assets/logo.jpeg"

const Header: React.FC = () => {
  const { wallets, client } = useInsuranceContext()
  const address = useActiveAccount()?.address
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="p-2 flex flex-col lg:flex-row justify-start items-center sticky top-0 z-10 h-18 mt-0 ">
      <div className="flex items-center w-full lg:w-auto">
        <div className="flex justify-center items-center bg-white rounded-full w-14 h-14">
          <Link to="/">
            <img src={logo} alt="logo" className="rounded-full" />
          </Link>
        </div>
        <div className="lg:hidden flex items-center ml-4">
          <button onClick={toggleMenu} className="text-xl text-white">
            {isOpen ? <FaTimes color="white" /> : <FaBars color="white" />}
          </button>
          <div className="ml-2">
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
      <div
        className={`${
          isOpen ? "flex blue-glassmorphism text-white" : "hidden"
        } lg:flex lg:flex-row flex-col w-full lg:w-auto gap-4 lg:gap-6 items-center bg-white p-2 border-2 shadow-md border-teal-500 mt-4 lg:mt-0 rounded-3xl`}
      >
        <nav
          className={`flex flex-col lg:flex-row gap-4 lg:gap-6 items-center ${
            isOpen ? " text-white" : "text-black"
          }`}
        >
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
        <div className="hidden lg:flex lg:ml-4">
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
