import { ethers } from "hardhat";

async function deployBuzzFi() {
  const CONTRACT_NAME = "BuzziFi";
  const tokenAddress = "0x1f5B899BbB635bAeEf88fc47EAE30F6663D8fFcC";
  const buzziFi = await ethers.deployContract(CONTRACT_NAME, [
    tokenAddress,
  ]);
  await buzziFi.waitForDeployment();
  console.log(
    "Deployed RFI contract address:",
    await buzziFi.getAddress()
  );
}

async function main() {
  await deployBuzzFi();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
