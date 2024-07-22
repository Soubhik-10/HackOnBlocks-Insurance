import React, { useContext, createContext, ReactNode } from "react";
import {
  createThirdwebClient,
  getContract,
  defineChain,
  ThirdwebClient,
} from "thirdweb";
import { createWallet } from "thirdweb/wallets";
const wallets = [createWallet("io.metamask")];
interface InsuranceContextProps {
  //connect: () => void;
  contract: any;
  wallets: any;
  client: any;
}

const InsuranceContext = createContext<InsuranceContextProps | undefined>(undefined);

const client: ThirdwebClient = createThirdwebClient({
  clientId:"89a5e5b847b9dbdf1aa28f3b1363cc9e",
});

interface InsuranceContextProviderProps {
  children: ReactNode;
}

export const InsuranceContextProvider = ({
  children,
}: InsuranceContextProviderProps) => {
  const contract = getContract({
    client,
    chain: defineChain(2442),
    address:"0xbA9489Fb374fC8E241b376fb04c287c29Fa7100d",
  });

  // const connect =;

  return (
    <InsuranceContext.Provider
      value={{
      
        contract,
        wallets,
        client,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
};

export const useInsuranceContext = () => {
  const context = useContext(InsuranceContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a InsuranceContextProvider",
    );
  }
  return context;
};