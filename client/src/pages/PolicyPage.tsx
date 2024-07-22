import React, { useEffect, useState } from "react"
import { FaCar, FaHome, FaBriefcase, FaHeartbeat } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { readContract } from "thirdweb"
import { useInsuranceContext } from "../contexts/context"
import { useActiveAccount } from "thirdweb/react"
import { createWallet } from "thirdweb/wallets"
import { prepareContractCall, sendTransaction } from "thirdweb"
import { ethers } from "ethers"

interface InsuranceScheme {
  pid: number
  creator: string
  name: string
  description: string
  coverage: string
  // interest_rate: number
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
  const address = useActiveAccount()?.address
  const [ethAmount, setEthAmount] = useState<string>("")
  const navigate = useNavigate()
  const [registered, setRegistered] = useState(false)
  const { contract, client } = useInsuranceContext()
  const [policy, setPolicy] = useState<InsuranceScheme | null>(null)

  const getRegisterInfo = async () => {
    if (address) {
      const data = await readContract({
        contract,
        method: "function isACustomer(address) view returns (bool)",
        params: [address],
      })
      setRegistered(data)
    }
  }
  console.log(pid)
  const getPolicy = async () => {
    try {
      const data: any = await readContract({
        contract,
        method:
          "function getInsurance(uint256 _pid) view returns ((uint256 pid, address creator, string name, string description, string coverage, uint256 min_deposition_amount, uint256 deposit_amount_monthwise, uint256 duration, uint256 totalamount, uint256 no_of_investors, string insurance_type, uint256 safe_fees, address[] inverstorPid))",
        params: [BigInt(pid)],
      })

      console.log(data) // Check the structure

      const formattedData: InsuranceScheme = {
        pid: Number(data.pid),
        creator: data.creator,
        name: data.name,
        description: data.description,
        coverage: data.coverage,
        min_deposition_amount: Number(data.min_deposition_amount),
        deposit_amount_monthwise: Number(data.deposit_amount_monthwise),
        duration: Number(data.duration),
        totalamount: Number(data.totalamount),
        no_of_investors: Number(data.no_of_investors),
        insurance_type: data.insurance_type,
        safe_fees: Number(data.safe_fees),
        investorPid: data.inverstorPid.map(String),
      }

      setPolicy(formattedData)
    } catch (error) {
      console.error("Error fetching policy:", error)
    }
  }

  useEffect(() => {
    getRegisterInfo()
    getPolicy()
  }, [address])

  const handleNotRegistered = () => {
    navigate("/register")
  }

  const handleBuyPolicy = async () => {
    const wallet = createWallet("io.metamask")
    if (!registered) {
      handleNotRegistered()
    } else {
      const account = await wallet.connect({ client })
      const transaction = await prepareContractCall({
        contract,
        method: "function depositInitialAmount(uint256 _pid) payable",
        params: [BigInt(pid)],
        value: ethers.parseEther(ethAmount || "0"),
      })
      await sendTransaction({ transaction, account })
    }
  }

  if (!policy) {
    return <div>Loading policy...</div>
  }

  return (
    <div className="w-full flex justify-center items-center bg-po p-4 sm:p-8">
      <div className="max-w-7xl w-full blue-glassmorphism1 shadow-lg rounded-lg text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{policy.name}</h1>
          {policyTypeIcon(policy.insurance_type)}
        </div>
        <p className="mb-4 text-center sm:text-left">{policy.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xl">
          <div>
            <strong>Coverage: </strong> {policy.coverage}
          </div>
          <div>
            <strong>Min Deposition: </strong>
            {ethers.formatEther(String(policy.min_deposition_amount))}{" "}
            <span>Eth</span>
          </div>
          <div>
            <strong>Monthly Deposit:</strong>
            {ethers.formatEther(String(policy.deposit_amount_monthwise))}
            <span> Eth</span>
          </div>
          <div>
            <strong>Duration:</strong> {policy.duration} months
          </div>
          <div>
            <strong>Total Amount:</strong>
            {ethers.formatEther(String(policy.totalamount))}
            <span> Eth</span>
          </div>
          <div>
            <strong>No. of Investors:</strong> {policy.no_of_investors}
          </div>
          <div>
            <strong>Safe Fees:</strong>
            {ethers.formatEther(String(policy.safe_fees))}
            <span> Eth</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Enter ETH amount"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            className="p-2 border text-black outline-none border-green-500 rounded-xl flex-1 focus:border-teal-600 focus:border-4"
          />
          <button
            className="bg-green-500 border-teal-500 border-2 rounded-lg text-white py-2 px-4 hover:bg-green-600"
            onClick={handleBuyPolicy}
          >
            Buy Policy
          </button>
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
