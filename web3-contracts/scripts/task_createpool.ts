import { ethers } from "hardhat";

async function createPool() {
  const BUZZIFY_CONTRACT_NAME = "BuzziFi";
  const BuzzifyAddress = "0x367B17683E5f146Ed0DB4ca221e5868a85787A89";
  const sender = new ethers.Wallet(
    process.env.DEPLOYER_ACCOUNT_PRIV_KEY as any,
    ethers.provider
  );

  console.log("Deployer address:", sender.address);
  console.log("Creating pool...");
  const myBuzzifyContract = await ethers.getContractAt(
    BUZZIFY_CONTRACT_NAME,
    BuzzifyAddress,
    sender
  );
  const tx = await myBuzzifyContract.createPool();
  await tx.wait();
  console.log("Pool Created Successfully:", tx.hash);
}

async function main() {
  await createPool();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
