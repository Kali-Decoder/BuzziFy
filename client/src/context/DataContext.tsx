import React, { useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/utils/signer";
import { ethers, BigNumber, Contract } from "ethers";
import toast from "react-hot-toast";
import {
  tokenAddress,
  tokenAbi,
  mainContractABI,
  mainContractAddress,
} from "@/constant/index";

// Context types
interface DataContextProps {
  tokenBalance: BigNumber | undefined;
  getContractInstance: (
    contractAddress: string,
    contractAbi: any
  ) => Promise<Contract | undefined>;
  getTokenBalance: () => Promise<BigNumber | undefined>;
  createPool: () => Promise<void>;
  placeBet: (poolId: number, amount: number,targetScore:number) => Promise<void>;
  claimBet: (poolId: number) => Promise<void>;
  getPoolDetail: (poolId: number) => Promise<any>;
}

interface DataContextProviderProps {
  children: ReactNode;
}

// Context initialization
const DataContext = React.createContext<DataContextProps | undefined>(
  undefined
);

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [tokenBalance, setTokenBalance] = useState<BigNumber | undefined>();
  const { address, chain } = useAccount();
  const [activeChain, setActiveChainId] = useState<number | undefined>(
    chain?.id
  );

  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);

  const signer = useEthersSigner({ chainId: activeChain });
  const getContractInstance = async (
    contractAddress: string,
    contractAbi: any
  ): Promise<Contract | undefined> => {
    try {
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      return contractInstance;
    } catch (error) {
      console.log("Error in deploying contract");
      return undefined;
    }
  };

  const getTokenBalance = async () => {
    try {
      const tokenContract = await getContractInstance(tokenAddress, tokenAbi);
      if (tokenContract) {
        const balance = await tokenContract.balanceOf(address);
        setTokenBalance(+balance);
        return balance;
      }
    } catch (error) {
      console.log("Error in getting token balance");
      return BigNumber.from(0);
    }
  };

  const createPool = async () => {
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      if (mainContract) {
        const tx = await mainContract.createPool();
        await tx.wait();
        toast.success("Pool created successfully");
      }

      return;
    } catch (error) {
      console.log("Error in creating pool");
      toast.error("Error in creating pool");
      return;
    }
  };


  const placeBet = async (poolId: number, amount: number,predictScore:number) => {
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      if (mainContract) {
        const tx = await mainContract.placeBet( amount,predictScore,poolId);
        await tx.wait();
        toast.success("Bet placed successfully");
      }

      return;
    } catch (error) {
      console.log("Error in placing bet");
      toast.error("Error in placing bet");
      return;
    }
  };


  const claimBet = async (poolId: number) => {
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      if (mainContract) {
        const tx = await mainContract.claimBet(poolId);
        await tx.wait();
        toast.success("Bet claimed successfully");
      }

      return;
    } catch (error) {
      console.log("Error in claiming bet");
      toast.error("Error in claiming bet");
      return;
    }
  };


  const setResultScore = async (poolId: number,finalScore:number) => {
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );

      if (mainContract) {
        const tx = await mainContract.setResult(poolId,finalScore);
        await tx.wait();
        toast.success("Result set successfully");
      }

      return;
    } catch (error) {
      console.log("Error in setting result");
      toast.error("Error in setting result");
      return;

    }

  };
  const getPoolDetail  = async (poolId:number) => {
    let poolDetail = {
      pool:{},
      bets:[]
    }
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      if (mainContract) {
        const pool = await mainContract.pools(poolId);
        poolDetail.pool = pool;
        const bets = await mainContract.bets(poolId);
        poolDetail.bets = bets;
        return poolDetail;
      }
    }catch (error) {
      console.log("Error in getting pool detail");
      return poolDetail;

    }
  };
  useEffect(() => {
    if (!signer) return;
    getTokenBalance();
  }, [address]);

  return <DataContext.Provider value={{
    tokenBalance,
    getContractInstance,
    getTokenBalance,
    createPool,
    placeBet,
    claimBet,
    getPoolDetail
  }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
