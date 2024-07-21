// Home.tsx
import React from "react"
import { useNavigate } from "react-router-dom"
import { FaHome, FaCar, FaHeartbeat } from "react-icons/fa"
import { BsSuitcaseLgFill } from "react-icons/bs"
import Header from "../components/Header"

const Home: React.FC = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate("/services")
  }

  return (
    <div className="bg-home h-screen w-full bg-slate-200">
      <div className="content relative">
        <Header />
        <div className="flex flex-col justify-center items-center h-3/4 mt-40">
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="text-center text-8xl font-bold text-white font-serif mt-12 mr-48">
              From Home to Health
            </div>
          </div>
          <div className="w-full flex justify-center mt-10 ml-4">
            <div className="text-center text-8xl font-bold text-white font-serif">
              We Cover Everything
            </div>
          </div>
          <div className="text-center ml-4 mt-8">
            <p className="text-xl text-white mb-2">Find your plans here!</p>
            <div className="flex flex-row justify-center gap-4 border-white p-2">
              <button
                onClick={handleButtonClick}
                className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2"
              >
                <FaHome />
                House
              </button>
              <button
                onClick={handleButtonClick}
                className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2"
              >
                <FaCar />
                Car
              </button>
              <button
                onClick={handleButtonClick}
                className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2"
              >
                <FaHeartbeat />
                Health
              </button>
              <button
                onClick={handleButtonClick}
                className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2"
              >
                <BsSuitcaseLgFill />
                Business
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home