import React from "react"
import { FaHome, FaCar, FaHeartbeat } from "react-icons/fa"
import { BsSuitcaseLgFill } from "react-icons/bs"
const Home: React.FC = () => {
  return (
    <div className="bg-home h-screen w-full bg-slate-200">
      <div className="content ">
        <div className="p-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex justify-center items-center bg-white rounded-full w-14 h-14">
              Logo
            </div>
            <div className="flex gap-2 items-center bg-white w-auto br-1 border-1 h-14 p-2 rounded-lg sticky top-0">
              <nav className="flex gap-6 items-center">
                <a
                  href="#home"
                  className="text-lg font-semibold hover:bg-black hover:text-white rounded-full p-2"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-lg font-semibold hover:bg-black hover:text-white rounded-full p-2"
                >
                  About
                </a>
                <a
                  href="#services"
                  className="text-lg font-semibold hover:bg-black hover:text-white rounded-full p-2"
                >
                  Services
                </a>
                <a
                  href="#register"
                  className="text-lg font-semibold hover:bg-black hover:text-white rounded-full p-2"
                >
                  Register
                </a>
              </nav>
              <div className="rounded-full bg-emerald-300 w-20 h-12 flex items-center justify-center">
                Connect
              </div>
            </div>
          </div>
        </div>
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
              <button className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2">
                <FaHome />
                House
              </button>
              <button className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2">
                <FaCar />
                Car
              </button>
              <button className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2">
                <FaHeartbeat />
                Health
              </button>
              <button className="bg-transparent border-white border-4 font-bold text-white px-4 py-2 rounded-xl w-32 hover:bg-white hover:text-black flex items-center justify-center gap-2">
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
