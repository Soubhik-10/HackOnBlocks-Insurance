// Header.tsx
import React from "react"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
  return (
    <div className="p-2 flex justify-between items-center br-1 sticky top-4 z-10 shadow-md w-96 h-14 mt-2">
      <div className="flex items-center">
        <div className="flex justify-center items-center bg-white rounded-full w-14 h-14">
          Logo
        </div>
        <div className="flex gap-2 items-center bg-white br-1 h-14 p-2 rounded-lg">
          <nav className="flex gap-6 items-center">
            <Link
              to="/"
              className="text-lg font-semibold hover:bg-teal-300 hover:text-black rounded-full p-2"
            >
              Home
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
          <div className="rounded-full bg-gray-300 w-20 h-12 flex items-center justify-center">
            Connect
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
