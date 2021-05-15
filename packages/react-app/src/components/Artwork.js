import React, { useEffect, useState } from "react";
import Artworksketch from "./Artworksketch";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({

  inputTextField: {
    color: "#fff"
  },
  roundedPaper: {
    marginBottom: theme.spacing(2),
    borderRadius: 45,
    textAlign: "center",
    background: theme.palette.itemgradient.background,
    color: "#fff",
    textShadow: " 1px 1px 1px #000"
  },
  transferButton: {
    background: theme.palette.itemgradient.background,
    color: "#fff",
    textShadow: " 1px 1px 1px #000"
  }
}));

function Artwork({ artwork, contract, userAddress, id, showOwner }) {
  const [toAddress, setToAddress] = useState();
  const [ownerOf, setOwnerOf] = useState();
  const classes = useStyles();

  useEffect(() => {
    console.log(" artwork useeffect");
    if (!showOwner || !contract || id === undefined) return;
    console.log("all artwork use effect");
    async function getOwnerOfId(_id) {
      let ownerOfId = await contract.ownerOf(_id);
      setOwnerOf(ownerOfId);
    }
    getOwnerOfId(id);

  }, [showOwner, contract, id]);

  function handleAddressInputChange(event) {
    //event.preventDefault();
    setToAddress(event.target.value);
  }

  async function transferOwnership() {
    if (!contract || !userAddress) { return; };
    if (!toAddress) {
      alert("no receiving address set");
      return;
    }
    // TODO implement input validation to allow only valid addresses as input
    await contract.transferFrom(userAddress, toAddress, id);
  }

  return (
    <>
      <Paper
        className={classes.roundedPaper}
        elevation={4}>
        <Grid
          container
          direction="column"
          spacing={2}>
          <Grid item>
            <p>{`Name : ${artwork.artworkName}`}</p>
            <p>{`ID: ${id}`}</p>
            <p>{showOwner ? `Owner: ${ownerOf}` : ""}</p>
          </Grid>
          <Grid item>
            {artwork ?
              <Artworksketch artwork={artwork} />
              : ""}

          </Grid>
          <Grid item>
            <TextField
              label="Transfer To Address"
              variant="outlined"
              color="secondary"
              className={classes.inputTextField}
              value={toAddress}
              onChange={handleAddressInputChange} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.transferButton}
              color="primary"
              onClick={() => transferOwnership()}>
              Transfer Ownership
          </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Artwork;