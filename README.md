# Welcome to the RGA-NFT Dapp
## interact with it here: [https://simrunbot.github.io/rga-NFT/](https://simrunbot.github.io/rga-NFT/)

This Dapp allows you to generate new random artworks.

During the verifiable random artwork generation a NFT is minted to prove your ownership of the artwork.

If you want you can transfer the ownership of your rga-NFTs.

You can also view all existing rga-NFTs.

But __before__ all of that is possible make sure you have completed the following steps:

1. Install [Metamask Browser Extension](https://metamask.io/) and create your wallet. 

2. Connect to Kovan Testnet

3. Get yourself [Kovan Test Ether](https://faucet.kovan.network/)

4. Connect your wallet to this Dapp

To see the Smart Contract on Etherscan go here: <https://kovan.etherscan.io/address/0x85cad4Cf034De01fC37d560e0A3279D56221bF1B>

## Frameworks used in the development

* [hardhat](https://hardhat.org/)

* [NFT (ERC721URIStorage by OpenZeppelin)](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol)

* [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/)

* [React](https://reactjs.org/)

* [Create Eth App](https://github.com/paulrberg/create-eth-app)

### Project Structure

```
rga-NFT
└── packages
    ├── contracts
    │   └── src
    │       ├── abis
    ├── react-app
    │   └── src
            ...
    │       ├── App.js
```

