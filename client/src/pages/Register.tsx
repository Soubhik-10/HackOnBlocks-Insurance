import React, { useState } from "react"
import Header from "../components/Header"
import { useInsuranceContext } from "../contexts/context"
import { useActiveAccount } from "thirdweb/react"
import { createWallet } from "thirdweb/wallets"
import { prepareContractCall, readContract, sendTransaction } from "thirdweb"
import { ethers } from "ethers"
const RegisterUser: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
  })
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { contract, client } = useInsuranceContext()
  const address = useActiveAccount()?.address
  const OWNER = import.meta.env.VITE_OWNER as string
  const isCustomer = async () => {
    if (!address) return false
    const data = await readContract({
      contract,
      method: "function isACustomer(address) view returns (bool)",
      params: [ethers.getAddress(address)],
    })
    return data
  }
  const handleRegister = async () => {
    try {
      if (user.name && user.age) {
        const customerExists = await isCustomer()
        if (customerExists) {
          setError("User is already registered.")
          return
        }

        const wallet = createWallet("io.metamask")
        const account = await wallet.connect({ client })

        const transaction = await prepareContractCall({
          contract,
          method: "function requestRegistration(string _name, uint256 _age)",
          params: [user.name, BigInt(user.age)],
        })

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        })

        if (transactionHash) {
          setRegisterSuccess(true)
          setTimeout(() => setRegisterSuccess(false), 3000)
          setUser({ name: "", age: "" })
        }
      } else {
        setError("Please fill all fields correctly.")
      }
    } catch (err) {
      console.error("Error adding user:", err)
      setError("Failed to add User.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
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
          className="w-full max-w-2xl p-6 border-2 border-green-500 rounded-lg blue-glassmorphism overflow-y-auto h-1/2"
        >
          <div className="mb-2">
            <label htmlFor="name" className="block text-white font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age" className="block text-white font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="mt-2 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Register User
          </button>
          {registerSuccess && (
            <p className="text-green-500 mt-2">Registration Successful!</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default RegisterUser
