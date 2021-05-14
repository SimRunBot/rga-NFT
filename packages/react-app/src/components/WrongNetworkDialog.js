import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function WrongNetworkDialog({ wrongNetwork, setWrongNetwork }) {

  return (
    <Dialog
      open={wrongNetwork}
      onClose={() => { setWrongNetwork(false); }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Connected to wrong Network"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" >
          Please connect to <b>Kovan</b> Testnet in your Metamask.
          And refresh the page.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setWrongNetwork(false); }} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WrongNetworkDialog;