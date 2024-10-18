import { sepolia, baseSepolia } from "@wagmi/core/chains";
import { http } from "viem";
export const chainArray = [sepolia, baseSepolia];

export const transportsObject = {
  [sepolia.id]: http(),
  [baseSepolia.id]: http(),
};
