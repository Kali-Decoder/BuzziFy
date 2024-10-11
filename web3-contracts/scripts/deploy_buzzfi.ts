import { ethers } from "hardhat";

async function deployBuzzFi() {
  const CONTRACT_NAME = "BuzziFi";
  const tokenAddress = "0x7AD1a4b60c8C265a951459B4888354D1339c3cDa";
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
