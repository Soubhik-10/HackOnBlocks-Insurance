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
  const [loading, setLoading] = useState(true)
  const toggleRole = () => {
    setIsUser(!isUser)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getRegisterInfo()
      setLoading(false)
    }

    fetchData()
  }, [address])

  const getRegisterInfo = async () => {
    if (address) {
      try {
        const data = await readContract({
          contract,
          method: "function isACustomer(address) view returns (bool)",
          params: [address],
        })
        console.log("Fetched Registration Data:", data)
        setRegistered(data)
      } catch (error) {
        console.error("Error fetching registration info:", error)
      }
    }
  }

  const getUserInvestments = async () => {
    console.log("Fetching user investments...")
    if (address) {
      try {
        const data = await readContract({
          contract,
          method:
            "function getInvestmentsBought(address _address) view returns ((uint256 pid, address creator, string name, string description, string coverage, uint256 min_deposition_amount, uint256 deposit_amount_monthwise, uint256 duration, uint256 totalamount, uint256 no_of_investors, string insurance_type, uint256 safe_fees, address[] inverstorPid)[])",
          params: [address],
        })
        console.log("Raw data:", data)
        if (!Array.isArray(data)) throw new Error("Unexpected data format")
        const formattedData = data.map((investment) => ({
          pid: Number(investment[0]),
          creator: investment[1],
          name: investment[2],
          description: investment[3],
          coverage: investment[4],
          min_deposition_amount: ethers.formatEther(investment[5].toString()),
          deposit_amount_monthwise: ethers.formatEther(
            investment[6].toString(),
          ),
          duration: Number(investment[7]),
          totalamount: ethers.formatEther(investment[8].toString()),
          no_of_investors: Number(investment[9]),
          insurance_type: investment[10],
          safe_fees: ethers.formatEther(investment[11].toString()),
        }))
        setUserInvestments(formattedData)
        console.log("User Investments:", formattedData)
      } catch (error) {
        console.error("Error fetching user investments:", error)
      }
    }
  }

  const getCreatorInvestments = async () => {
    console.log("Fetching creator investments...")
    if (address) {
      try {
        const data = await readContract({
          contract,
          method:
            "function getInvestmentsMade(address _address) view returns ((uint256 pid, address creator, string name, string description, string coverage, uint256 min_deposition_amount, uint256 deposit_amount_monthwise, uint256 duration, uint256 totalamount, uint256 no_of_investors, string insurance_type, uint256 safe_fees, address[] inverstorPid)[])",
          params: [address],
        })
        console.log("Raw data:", data) // Log raw data

        if (!Array.isArray(data)) throw new Error("Unexpected data format")

        // Helper function to convert bigint to Ether (formatted as string)
        const convertBigIntToEther = (bigintValue: bigint): string => {
          // Convert bigint to number and divide by 1e18
          return (Number(bigintValue) / 1e18).toFixed(4) // Format to 4 decimal places
        }

        // Map raw data to formatted data
        const formattedData = data
          .map((investment: any) => {
            if (!investment) {
              console.warn("Skipping undefined investment:", investment)
              return null // Return null if investment is not valid
            }

            return {
              pid: investment.pid ? Number(investment.pid) : 0,
              creator: investment.creator || "",
              name: investment.name || "",
              description: investment.description || "",
              coverage: investment.coverage || "",
              min_deposition_amount: investment.min_deposition_amount
                ? convertBigIntToEther(investment.min_deposition_amount)
                : "0",
              deposit_amount_monthwise: investment.deposit_amount_monthwise
                ? convertBigIntToEther(investment.deposit_amount_monthwise)
                : "0",
              duration: investment.duration ? Number(investment.duration) : 0,
              totalamount: investment.totalamount
                ? convertBigIntToEther(investment.totalamount)
                : "0",
              no_of_investors: investment.no_of_investors
                ? Number(investment.no_of_investors)
                : 0,
              insurance_type: investment.insurance_type || "",
              safe_fees: investment.safe_fees
                ? convertBigIntToEther(investment.safe_fees)
                : "0",
            }
          })
          .filter((item): item is Investment => item !== null) // Type predicate to filter null values

        console.log("Formatted Data:", formattedData) // Log formatted data
        setCreatorInvestments(formattedData as Investment[])
      } catch (error) {
        console.error("Error fetching creator investments:", error)
      }
    }
  }

  useEffect(() => {
    if (loading) return // Do nothing while loading

    if (registered) {
      if (isUser) {
        getUserInvestments()
      } else {
        getCreatorInvestments()
      }
    } else {
      console.log("Navigating to register...")
      handleNotRegistered()
    }
  }, [registered, isUser, loading])

  const handleNotRegistered = () => {
    console.log("Redirecting to register page...")
    setTimeout(() => {
      // navigate("/register")
    }, 10000) // Delay of 10 seconds
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
