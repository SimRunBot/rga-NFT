require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      },
      {
        version: "0.6.6"
      },
      {
        version: "0.6.0"
      },
      {
        version: "0.7.0"
      }
    ]
  },
  networks: {
    kovan: {
      url: `${process.env.KOVAN_RPC_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  paths: {
    artifacts: "./src/abis"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};

