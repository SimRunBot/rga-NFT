import React, { useEffect, useState } from "react";

import Artwork from "./Artwork.js";

import LinearProgress from '@material-ui/core/LinearProgress';
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({

  roundedPaper: {
    borderRadius: 35,
    textAlign: "center",
    background: theme.palette.itemgradient.background,
    color: "#fff",
    textShadow: " 1px 1px 1px #000"
  },
}));

function UsersArtworks({ contract, userAddress }) {
  const [artworkCount, setArtworkCount] = useState();
  const [allArtworkCount, setAllArtworkCount] = useState();
  const [artworkIds, setArtworkIds] = useState();
  const [artworks, setArtworks] = useState();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    if (!contract || !userAddress) { return; }
    let isMounted = true;
    async function getUsersArtworkBalance() {
      console.log("getUsersArtworkBalance");
      let number_of_users_artworks;
      let number_of_all_artworks;
      number_of_users_artworks = await contract.balanceOf(userAddress);
      number_of_all_artworks = await contract.getArtworkCount();
      setAllArtworkCount(number_of_all_artworks);
      setArtworkCount(number_of_users_artworks);
    }
    getUsersArtworkBalance();
    return () => { isMounted = false; }
  }, [contract, userAddress]);

  useEffect(() => {
    if (!allArtworkCount) { return; }
    async function getUsersArtworksIds() {
      console.log("getUsersArtworksIds");
      let artwork_ids = [];
      for (let i = 0; i < allArtworkCount; i++) {
        let _artwork_owner = await contract.ownerOf(i);
        if (_artwork_owner === userAddress) {
          artwork_ids.push(i);
        }
      }
      setArtworkIds(artwork_ids);
    }
    getUsersArtworksIds();
  }, [allArtworkCount, contract, userAddress]);

  useEffect(() => {
    if (!artworkIds) return;
    async function getUsersArtworks() {
      console.log("getusersartworks");
      let _artworks = [];
      for (let i = 0; i < artworkIds.length; i++) {
        let _artwork = await contract.artworks(artworkIds[i]);
        _artworks.push(_artwork);
      }
      setArtworks(_artworks);
      setLoading(false);

    }
    getUsersArtworks();
  }, [artworkIds, contract]);

  return (
    <Grid item>
      <Paper
        className={classes.roundedPaper}
        elevation={4}>
        <p>Your Address:</p>
        <p>{userAddress}</p>
        {loading ? <LinearProgress color="secondary" /> : ""}
        <p>{artworkCount ? `You own ${artworkCount} RGA-NFTs` : ""}</p>
      </Paper>

      {!loading ? artworks.map((_artwork, index) => {
        return (
          <Artwork
            artwork={_artwork}
            contract={contract}
            userAddress={userAddress}
            id={artworkIds[index]}
            key={index}
            showOwner={false} />
        );
      })
        : ""
      }
    </Grid>
  );

}

export default UsersArtworks;