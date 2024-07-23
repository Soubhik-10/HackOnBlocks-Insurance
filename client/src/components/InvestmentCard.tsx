import React, { useState } from "react"
import { prepareContractCall, sendTransaction } from "thirdweb"
import { createWallet } from "thirdweb/wallets"
import { ethers } from "ethers"
import { useInsuranceContext } from "../contexts/context"

interface Investment {
  pid: number
  creator: string
  name: string
  description: string
  coverage: string
  min_deposition_amount: string
  deposit_amount_monthwise: string
  duration: number
  totalamount: string
  no_of_investors: number
  insurance_type: string
  safe_fees: string
}

const InvestmentCard: React.FC<{ investment: Investment }> = ({
  investment,
}) => {
  const [ethAmount, setEthAmount] = useState("")
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null,
  )
  const { contract, client } = useInsuranceContext()

  const handlePayPremium = async () => {
    try {
      setTransactionStatus(null)
      const transaction = await prepareContractCall({
        contract,
        method: "function depositMonthly(uint256 _pid) payable",
        params: [BigInt(investment.pid)],
        value: ethers.parseEther(ethAmount),
      })
      const wallet = createWallet("io.metamask")
      const account = await wallet.connect({
        client,
      })
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      })
      setTransactionStatus("Payment successful for PID: " + investment.pid)
      console.log(
        `Paying premium for PID: ${investment.pid} with amount ${ethAmount} ETH`,
      )
    } catch (error) {
      console.error("Error paying premium:", error)
      setTransactionStatus("Error paying premium")
    }
  }

  const handleRequestClaim = async () => {
    try {
      setTransactionStatus(null)
      const transaction = await prepareContractCall({
        contract,
        method: "function requestMoney(uint256 _pid)",
        params: [BigInt(investment.pid)],
      })
      const wallet = createWallet("io.metamask")
      const account = await wallet.connect({
        client,
      })
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      })
      setTransactionStatus(
        "Claim request successful for PID: " + investment.pid,
      )
      console.log(`Requesting claim for PID: ${investment.pid}`)
    } catch (error) {
      console.error("Error requesting claim:", error)
      setTransactionStatus("Error requesting claim")
    }
  }

  return (
    <div className="border-4 border-white text-white p-4 rounded-xl mt-2 m-2 shadow-md blue-glassmorphism flex flex-col justify-between items-start mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <h2 className="text-xl font-bold mb-2 text-center sm:text-left">
        {investment.name}
      </h2>
      {/* <p className="text-white mb-2 text-center sm:text-left">
        {investment.description}
      </p> */}
      <div className="flex flex-col gap-1 mb-4">
        <div>
          <strong>Coverage:</strong> {investment.coverage}
        </div>
        <div>
          <strong>Type:</strong> {investment.insurance_type}
        </div>
        <div>
          <strong>Min Deposit:</strong> {investment.min_deposition_amount} ETH
        </div>
        <div>
          <strong>Monthly Deposit:</strong>{" "}
          {investment.deposit_amount_monthwise} ETH
        </div>
        <div>
          <strong>Duration:</strong> {investment.duration} months
        </div>
        <div>
          <strong>Total Amount:</strong> {investment.totalamount} ETH
        </div>
        <div>
          <strong>Investors:</strong> {investment.no_of_investors}
        </div>
        <div>
          <strong>Safe Fees:</strong> {investment.safe_fees} ETH
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          placeholder="ETH Amount"
          className="p-2 text-black h-12 border-gray-300 rounded-lg outline-none focus:border-teal-600 border-2 w-full sm:w-auto"
        />
        <button
          className="bg-teal-500 h-12 text-white py-1 px-1 rounded hover:bg-teal-600 w-full sm:w-auto"
          onClick={handlePayPremium}
        >
          Pay Premium
        </button>
        <button
          className="bg-red-500 h-12 text-white py-1 px-1 rounded hover:bg-red-600 w-full sm:w-auto"
          onClick={handleRequestClaim}
        >
          Request Claim
        </button>
      </div>
      {transactionStatus && (
        <div
          className={`mt-4 p-2 rounded ${
            transactionStatus.includes("successful")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {transactionStatus}
        </div>
      )}
    </div>
  )
}

export default InvestmentCard
