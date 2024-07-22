import React, { useEffect, useState } from "react"
import { FaCar, FaHome, FaBriefcase, FaHeartbeat } from "react-icons/fa"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"
import { readContract } from "thirdweb"
import { useInsuranceContext } from "../contexts/context"
import { useActiveAccount, useSendTransaction } from "thirdweb/react"
import { createWallet } from "thirdweb/wallets"
import { prepareContractCall, sendTransaction } from "thirdweb"
import { ethers } from "ethers"
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
  const address = useActiveAccount()?.address
  const [ethAmount, setEthAmount] = useState<string>("")
  const navigate = useNavigate()
  const [registered, setRegistered] = useState(false)
  const { contract, client } = useInsuranceContext()
  const getRegisterInfo = async () => {
    if (address) {
      const data = await readContract({
        contract,
        method: "function isACustomer(address) view returns (bool)",
        params: [address],
      })
      console.log(data)
      setRegistered(data)
    }
  }

  useEffect(() => {
    getRegisterInfo()
    return () => {}
  }, [])
  const handleNotRegistered = () => {
    navigate("/register")
  }
  const handleBuyPolicy = async () => {
    const wallet = createWallet("io.metamask")
    if (!registered) {
      handleNotRegistered()
      console.log(registered)
    } else {
      const account = await wallet.connect({
        // pass the client you created with `createThirdwebClient()`
        client,
      })
      const transaction = await prepareContractCall({
        contract,
        method: "function depositInitialAmount(uint256 _pid) payable",
        params: [BigInt(pid)],
        value: ethers.parseEther(ethAmount || "0"),
      })
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      })
    }
  }

  // Replace with actual data fetching logic
  const policy = dummyPolicy // In a real scenario, fetch based on pid

  return (
    <div className="w-full bg-po items-center">
      <div className="flex justify-center items-center">
        <div className="max-w-7xl w-full p-8 blue-glassmorphism1 shadow-lg rounded-lg text-white">
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
            {/* <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleButtonClick}
            >
              View Other Policies
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
