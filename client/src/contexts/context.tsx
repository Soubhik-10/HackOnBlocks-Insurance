import React, { useContext, createContext, ReactNode } from "react"
import {
  createThirdwebClient,
  getContract,
  defineChain,
  // useMetamask,
  ThirdwebClient,
} from "thirdweb"
import { createWallet } from "thirdweb/wallets"
const wallets = [createWallet("io.metamask")]
//import { ethers } from "ethers";

interface InsuranceContextProps {
  //connect: () => void;
  contract: any
  wallets: any
  client: any
}

const InsuranceContext = createContext<InsuranceContextProps | undefined>(
  undefined,
)

const client: ThirdwebClient = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID as string,
})

interface InsuranceContextProviderProps {
  children: ReactNode
}

export const InsuranceContextProvider = ({
  children,
}: InsuranceContextProviderProps) => {
  const contract = getContract({
    client,
    chain: defineChain(2442),
    address: import.meta.env.VITE_CONTRACT_ADDRESS as string,
  })

  // const connect =;

  return (
    <InsuranceContext.Provider
      value={{
        // connect,
        contract,
        wallets,
        client,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  )
}

export const useInsuranceContext = () => {
  const context = useContext(InsuranceContext)
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a InsuranceContextProvider",
    )
  }
  return context
}
