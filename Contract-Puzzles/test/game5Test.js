const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const signer = await ethers.provider.getSigner();

    let  threshold = "00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";
    let flag = true;
    let wallet;
    while(flag){
      wallet = await ethers.Wallet.createRandom();
      if( parseInt(wallet.address,16) < parseInt(threshold, 16)){
        flag = false;

        wallet = await wallet.connect(ethers.provider);

        // console.log(await ethers.provider.getBalance(wallet.address));
        // console.log(await ethers.provider.getBalance(signer.getAddress()));
        
        // sending some eth to wallet from default signer
        await signer.sendTransaction({
          to: wallet.address,
          value: ethers.utils.parseEther("1")
        });
        // console.log(await ethers.provider.getBalance(wallet.address));
      }
    }

    // console.log(await signer.getAddress());
    return { game, wallet};
  }
  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);

    // good luck
    // await game.win();

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
