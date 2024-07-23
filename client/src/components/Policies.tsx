import React, { useEffect, useState } from "react"
import { FaCar, FaHome, FaBriefcase, FaHeartbeat } from "react-icons/fa"
import Header from "./Header"
import { readContract } from "thirdweb"
import { useInsuranceContext } from "../contexts/context"
import PolicyPage from "../pages/PolicyPage"
import Modal from "./Modal"

interface Policy {
  id: number
  name: string
  type: "Car" | "Home" | "Business" | "Health"
  duration: string
  coverage: string
  description: string
}

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
  const [policies, setPolicies] = useState<Policy[]>([])
  const [search, setSearch] = useState<string>("")
  const [filter, setFilter] = useState<string>(category || "")
  const [clicked, setClicked] = useState<number | null>(null)
  const { contract } = useInsuranceContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState("")

  const getInsurances = async () => {
    const data = await readContract({
      contract,
      method:
        "function getAllInsurances() view returns ((uint256 pid, address creator, string name, string description, string coverage, uint256 min_deposition_amount, uint256 deposit_amount_monthwise, uint256 duration, uint256 totalamount, uint256 no_of_investors, string insurance_type, uint256 safe_fees, address[] inverstorPid)[])",
      params: [],
    })
    console.log(data)
    const formattedPolicies = data.map((item) => ({
      id: Number(item.pid),
      name: item.name,
      type: item.insurance_type as Policy["type"],
      duration: `${item.duration} Year(s)`,
      coverage: item.coverage,
      description: item.description,
    }))

    setPolicies(formattedPolicies)
  }

  useEffect(() => {
    getInsurances()
  }, [])

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || policy.type === filter),
  )

  const toggleClick = (id: number) => {
    setClicked(id === clicked ? null : id)
  }

  const openModal = (description: string) => {
    setModalDescription(description)
    setIsModalOpen(true)
  }

  return (
    <div className="h-screen w-screen bg-po">
      <div className="mb-2 mr-10 relative">
        <Header />
      </div>
      <div className="w-9/12 mx-auto">
        <h1 className="text-3xl text-white font-bold mb-4 mt-8">
          Insurance Policies
        </h1>

        <div className="flex mb-4 md:gap-4 gap-2">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border outline-none border-green-500 rounded-xl flex-1
             focus:border-teal-600 focus:border-4 md:w-full w-48"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-green-500 rounded-xl outline-none
             focus:border-teal-600 focus:border-4 w-16 md:w-auto"
          >
            <option value="">All Types</option>
            <option value="Car">Car</option>
            <option value="Home">Home</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 overflow-scroll max-h-[480px]">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="border border-teal-500 p-4 rounded-xl shadow-md bg-white hover:bg-green-100 flex flex-col justify-between items-start"
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
              <div className="flex gap-4 mt-8 md:mt-0 ml-10">
                <button
                  className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
                  onClick={() => openModal(policy.description)}
                >
                  T&C
                </button>
                <button
                  onClick={() => toggleClick(policy.id)}
                  className="bg-emerald-800 text-white text-sm py-1 px-2 rounded-lg hover:bg-green-600"
                >
                  {clicked === policy.id ? "Hide Policy" : "View Policy"}
                </button>
              </div>
              {clicked === policy.id && (
                <div className="mt-4 w-full h-full">
                  <PolicyPage pid={policy.id} />
                </div>
              )}
            </div>
          ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Terms and Conditions"
          content={modalDescription}
        />
      </div>
    </div>
  )
}

export default InsuranceList
