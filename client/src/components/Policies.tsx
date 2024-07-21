import React, { useState } from "react"
import { FaCar, FaHome, FaBriefcase, FaHeartbeat } from "react-icons/fa"
import Header from "./Header"

interface Policy {
  id: number
  name: string
  type: "Car" | "Home" | "Business" | "Health"
  duration: string
  coverage: string
}

const initialPolicies: Policy[] = [
  {
    id: 1,
    name: "Car Insurance",
    type: "Car",
    duration: "1 Year",
    coverage: "Comprehensive",
  },
  {
    id: 2,
    name: "Home Insurance",
    type: "Home",
    duration: "5 Years",
    coverage: "Fire & Theft",
  },
  {
    id: 3,
    name: "Business Insurance",
    type: "Business",
    duration: "3 Years",
    coverage: "Liability",
  },
  {
    id: 4,
    name: "Health Insurance",
    type: "Health",
    duration: "1 Year",
    coverage: "Full Coverage",
  },
]

const policyTypeIcon = (type: Policy["type"]) => {
  switch (type) {
    case "Car":
      return <FaCar className="text-blue-500 text-2xl" />
    case "Home":
      return <FaHome className="text-green-500 text-2xl" />
    case "Business":
      return <FaBriefcase className="text-yellow-500 text-2xl" />
    case "Health":
      return <FaHeartbeat className="text-red-500 text-2xl" />
    default:
      return null
  }
}

interface InsuranceListProps {
  category?: string
}

const InsuranceList: React.FC<InsuranceListProps> = ({ category }) => {
  const [policies] = useState<Policy[]>(initialPolicies)
  const [search, setSearch] = useState<string>("")
  const [filter, setFilter] = useState<string>(category || "")

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || policy.type === filter),
  )

  return (
    <div className="h-screen w-screen bg-po">
      <div className="mb-2 mr-10 relative">
        <Header />
      </div>
      <div className="w-9/12 mx-auto">
        <h1 className="text-3xl text-white font-bold mb-4 mt-8">
          Insurance Policies
        </h1>

        <div className="flex mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border outline-none border-green-500 rounded flex-1 focus:border-teal-600 focus:border-4"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-green-500 rounded"
          >
            <option value="">All Types</option>
            <option value="Car">Car</option>
            <option value="Home">Home</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 overflow-y-auto h-96 custom-scrollbar">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="border border-teal-500 p-4 rounded-xl shadow-md bg-white hover:bg-green-100 flex flex-col md:flex-row justify-between items-start"
            >
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-lg flex-1">
                    {policy.name}
                  </span>
                  <span className="flex items-center gap-2 text-lg">
                    {policyTypeIcon(policy.type)}
                    <span>{policy.type}</span>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold w-24">Duration:</span>
                    <span className="flex-1">{policy.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold w-24">Coverage:</span>
                    <span className="flex-1">{policy.coverage}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0 ml-10">
                <button className="bg-black text-white text-sm py-1 px-2 rounded-lg hover:bg-blue-600">
                  View T&C
                </button>
                <button className="bg-emerald-800 text-white text-sm py-1 px-2 rounded-lg hover:bg-green-600">
                  View Policy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InsuranceList
