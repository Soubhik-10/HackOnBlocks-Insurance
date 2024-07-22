import React, { useState } from "react"
import { prepareContractCall, sendTransaction } from "thirdweb"
import { useInsuranceContext } from "../context/context"
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
  const [ethAmount, setEthAmount] = useState("")
  const { contract, client } = useInsuranceContext()

  const handlePayMoney = async () => {
    // Logic to handle premium payment
    const transaction = prepareContractCall({
      contract,
      method: "function payMoney(uint256 _pid) payable",
      params: [BigInt(investment.pid)],
      value: ethers.parseEther("0"),
    })
    const wallet = createWallet("io.metamask")
    const account = await wallet.connect({
      // pass the client you created with createThirdwebClient()
      client,
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    })
    console.log(
      `Paying customers their money for PID: ${investment.pid} with  ETH,`,
    )
  }

  const handleWithdraw = async () => {
    // Logic to handle claim request
    const transaction = prepareContractCall({
      contract,
      method: "function withdraw(uint256 _pid)",
      params: [BigInt(investment.pid)],
    })
    const wallet = createWallet("io.metamask")
    const account = await wallet.connect({
      // pass the client you created with createThirdwebClient()
      client,
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    })
    console.log(`Requesting withdraw for PID: ${investment.pid}`)
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
          <strong>Min Deposit:</strong> ${investment.min_deposition_amount}
        </div>
        <div>
          <strong>Monthly Deposit:</strong> $
          {investment.deposit_amount_monthwise}
        </div>
        <div>
          <strong>Duration:</strong> {investment.duration} months
        </div>
        <div>
          <strong>Total Amount:</strong> ${investment.totalamount}
        </div>
        <div>
          <strong>Investors:</strong> {investment.no_of_investors}
        </div>
        <div>
          <strong>Safe Fees:</strong> ${investment.safe_fees}
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          placeholder="ETH Amount"
          className="p-2 border-gray-300 rounded-lg outline-none focus:border-teal-600 border-2"
        />
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
    </div>
  )
}

export default InvestmentMade
