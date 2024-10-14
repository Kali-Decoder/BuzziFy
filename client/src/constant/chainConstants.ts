import { baseSepolia } from "@wagmi/core/chains";
import { http } from "viem";
export const chainArray = [baseSepolia];
export const transportsObject = {
  [baseSepolia.id]: http(),
};
