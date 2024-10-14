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
  placeBet: (
    poolId: number,
    amount: number,
    targetScore: number
  ) => Promise<void>;
  claimBet: (poolId: number) => Promise<void>;
  getPoolsDetails: (poolId: number) => Promise<any>;
  totalPools: [] | undefined;
  poolBets: [] | undefined;
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
  const [totalPools, setTotalPools] = useState<[]>([]);
  const [poolBets, setPoolBets] = useState<[]>([]);

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
        let balance = await tokenContract.balanceOf(address);
        balance = +balance.div(BigNumber.from(10).pow(18)).toString();
        setTokenBalance(balance);
        console.log("Token balance", balance);
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

  const placeBet = async (
    poolId: number,
    amount: number,
    predictScore: number
  ) => {
    let id = await toast.loading("Placing bet...");
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      amount = ethers.utils.parseEther(amount.toString());
      const tokenContract = await getContractInstance(tokenAddress, tokenAbi);
      console.log("tokenContract", tokenContract);
      if (tokenContract) {
        const allowance = await tokenContract.allowance(
          address,
          mainContractAddress
        );
        if (allowance.lt(amount)) {
          const tx = await tokenContract.approve(mainContractAddress, amount);
          await tx.wait();
        }
      }

      if (mainContract) {
        const tx = await mainContract.placeBet(amount, predictScore, poolId);
        await tx.wait();

        await getPoolsDetails();
      }

      toast.success("Bet placed successfully", {
        id,
      });
      return;
    } catch (error) {
      toast.error("Error in placing bet", { id });
      return;
    }
  };

  const claimBet = async (poolId: number) => {
    let id = await toast.loading("Claiming bet...");
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      if (mainContract) {
        const tx = await mainContract.claimBet(poolId);
        await tx.wait();
        await getPoolsDetails();
        toast.success("Bet claimed successfully",{id});
      }
      return;
    } catch (error) {
      toast.error("Error in claiming bet",{id});
      return;
    }
  };

  const setResultScore = async (poolId: number, finalScore: number) => {

    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );

      if (mainContract) {
        const tx = await mainContract.setResult(poolId, finalScore);
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
  const getPoolsDetails = async () => {
    let poolDetails = {
      pool: [] as any,
      bets: [] as any,
    };
    try {
        const mainContract = await getContractInstance(
          mainContractAddress,
          mainContractABI
        );
       let maxPoolId = +(await mainContract.getPoolId()).toString();
       
        if (mainContract) {
          for (let i = 0; i < maxPoolId; i++) {
            const pool = await mainContract.pools(i);
            let poolObj = {
              poolId:i,
              total_amount:+pool.total_amount.div(BigNumber.from(10).pow(18)).toString(),
              total_bets:+pool.total_bets.toString(),
              finalScore:+pool.finalScore.toString(),
              startTime:+pool.startTime.toString(),
              endTime:+pool.endTime.toString(),
              poolEnded:pool.poolEnded,
            }
            poolDetails.pool.push(poolObj);
            let bets = await mainContract.getBets(i);
            console.log("Bets", bets);
            for(let y =0 ; y < bets.length; y++){
              let betObj = {
                user: bets[y].user,
                amount:+bets[y].amount.div(BigNumber.from(10).pow(18)).toString(),
                targetScore: +bets[y].targetScore.toString(),
                claimedAmount: +bets[y].claimedAmount.toString(),
                claimed: bets[y].claimed,
              }
              poolDetails.bets.push(betObj);
            }
          }
          setTotalPools(poolDetails?.pool);
          setPoolBets(poolDetails?.bets);
      return poolDetails;
      }
    } catch (error) {
      console.log(error, "Error in getting pool detail");
      return poolDetails;
    }
  };
  useEffect(() => {
    if (!signer) return;
    getTokenBalance();
    getPoolsDetails();
  }, [signer]);

  return (
    <DataContext.Provider
      value={{
        tokenBalance,
        getContractInstance,
        getTokenBalance,
        createPool,
        placeBet,
        claimBet,
        getPoolsDetails,
        totalPools,
        poolBets,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
