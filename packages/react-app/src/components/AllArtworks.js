import React, { useEffect, useState } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Artwork from "./Artwork.js";

const useStyles = makeStyles((theme) => ({

  roundedPaper: {
    borderRadius: 35,
    textAlign: "center",
    background: theme.palette.itemgradient.background,
    color: "#fff",
    textShadow: " 1px 1px 1px #000"
  },
}));

function AllArtworks({ contract }) {
  const [allArtworkCount, setAllArtworkCount] = useState();
  const [allArtworks, setAllArtworks] = useState();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (!contract) { return; }
    let isMounted = true;
    async function getAllArtworkCount() {
      console.log("getAllArtworkCount");
      let number_of_all_artworks;
      number_of_all_artworks = await contract.getArtworkCount();
      setAllArtworkCount(number_of_all_artworks);
    }
    getAllArtworkCount();
    return () => { isMounted = false; }
  }, [contract]);

  useEffect(() => {
    if (!allArtworkCount) return;
    let isMounted = true;
    async function getAllArtworks() {
      console.log("getusersartworks");
      let _artworks = [];
      for (let i = 0; i < allArtworkCount; i++) {
        let _artwork = await contract.artworks(i);
        _artworks.push(_artwork);
      }
      setAllArtworks(_artworks);
      setLoading(false);
    }
    getAllArtworks();
    return () => { isMounted = false; }
  }, [allArtworkCount, contract]);

  return (
    <Grid item>
      <Paper
        className={classes.roundedPaper}
        elevation={4}>
        <p>{allArtworkCount ? `Showing all ${allArtworkCount} RGA-NFTs` : ""}</p>
        {loading ? <LinearProgress color="secondary" /> : ""}
      </Paper>

      {!loading ? allArtworks.map((_artwork, index) => {
        return (
          <Artwork
            artwork={_artwork}
            id={index}
            contract={contract}
            key={index}
            showOwner={true} />
        );
      })
        : ""}
    </Grid>
  );
}

export default AllArtworks;