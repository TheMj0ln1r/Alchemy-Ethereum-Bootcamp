const hre = require("hardhat");
require("dotenv").config();

const TARGET_CONTRACT = "0x7595B20Dd894BD0Ee651567A5Ca2A0Db11CbF7e6";
const SOLVER_CONTRACT = "0x2Ea79958A57D293603483e25e3D5D347F7Bc5871";
async function main(){   
    const solver = await hre.ethers.getContractAt("Solve", SOLVER_CONTRACT);
    // const tx = await solver.attempt()
    const tx = await solver.callAttempt(TARGET_CONTRACT);
    await tx.wait();
    console.log(tx);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  