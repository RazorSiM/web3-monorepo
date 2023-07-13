import { ethers } from "hardhat"

async function main() {
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  console.log('Deploying SampleERC20...');

  const sampleERC20 = await ethers.deployContract("SampleERC20");
  await sampleERC20.waitForDeployment();
  
  console.log('SampleERC20 deployed to:', sampleERC20.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
