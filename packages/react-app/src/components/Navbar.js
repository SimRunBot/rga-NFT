import React, { useState } from "react";

import WalletButton from "./WalletButton";
import FundLinkButton from "./FundLinkButton";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  navbarItem: {
    marginRight: theme.spacing(4),
    color: "#fff",
  },
  menu: {
    alignItems: "center",
    justify: "center",
  },
  menuItem: {
  },

  toolbar: {
    flexGrow: 1,
  },
  navbar: {
    background: theme.palette.itemgradient.background
  }
}));

function Navbar({ provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  signer,
  userAddress }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          {isMobile ?
            <>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                className={classes.menu}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/rga-NFT" className={classes.menuItem} >Home</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/generateRGANFT" className={classes.menuItem} >Generate New Artwork</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/yourArtworks" className={classes.menuItem} >Your Artworks</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/allArtworks" className={classes.menuItem} >All Artworks</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <WalletButton
                    provider={provider}
                    loadWeb3Modal={loadWeb3Modal}
                    logoutOfWeb3Modal={logoutOfWeb3Modal} />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <FundLinkButton
                    provider={provider}
                    signer={signer}
                    userAddress={userAddress} />
                </MenuItem>
              </Menu>

            </>
            :
            <>
              <Typography variant="h6"
                className={classes.toolbar}>
                <Link to="/rga-NFT" className={classes.navbarItem} >Home</Link>

                <Link to="/generateRGANFT" className={classes.navbarItem} >Generate New Artwork</Link>

                <Link to="/yourArtworks" className={classes.navbarItem} >Your Artworks</Link>

                <Link to="/allArtworks" className={classes.navbarItem} >All Artworks</Link>
              </Typography>

              <WalletButton
                provider={provider}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal} />

              <FundLinkButton
                provider={provider}
                signer={signer}
                userAddress={userAddress} />
            </>}


        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;