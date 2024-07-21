import React, { useState } from "react"
import Header from "../components/Header"

const CreateInsuranceScheme: React.FC = () => {
  const [scheme, setScheme] = useState({
    pid: 0,
    creator: "",
    name: "",
    description: "",
    coverage: "",
    interest_rate: 0,
    min_deposition_amount: 0,
    deposit_amount_monthwise: 0,
    duration: 0,
    totalamount: 0,
    // no_of_investors: 0,
    insurance_type: "",
    safe_fees: 0,
    terms_conditions: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setScheme((prevScheme) => ({
      ...prevScheme,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(scheme)
    // Add logic to handle the submission
  }

  return (
    <div className="h-screen bg-po overflow-hidden">
      <div className="-mt">
        <Header />
      </div>
      <div className="flex justify-center items-center h-full ">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl p-6 border-2 border-green-500 rounded-lg blue-glassmorphism overflow-y-auto h-3/4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pid" className="block text-white font-bold mb-2">
                PID
              </label>
              <input
                type="number"
                id="pid"
                name="pid"
                value={scheme.pid}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="creator"
                className="block text-white font-bold mb-2"
              >
                Creator
              </label>
              <input
                type="text"
                id="creator"
                name="creator"
                value={scheme.creator}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
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
              <input
                type="text"
                id="insurance_type"
                name="insurance_type"
                value={scheme.insurance_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
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
                htmlFor="interest_rate"
                className="block text-white font-bold mb-2"
              >
                Interest Rate
              </label>
              <input
                type="number"
                id="interest_rate"
                name="interest_rate"
                value={scheme.interest_rate}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="min_deposition_amount"
                className="block text-white font-bold mb-2"
              >
                Min Deposition Amount
              </label>
              <input
                type="number"
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
                type="number"
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
                htmlFor="totalamount"
                className="block text-white font-bold mb-2"
              >
                Total Amount
              </label>
              <input
                type="number"
                id="totalamount"
                name="totalamount"
                value={scheme.totalamount}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
            <div className="">
              <label
                htmlFor="safe_fees"
                className="block text-white font-bold mb-2"
              >
                Safe Fees
              </label>
              <input
                type="number"
                id="safe_fees"
                name="safe_fees"
                value={scheme.safe_fees}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
              />
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="terms_conditions"
              className="block text-white font-bold mb-2"
            >
              Terms & Conditions
            </label>
            <textarea
              id="terms_conditions"
              name="terms_conditions"
              value={scheme.terms_conditions}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-green-500 focus:outline-none focus:border-teal-500 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Create Scheme
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateInsuranceScheme
