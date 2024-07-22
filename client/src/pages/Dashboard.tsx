import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { FaUser, FaCrown } from "react-icons/fa"
import { readContract } from "thirdweb"
import { useActiveAccount } from "thirdweb/react"
import { useNavigate } from "react-router-dom"
import { useInsuranceContext } from "../contexts/context"
import InvestmentCard from "../components/InvestmentCard"

interface Investment {
  pid: number
  creator: string
  name: string
  description: string
  coverage: string
  min_deposition_amount: number
  deposit_amount_monthwise: number
  duration: number
  totalamount: number
  no_of_investors: number
  insurance_type: string
  safe_fees: number
}

const Dashboard = () => {
  const [isUser, setIsUser] = useState(true)
  const [investments, setInvestments] = useState<Investment[]>([])
  const address = useActiveAccount()?.address
  const navigate = useNavigate()
  const [registered, setRegistered] = useState(false)
  const { contract } = useInsuranceContext()

  const toggleRole = () => {
    setIsUser(!isUser)
  }

  const getRegisterInfo = async () => {
    if (address) {
      try {
        const data = await readContract({
          contract,
          method: "function isACustomer(address) view returns (bool)",
          params: [address],
        })
        console.log("Registered:", data)
        setRegistered(data)
      } catch (error) {
        console.error("Error fetching registration info:", error)
      }
    }
  }

  const getInvestmentsbyUser = async () => {
    if (address && registered) {
      try {
        const data = await readContract({
          contract,
          method:
            "function investment_bought(address) view returns ((uint256 pid, address creator, string name, string description, string coverage, uint256 min_deposition_amount, uint256 deposit_amount_monthwise, uint256 duration, uint256 totalamount, uint256 no_of_investors, string insurance_type, uint256 safe_fees)[])",
          params: [address],
        })

        const formattedData = data.map((item: any) => ({
          pid: Number(item.pid),
          creator: item.creator,
          name: item.name,
          description: item.description,
          coverage: item.coverage,
          min_deposition_amount: Number(item.min_deposition_amount),
          deposit_amount_monthwise: Number(item.deposit_amount_monthwise),
          duration: Number(item.duration),
          totalamount: Number(item.totalamount),
          no_of_investors: Number(item.no_of_investors),
          insurance_type: item.insurance_type,
          safe_fees: Number(item.safe_fees),
        }))

        formattedData.push({
          pid: 9299,
          creator: "0x123",
          name: "Dummy Insurance",
          description: "This is a dummy insurance policy.",
          coverage: "Basic",
          min_deposition_amount: 1000,
          deposit_amount_monthwise: 100,
          duration: 12,
          totalamount: 1200,
          no_of_investors: 50,
          insurance_type: "Car",
          safe_fees: 10,
        })

        setInvestments(formattedData)
        console.log("Investments:", formattedData)
      } catch (error) {
        console.error("Error fetching investments:", error)
      }
    }
  }

  useEffect(() => {
    getRegisterInfo()
  }, [address])

  useEffect(() => {
    if (true) {
      getInvestmentsbyUser()
    } else {
      handleNotRegistered()
    }
  }, [registered])

  const handleNotRegistered = () => {
    // navigate("/register")
  }

  return (
    <div className="h-screen bg-po">
      <div className="flex flex-row justify-between">
        <div>
          <Header />
        </div>
        <div className="flex justify-end p-4 bg-white rounded-bl-3xl">
          <button
            className={`flex items-center px-4 py-2 mr-2 border-2 border-black ${
              isUser ? "bg-teal-500" : "bg-teal-100 text-black"
            } rounded-xl hover:bg-teal-600`}
            onClick={toggleRole}
          >
            <FaUser className="mr-2" />
            User
          </button>
          <button
            className={`flex items-center px-4 py-2 border-2 border-black ${
              !isUser ? "bg-teal-500" : "bg-teal-100 text-black"
            } rounded-xl hover:bg-teal-600`}
            onClick={toggleRole}
          >
            <FaCrown className="mr-2" />
            Creator
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        {isUser ? (
          <div className="p-4 overflow-x-auto">
            <div className="flex gap-4">
              {investments.map((investment) => (
                <InvestmentCard key={investment.pid} investment={investment} />
              ))}
            </div>
          </div>
        ) : (
          <div>Creator Content</div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
