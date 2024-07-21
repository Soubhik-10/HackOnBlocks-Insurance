import React from "react"
import { FaCar, FaHome, FaBriefcase, FaHeartbeat } from "react-icons/fa"
import Header from "../components/Header"

interface InsuranceScheme {
  pid: number
  creator: string
  name: string
  description: string
  coverage: string
  interest_rate: number
  min_deposition_amount: number
  deposit_amount_monthwise: number
  duration: number
  totalamount: number
  no_of_investors: number
  insurance_type: string
  safe_fees: number
  investorPid: string[]
}

interface PolicyPageProps {
  pid: number
}

const dummyPolicy: InsuranceScheme = {
  pid: 1,
  creator: "0x123456789",
  name: "Comprehensive Car Insurance",
  description: "Full coverage car insurance for your vehicle.",
  coverage: "Comprehensive",
  interest_rate: 5,
  min_deposition_amount: 1000,
  deposit_amount_monthwise: 100,
  duration: 12,
  totalamount: 1200,
  no_of_investors: 150,
  insurance_type: "Car",
  safe_fees: 50,
  investorPid: ["0x987654321"],
}

const policyTypeIcon = (type: string) => {
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

const PolicyPage: React.FC<PolicyPageProps> = ({ pid }) => {
  // Replace with actual data fetching logic
  const policy = dummyPolicy // In a real scenario, fetch based on pid

  return (
    <div className="h-screen w-full bg-po items-center">
      <Header />
      <div className="flex justify-center items-center mt-20">
        <div className="max-w-7xl w-full p-8 blue-glassmorphism shadow-lg rounded-lg min-h-[500px] text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{policy.name}</h1>
            {policyTypeIcon(policy.insurance_type)}
          </div>
          <p className="mb-4 text-white-700">{policy.description}</p>
          <div className="grid grid-cols-2 gap-8 mb-4 text-xl">
            <div>
              <strong>Coverage:</strong> {policy.coverage}
            </div>
            <div>
              <strong>Interest Rate:</strong> {policy.interest_rate}%
            </div>
            <div>
              <strong>Min Deposition:</strong> ${policy.min_deposition_amount}
            </div>
            <div>
              <strong>Monthly Deposit:</strong> $
              {policy.deposit_amount_monthwise}
            </div>
            <div>
              <strong>Duration:</strong> {policy.duration} months
            </div>
            <div>
              <strong>Total Amount:</strong> ${policy.totalamount}
            </div>
            <div>
              <strong>No. of Investors:</strong> {policy.no_of_investors}
            </div>
            <div>
              <strong>Safe Fees:</strong> ${policy.safe_fees}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Buy Policy
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              View Other Policies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
