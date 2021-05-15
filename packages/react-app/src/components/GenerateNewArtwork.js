import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
  inputTextField: {
    margin: theme.spacing(2),
    borderRadius: 25,
  },
  roundedPaper: {
    borderRadius: theme.shape.borderRadius,
  },
  GenerateButton: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.itemgradient.background,
    color: "#fff",
    textShadow: " 1px 1px 1px #000"
  },
}));

async function generateNewArtwork(provider, contract, artworkName) {
  if (!provider || !contract) { return; };
  if (!artworkName) {
    alert("no name set");
    return;
  }
  await contract.requestNewRandomArtwork(Math.floor(Math.random() * 1000), artworkName);
}

function GenerateNewArtwork({ provider, contract }) {
  const [textInput, setTextInput] = useState("");
  const classes = useStyles();
  if (!provider || !contract) { return <p>loading</p>; }

  function handleInputchange(event) {
    setTextInput(event.target.value);
  }

  return (
    <Paper
      className={classes.roundedPaper}
      elevation={4}
      variant="outlined"
      color="secondary">
      <Grid container
        justify="center"
        alignItems="center"
        direction="column">
        <Grid item >
          <TextField
            label="Artwork Name"
            variant="outlined"
            className={classes.inputTextField}
            value={textInput}
            color="primary"
            onChange={handleInputchange} />
        </Grid>
        <Grid item >
          <Button
            className={classes.GenerateButton}
            variant="outlined"
            color="secondary"
            onClick={() => generateNewArtwork(provider, contract, textInput)}>
            Generate a new Random Artwork
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default GenerateNewArtwork;