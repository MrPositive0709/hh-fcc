const { task } = require("hardhat/config");

task("block-number", "prints the current block number ").setAction(
  async (taskArgs, hre) => {
    const blockNumber = hre.ethers.provider.getBlockNumber();
    console.log(blockNumber);
  }
);

module.exports = {};
