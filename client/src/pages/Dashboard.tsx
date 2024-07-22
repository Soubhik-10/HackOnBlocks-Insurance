import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { FaUser, FaCrown } from "react-icons/fa"
import { readContract } from "thirdweb"
import { useActiveAccount } from "thirdweb/react"
import { useNavigate } from "react-router-dom"
import { useInsuranceContext } from "../contexts/context"
import InvestmentCard from "../components/InvestmentCard"
import InvestmentMade from "../components/InvestmentMade"
import { ethers } from "ethers"

// Dashboard.tsx
import { Investment } from "../components/types" // Adjust the path as needed

const Dashboard = () => {
  const [isUser, setIsUser] = useState(true)
  const [userInvestments, setUserInvestments] = useState<Investment[]>([])
  const [creatorInvestments, setCreatorInvestments] = useState<Investment[]>([])
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

  const getUserInvestments = async () => {
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
          min_deposition_amount: ethers.formatEther(
            item.min_deposition_amount.toString(),
          ),
          deposit_amount_monthwise: ethers.formatEther(
            item.deposit_amount_monthwise.toString(),
          ),
          duration: Number(item.duration),
          totalamount: ethers.formatEther(item.totalamount.toString()),
          no_of_investors: Number(item.no_of_investors),
          insurance_type: item.insurance_type,
          safe_fees: ethers.formatEther(item.safe_fees.toString()),
        }))

        // Add a dummy investment for testing
        formattedData.push({
          pid: 9299,
          creator: "0x123",
          name: "Dummy Insurance",
          description: "This is a dummy insurance policy.",
          coverage: "Basic",
          min_deposition_amount: "1000",
          deposit_amount_monthwise: "100",
          duration: 12,
          totalamount: "1200",
          no_of_investors: 50,
          insurance_type: "Car",
          safe_fees: "10",
        })

        setUserInvestments(formattedData)
        console.log("User Investments:", formattedData)
      } catch (error) {
        console.error("Error fetching user investments:", error)
      }
    }
  }

  // const getCreatorInvestments = async () => {

  //   if (address && registered) {
  //     try {
  //       const data = await readContract({
  //         contract,
  //         method:
  //           "function investment_bought(address) view returns ((uint256 pid, address creator, string name, string description, string coverage, uint256 min_deposition_amount, uint256 deposit_amount_monthwise, uint256 duration, uint256 totalamount, uint256 no_of_investors, string insurance_type, uint256 safe_fees)[])",
  //         params: [address],
  //       })

  //       const formattedData = data.map((item: any) => ({
  //         pid: Number(item.pid),
  //         creator: item.creator,
  //         name: item.name,
  //         description: item.description,
  //         coverage: item.coverage,
  //         min_deposition_amount: ethers.formatEther(
  //           item.min_deposition_amount.toString(),
  //         ),
  //         deposit_amount_monthwise: ethers.formatEther(
  //           item.deposit_amount_monthwise.toString(),
  //         ),
  //         duration: Number(item.duration),
  //         totalamount: ethers.formatEther(item.totalamount.toString()),
  //         no_of_investors: Number(item.no_of_investors),
  //         insurance_type: item.insurance_type,
  //         safe_fees: ethers.formatEther(item.safe_fees.toString()),
  //       }))

  //       setCreatorInvestments(formattedData)
  //       console.log("Creator Investments:", formattedData)
  //     } catch (error) {
  //       console.error("Error fetching creator investments:", error)
  //     }
  //   }
  // }

  const getCreatorInvestments = async () => {
    console.log("yoooo")
    if (address) {
      try {
        // Fetch single investment data
        const data = await readContract({
          contract,
          method:
            "function investment_made(address) view returns (uint256 pid, address creator, string name, string description, string coverage, uint256 min_deposition_amount, uint256 deposit_amount_monthwise, uint256 duration, uint256 totalamount, uint256 no_of_investors, string insurance_type, uint256 safe_fees)",
          params: [address],
        })

        console.log("Raw data:", data)

        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format")
        }

        // Map raw data to an object
        const formattedData: Investment = {
          pid: Number(data[0]),
          creator: data[1],
          name: data[2],
          description: data[3],
          coverage: data[4],
          min_deposition_amount: ethers.formatEther(data[5].toString()),
          deposit_amount_monthwise: ethers.formatEther(data[6].toString()),
          duration: Number(data[7]),
          totalamount: ethers.formatEther(data[8].toString()),
          no_of_investors: Number(data[9]),
          insurance_type: data[10],
          safe_fees: ethers.formatEther(data[11].toString()),
        }

        setCreatorInvestments([formattedData]) // Store as array
        console.log("Creator Investments:", [formattedData])
      } catch (error) {
        console.error("Error fetching creator investments:", error)
      }
    }
  }

  useEffect(() => {
    if (true) {
      if (isUser) {
        getUserInvestments()
      } else {
        getCreatorInvestments()
      }
    } else {
      handleNotRegistered()
    }
  }, [registered, isUser])

  const handleNotRegistered = () => {
    // Uncomment this to redirect if not registered
    // navigate("/register")
  }

  return (
    <div className="h-screen bg-po">
      <div className="flex flex-row justify-between">
        <Header />
        <div className=" justify-between p-4  rounded-bl-3xl">
          <div className="flex justify-end">
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
      </div>
      <div className="flex-1 flex justify-center items-center p-4 overflow-x-auto">
        {isUser ? (
          <div className="flex gap-4">
            {userInvestments.map((investment) => (
              <InvestmentCard key={investment.pid} investment={investment} />
            ))}
          </div>
        ) : (
          <div className="flex gap-4">
            {creatorInvestments.map((investment) => (
              <InvestmentMade key={investment.pid} investment={investment} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
