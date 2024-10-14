import { sepolia, polygonAmoy, baseSepolia, holesky } from "@wagmi/core/chains";
import { http } from "viem";
import { KiiTestnet } from "./chain";
export const chainArray = [
  sepolia,
  {
    ...polygonAmoy,
    iconUrl:
      "https://streamnft-chain.s3.ap-south-1.amazonaws.com/polygonLogo.png",
  },
  baseSepolia,
  KiiTestnet,
  holesky,
];

export const transportsObject = {
  [sepolia.id]: http(),
  [polygonAmoy.id]: http(),
  [baseSepolia.id]: http(),
  [KiiTestnet.id]: http(),
  [holesky.id]: http(),
};
