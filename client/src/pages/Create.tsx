import React, { useState } from "react"
import Header from "../components/Header"
import { useInsuranceContext } from "../contexts/context"
import { useActiveAccount } from "thirdweb/react"
import { createWallet } from "thirdweb/wallets"
import { prepareContractCall, sendTransaction } from "thirdweb"
import { ethers } from "ethers"

const CreateInsuranceScheme: React.FC = () => {
  const [scheme, setScheme] = useState({
    name: "",
    description: "",
    coverage: "",
    min_deposition_amount: "",
    deposit_amount_monthwise: "",
    duration: 0,
    insurance_type: "",
    safe_fees: "",
  })

  const [createInsuranceSuccess, setCreateInsuranceSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { contract, client } = useInsuranceContext()
  const address = useActiveAccount()?.address
  const OWNER = import.meta.env.VITE_OWNER as string

  const handleRegister = async () => {
    try {
      if (
        scheme.name &&
        scheme.description &&
        scheme.coverage &&
        scheme.deposit_amount_monthwise &&
        scheme.insurance_type &&
        scheme.min_deposition_amount &&
        scheme.duration &&
        scheme.safe_fees
      ) {
        const wallet = createWallet("io.metamask")
        const account = await wallet.connect({ client })

        const transaction = await prepareContractCall({
          contract,
          method:
            "function createInsurance(string _name, string _description, string _coverage, uint256 _min_deposit_amount, uint256 _deposit_amount_monthwise, uint256 _duration, string _insurance_type, uint256 _safe_fees) payable",
          params: [
            scheme.name,
            scheme.description,
            scheme.coverage,
            ethers.parseEther(scheme.min_deposition_amount),
            ethers.parseEther(scheme.deposit_amount_monthwise),
            BigInt(scheme.duration),
            scheme.insurance_type,
            ethers.parseEther(scheme.safe_fees),
          ],
          value: ethers.parseEther(scheme.safe_fees),
        })

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        })

        if (transactionHash) {
          setCreateInsuranceSuccess(true)
          setTimeout(() => setCreateInsuranceSuccess(false), 3000)
          setScheme({
            name: "",
            description: "",
            coverage: "",
            min_deposition_amount: "",
            deposit_amount_monthwise: "",
            duration: 0,
            insurance_type: "",
            safe_fees: "",
          })
        }
      } else {
        setError("Please fill all fields correctly.")
      }
    } catch (err) {
      console.error("Error creating insurance scheme:", err)
      setError("Failed to create insurance scheme.")
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setScheme((prevScheme) => ({
      ...prevScheme,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleRegister()
  }

  return (
    <div className="h-screen bg-po overflow-hidden">
      <div className="-mt">
        <Header />
      </div>
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl p-2 border-2 border-green-500 rounded-lg blue-glassmorphism overflow-y-auto h-3/4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-white font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={scheme.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="insurance_type"
                className="block text-white font-bold mb-2"
              >
                Insurance Type
              </label>
              <select
                id="insurance_type"
                name="insurance_type"
                value={scheme.insurance_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              >
                <option value="">Select Insurance Type</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Car">Car</option>
                <option value="Home">Home</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block text-white font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={scheme.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="coverage"
              className="block text-white font-bold mb-2"
            >
              Coverage
            </label>
            <input
              type="text"
              id="coverage"
              name="coverage"
              value={scheme.coverage}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="min_deposition_amount"
                className="block text-white font-bold mb-2"
              >
                Min Deposition Amount
              </label>
              <input
                type="text"
                id="min_deposition_amount"
                name="min_deposition_amount"
                value={scheme.min_deposition_amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="deposit_amount_monthwise"
                className="block text-white font-bold mb-2"
              >
                Deposit Amount Monthwise
              </label>
              <input
                type="text"
                id="deposit_amount_monthwise"
                name="deposit_amount_monthwise"
                value={scheme.deposit_amount_monthwise}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-white font-bold mb-2"
              >
                Duration
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={scheme.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="safe_fees"
                className="block text-white font-bold mb-2"
              >
                Safe Fees
              </label>
              <input
                type="text"
                id="safe_fees"
                name="safe_fees"
                value={scheme.safe_fees}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mt-4 pt-4 rounded w-full"
          >
            Create Scheme
          </button>

          {createInsuranceSuccess && (
            <p className="text-green-500">Scheme created successfully!</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default CreateInsuranceScheme
