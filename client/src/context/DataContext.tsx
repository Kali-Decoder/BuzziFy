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
  superfluidABI,
  superfluidAddress,
  superfluidPoolAddress,
  superTokenAddress,
  superfluidGDAForwarderAddress,
  superfluidGDAForwarderAbi,
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
    amount: BigNumber,
    targetScore: number
  ) => Promise<void>;
  claimBet: (poolId: number) => Promise<void>;
  getPoolsDetails: (poolId: number) => Promise<any>;
  totalPools: {} | undefined;
  giveUnits: (memberAddresses: any, memberUnits: any) => Promise<void>;
  claimUnitsFromGDAProvider: () => Promise<void>;
  connectPool: () => Promise<void>;
  instantDistribution: () => Promise<void>;
  userBetsData: [] | undefined;
  loading: boolean;
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
  const [totalPools, setTotalPools] = useState<{}>({});
  const [userBetsData,setUserBetsData] = useState(null);
  const [activeChain, setActiveChainId] = useState<number | undefined>(
    chain?.id
  );
  const [loading,setLoading] = useState(false);

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

  const giveUnits = async (memberAddresses: any, memberUnits: any) => {
    try {
      const superfluidContract = await getContractInstance(
        superfluidAddress,
        superfluidABI
      );
      if (superfluidContract) {
        const tx = await superfluidContract.giveUnits(
          memberAddresses,
          memberUnits
        );
        await tx.wait();
        await instantDistribution();
        toast.success("Units given successfully");
      }
      return;
    } catch (error) {
      console.log("Error in giving units");
      toast.error("Error in giving units");
      return;
    }
  };

  const claimUnitsFromGDAProvider = async () => {
    try {
      const superfluidGDAForwarderContract = await getContractInstance(
        superfluidGDAForwarderAddress,
        superfluidGDAForwarderAbi
      );
      if (superfluidGDAForwarderContract) {
        const tx = await superfluidGDAForwarderContract.claimAll(
          superfluidPoolAddress,
          address,
          "0x"
        );
        await tx.wait();
        toast.success("Units claimed successfully");
      }
      return;
    } catch (error) {
      console.log("Error in claiming units");
      toast.error("Error in claiming units");
      return;
    }
  };

  const connectPool = async () => {
    let id = toast.loading("Connecting Superfluid pool to GDA Provider...");
   try {
      const superfluidGDAForwarderContract = await getContractInstance(
        superfluidGDAForwarderAddress,
        superfluidGDAForwarderAbi
      );
      if (superfluidGDAForwarderContract) {
        const tx = await superfluidGDAForwarderContract.connectPool(
          superfluidPoolAddress,
          "0x"
        );
        await tx.wait();
        toast.success("Pool connected successfully",{id});
      }
      return;
    } catch (error) {
      toast.error("Error in connecting pool");
    }
  };

  const instantDistribution = async () => {
    try {
      const superfluidContract = await getContractInstance(
        superfluidAddress,
        superfluidABI
      );
      if (superfluidContract) {
        const tx = await superfluidContract.instantlyDistribute({
          value: ethers.utils.parseEther("0.1"),
        });
        await tx.wait();
        toast.success("Instant distribution done successfully");
      }
      return;
    } catch (error) {
      console.log("Error in instant distribution");
      toast.error("Error in instant distribution");
      return;
    }
  };

  const createPool = async () => {
    console.log("Creating pool");
    let id = toast.loading("Creating pool...");
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      if (mainContract) {
        const tx = await mainContract.createPool();
        await tx.wait();
        await getPoolsDetails();
        toast.success("Pool created successfully",{id});
      }

      return;
    } catch (error) {
      console.log("Error in creating pool");
      toast.error("Error in creating pool",{id});
      return;
    }
  };

  const placeBet = async (
    poolId: number,
    amount: BigNumber,
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

        toast.success("Bet claimed successfully", { id });
      }
      return;
    } catch (error) {
      toast.error("Error in claiming bet", { id });
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
        await getPoolsDetails();
        await giveUnits([address], [20]);
        await instantDistribution();
        await connectPool();
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
      pool_data: {
        pools: [] as any,
      } as any,
    };
    setLoading(true);
    try {
      const mainContract = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );
      let maxPoolId = +(await mainContract?.getPoolId()).toString();
      let userBets=[] as any;
      if (mainContract) {
        for (let i = 0; i < maxPoolId; i++) {
          const pool = await mainContract.pools(i);
          let poolObj = {
            poolId: i,
            total_amount: +pool.total_amount
              .div(BigNumber.from(10).pow(18))
              .toString(),
            total_bets: +pool.total_bets.toString(),
            finalScore: +pool.finalScore.toString(),
            startTime: +pool.startTime.toString(),
            endTime: +pool.endTime.toString(),
            poolEnded: pool.poolEnded,
          };
          poolDetails.pool_data.pools.push(poolObj);
          let bets = await mainContract.getBets(i);
          let poolBets = [];
          for (let y = 0; y < bets.length; y++) {
            let betObj = {
              poolId: i,
              user: bets[y].user,
              amount: +bets[y].amount
                .div(BigNumber.from(10).pow(18))
                .toString(),
              targetScore: +bets[y].targetScore.toString(),
              claimedAmount: +bets[y].claimedAmount.toString(),
              claimed: bets[y].claimed,
              status:pool.poolEnded,
            };
            if (bets[y].user == address) {
              userBets.push(betObj);
            }
            poolBets.push(betObj);
          }
          await setUserBetsData(userBets);
          poolDetails.pool_data.pools[i].bets = poolBets;
        }
        console.log("poolDetails", poolDetails);
        setTotalPools(poolDetails?.pool_data?.pools);
        setLoading(false);
        return poolDetails;
      }
    } catch (error) {
      console.log(error, "Error in getting pool detail");
      setLoading(false);
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
        giveUnits,
        claimUnitsFromGDAProvider,
        instantDistribution,
        connectPool,
        userBetsData,
        loading
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
