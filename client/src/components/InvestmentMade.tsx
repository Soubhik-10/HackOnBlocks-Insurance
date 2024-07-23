import React, { useState } from "react"
import { prepareContractCall, sendTransaction } from "thirdweb"
import { useInsuranceContext } from "../contexts/context"
import { createWallet } from "thirdweb/wallets"
import { ethers } from "ethers"

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

const InvestmentMade: React.FC<{ investment: Investment }> = ({
  investment,
}) => {
  const { contract, client } = useInsuranceContext()
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null,
  )

  const handlePayMoney = async () => {
    try {
      setTransactionStatus(null)
      // Convert ethAmount to Ether
      const transaction = await prepareContractCall({
        contract,
        method: "function payMoney(uint256 _pid)",
        params: [BigInt(investment.pid)],
      })
      const wallet = createWallet("io.metamask")
      const account = await wallet.connect({ client })
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      })
      console.log(
        `Paying customers their money for PID: ${investment.pid} with ETH`,
      )
      setTransactionStatus("Pay Money transaction successful!")
    } catch (error) {
      console.error("Error paying money:", error)
      setTransactionStatus("Error paying money")
    }
  }

  const handleWithdraw = async () => {
    try {
      setTransactionStatus(null)
      const transaction = await prepareContractCall({
        contract,
        method: "function withdraw(uint256 _pid)",
        params: [BigInt(investment.pid)],
      })
      const wallet = createWallet("io.metamask")
      const account = await wallet.connect({ client })
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      })
      console.log(`Requesting withdraw for PID: ${investment.pid}`)
      setTransactionStatus("Withdraw transaction successful!")
    } catch (error) {
      console.error("Error withdrawing:", error)
      setTransactionStatus("Error withdrawing")
    }
  }

  return (
    <div className="border-4 border-white text-white p-4 rounded-xl mt-2 m-2 shadow-md blue-glassmorphism flex flex-col justify-between items-start mb-4">
      <h2 className="text-xl font-bold mb-2">{investment.name}</h2>
      <p className="text-white mb-2">{investment.description}</p>
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
          <strong>Monthly Deposit:</strong>
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
      <div className="flex gap-10 mb-4">
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
          onClick={handlePayMoney}
        >
          Pay Money
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleWithdraw}
        >
          Withdraw
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

export default InvestmentMade
