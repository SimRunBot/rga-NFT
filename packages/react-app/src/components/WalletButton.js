import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navbarButton: {
    marginRight: theme.spacing(4),
    background: "#0096c7",
    '&:hover': {
      backgroundColor: "#00b4d8",
    },
    color: "#fff"
  },
}));

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.navbarButton}
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

export default WalletButton;