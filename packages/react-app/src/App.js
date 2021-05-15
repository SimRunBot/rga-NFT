import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Contract } from "@ethersproject/contracts";
import { addresses, abis } from "@project/contracts";
import { useQuery } from "@apollo/react-hooks";
import useWeb3Modal from "./hooks/useWeb3Modal";
import GET_TRANSFERS from "./graphql/subgraph";

import UsersArtworks from "./components/UsersArtworks";
import GenerateNewArtwork from "./components/GenerateNewArtwork";
import Home from "./components/Home";
import AllArtworks from "./components/AllArtworks";
import WrongNetworkDialog from "./components/WrongNetworkDialog";
import Navbar from "./components/Navbar";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  content: {
    flex: "1",
    overflow: "auto",
    background: theme.palette.itemgradient.background,
  }
}));

function App() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [userAddress, setUserAddress] = useState("");
  const [signer, setSigner] = useState("");
  const [contract, setContract] = useState("");
  const [connected, setConnected] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  // connect to user wallet and initialize states
  useEffect(() => {
    if (!provider) return;
    let isMounted = true;
    setConnected(false);

    async function fillStates() {
      let _network = await provider.getNetwork();
      if (_network.name === "kovan") {
        console.log("ON NETWORK: ", _network.name);
        setWrongNetwork(false);
      }
      else {
        setWrongNetwork(true);
        return;
      }
      let _signer = await provider.getSigner();
      let _useraddress = await _signer.getAddress();
      let _rganft_contract = new Contract(addresses.rganft, abis.rganft, _signer);
      setSigner(_signer);
      setUserAddress(_useraddress);
      setContract(_rganft_contract);
    }
    fillStates();
    setConnected(true);
    return () => { isMounted = false; }
  }, [provider]);

  return (
    <Grid
      container
      direction="column"
      className={classes.root}>
      <Router>
        <Grid item >
          <Navbar
            provider={provider}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            signer={signer}
            userAddress={userAddress} />
        </Grid>

        <Grid item container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.content} >

          <Grid item >
            <WrongNetworkDialog
              wrongNetwork={wrongNetwork}
              setWrongNetwork={setWrongNetwork} />
          </Grid>

          <Switch>
            {!connected ?
              <>
                <Grid item>
                  <Home />
                </Grid>

                <Grid item>
                  <p>Connect to Kovan in Metamask</p>
                  <LinearProgress
                    color={"secondary"} />
                </Grid>
              </>
              :
              <>
                <Route path="/generateRGANFT">
                  <Grid item >
                    <GenerateNewArtwork
                      provider={provider}
                      contract={contract} />
                  </Grid>
                </Route>

                <Route path="/yourArtworks">
                  <Grid item container
                    direction="column"
                    spacing={10}
                    justify="flex-start"
                    alignItems="center"
                    className={classes.content} >

                    <UsersArtworks
                      contract={contract}
                      userAddress={userAddress} />

                  </Grid>
                </Route>

                <Route path="/allArtworks">
                  <Grid item container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.content} >
                    <AllArtworks
                      contract={contract} />
                  </Grid>
                </Route>

                <Route exact path="/rga-NFT">
                  <Grid item>
                    <Home />
                  </Grid>
                </Route>
              </>
            }
          </Switch>

        </Grid>

      </Router>
    </Grid >
  );
}

export default App;
