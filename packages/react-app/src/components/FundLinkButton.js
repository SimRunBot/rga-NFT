import React from "react";
import { addresses, abis } from "@project/contracts";
import { Contract } from "@ethersproject/contracts";
import {BigNumber} from "ethers";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navbarButton: {
    marginRight: theme.spacing(4),
    backgroundColor: "#0096c7",
    '&:hover': {
      backgroundColor: "#00b4d8",
    },
    color: "#fff"
  },
}));

function FundLinkButton({ provider, signer, userAddress }) {
  const classes = useStyles();

  async function sendLinkToContract(){
    let LinkContract = new Contract(addresses.KOVAN_LINKTOKEN, abis.erc667, signer);
    let linkbalance = await LinkContract.balanceOf(userAddress);
    
    // 2000000000000000000 = 2 LINK 
    const funding_amount = BigNumber.from("2000000000000000000");
    
    // BigNumber comparison >= gte
    if (linkbalance.gte(funding_amount)){
      await LinkContract.transfer(
        addresses.rganft,
        funding_amount); 
    }
    else{
      console.log("not enough LINK in your wallet");
      return;
    }
    
  }

  return (
    <Button
      variant="contained" 
      className={classes.navbarButton}
      onClick={() => {
        if (!provider || !signer) {
          console.log("not connected");
        } else {
          sendLinkToContract();
        }
      }}
    >
      Send Link To Contract
    </Button>
  );
}

export default FundLinkButton;