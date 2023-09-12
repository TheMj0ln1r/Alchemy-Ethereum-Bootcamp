const hre = require("hardhat");
require("dotenv").config();
async function main() {
  /** FOR SOLVING LOCALLY */
  // const [signer1, signer2] = await hre.ethers.getSigners();
  // const contract = await hre.ethers.deployContract("Contract", signer1);
  // await contract.waitForDeployment();
  // console.log("Deployed at ", contract.target);

  // const solver = await hre.ethers.deployContract("Contract", signer2);
  // await solver.waitForDeployment();
  // console.log("Deployed at ", solver.target);


  /** FOR SOLVING ON SEPOLIA */
  const contract = await hre.ethers.deployContract("Contract");
  await contract.waitForDeployment();
  console.log("Challenge Deployed at ", contract.target);

  const solver = await hre.ethers.deployContract("Solve");
  await solver.waitForDeployment();
  console.log("Solver Deployed at ", solver.target);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
