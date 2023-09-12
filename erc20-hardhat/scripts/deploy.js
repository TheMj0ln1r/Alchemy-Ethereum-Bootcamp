async function main() {
  const [_,deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await ethers.provider.getBalance(deployer.address)).toString();
  
  console.log("Account balance:", (await ethers.formatEther(weiAmount)));

  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!
  const Token = await ethers.getContractFactory("Mj0ln1r");
  const token = await Token.deploy();

  console.log("Token address:", token.target); // 0x85Da4a0dc4715799593340E6d5Ac89dFf94F65aD
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});