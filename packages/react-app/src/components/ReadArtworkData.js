import React, { useState } from "react";
import Button from '@material-ui/core/Button';

async function readArtworkData(provider, contract, userAddress) {
  if (!provider || !contract) { return; };
  const rganft_contract = contract;

  const nftBalance = await rganft_contract.balanceOf(userAddress);
  console.log("nftBalance ", nftBalance.toString());

  const artworks = await rganft_contract.artworks(0);
  console.log("artworks ", artworks.toString());

  console.log("owner of artwork 0 ", await rganft_contract.ownerOf(0));

  console.log(window.ethereum);
  console.log(rganft_contract);

}

function ReadArtworkData({ provider, contract, userAddress }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => readArtworkData(provider, contract, userAddress)}>
      Read Artwork Data
    </Button>
  );
}

export default ReadArtworkData;