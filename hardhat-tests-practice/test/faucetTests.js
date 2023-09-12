const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy({value: ethers.parseUnits("1", "ether")});
    let withdrawAmount = ethers.parseUnits("1", "ether");


    const [owner, otherSigner] = await ethers.getSigners();

    const ownerInitialBalance = await ethers.provider.getBalance(owner.address);
    const faucetIntialBalance = await ethers.provider.getBalance(faucet.target);

    console.log('Signer 1 address: ', owner.address);
    console.log('Contract Address: ',faucet.target);
    return { faucet, owner, withdrawAmount, otherSigner, ownerInitialBalance, faucetIntialBalance };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('Should not allow withdrawals above .1 ETH at a time', async function(){
    const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it('Should only allow withdrawAll from owner', async function(){
    const { faucet, owner, otherSigner } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(otherSigner).withdrawAll()).to.be.reverted;
  });

  it('Should only allow destroyFaucet from owner', async function(){
    const { faucet, owner, otherSigner } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(otherSigner).destroyFaucet()).to.be.reverted;
  });

  it('Should destroy Faucet completely', async function(){
    const { faucet, owner} = await loadFixture(deployContractAndSetVariables);
    await faucet.destroyFaucet();
    // console.log(faucet.address);
    expect(await ethers.provider.getCode(faucet.target)).to.equal("0x");
  });

  it('Should send amount from withdrawAll to owner', async function(){
    const { faucet, owner,ownerInitialBalance,  faucetIntialBalance } = await loadFixture(deployContractAndSetVariables);
    const tx = await faucet.connect(owner).withdrawAll();
    const receipt = await tx.wait();
    const gasSpent = receipt.gasUsed * receipt.gasPrice;

    const ownerFinalBalance = await ethers.provider.getBalance(owner.address);
    expect(ownerFinalBalance).to.equal(ownerInitialBalance + faucetIntialBalance - gasSpent);
  });

});