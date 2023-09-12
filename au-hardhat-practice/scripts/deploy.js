
const hre = require("hardhat");

async function main() {
  const counter = await hre.ethers.deployContract("Counter", [], {});

  await counter.waitForDeployment();

  console.log(
    `Counter deployed to ${counter.target}, ${counter.tx}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
