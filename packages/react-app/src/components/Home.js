import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  roundedPaper: {
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.itemgradient.background,
    color: "#fff",
    textShadow: " 1px 1px 1px #000"
  },
}));


function Home() {
  const classes = useStyles();

  return (
    <Paper
      className={classes.roundedPaper}
      elevation={4}
      variant="outlined"
      color="primary">
      <Grid container
        justify="center"
        alignItems="center"
        direction="column">
        <Grid item >
          <Typography
            variant="h4">
            Welcome to the RGA-NFT Dapp
          </Typography>
        </Grid>
        <Grid item >
          <Typography
            variant="h5">
            Before you can create new Randomly Generated Artworks first: 
          </Typography>
          <Typography
            variant="h6">
            1: Install <a target="_blank" href="https://metamask.io/">Metamask Browser Extension</a> and create your wallet.
          </Typography>
          <Typography
            variant="h6">
            2: Connect to Kovan Testnet 
          </Typography>
          <Typography
            variant="h6">
            3: Get yourself <a target="_blank" href="https://faucet.kovan.network/">Kovan Test Ether</a>
          </Typography>
          <Typography
            variant="h6">
            4: Connect your wallet to this Dapp
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Home;