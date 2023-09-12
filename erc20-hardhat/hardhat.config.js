require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY2]
    }
  }
};
