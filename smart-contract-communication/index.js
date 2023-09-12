// interacting with Counter.sol deployed on goerli https://goerli.etherscan.io/address/0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A#code

require('dotenv').config();
const ethers = require('ethers');

ADDRESS = '0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A'
ABI = [{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// provider

const provider = new ethers.AlchemyProvider('goerli', process.env.API_KEY);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
async function main(){
    const counterContract = new ethers.Contract(ADDRESS, ABI, wallet) // using wallet inplace of provider handels signs of tx

    const currentCount = await counterContract.get();
    console.log(currentCount);
    const incrementCount = await counterContract.inc(); // not enough funds 
    console.log(incrementCount);
}

main()