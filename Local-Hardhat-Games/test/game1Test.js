const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Game1', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Game1 = await ethers.getContractFactory('Game1');
    const game1 = await Game1.deploy();
    console.log('Contract Address: ',game1.target);
    return { game1};
  }

  it('Should emit winner', async function(){
    const { game1 } = await loadFixture(deployContractAndSetVariables);
    await expect(game1.win()).to.emit(game1, "Winner");
  });

});