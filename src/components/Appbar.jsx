// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AppBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = () => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const styles = {
    appBar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#f06a4f",
      color: "white",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    },
    appBarContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    logo: {
      color: "white",
      textDecoration: "none",
      fontSize: "28px",
      fontWeight: "bold",
      marginLeft: "7%",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      marginRight: "5%",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      marginLeft: "20px",
      fontSize: "25px",
      display: "flex",
      alignItems: "center",
    },
    menuButton: {
      color: "#f2e9ea",
      marginRight: "50px",
      display: isSmallScreen ? "block" : "none",
    },
    menuItem: {
      color: "#ED663D",
    },
  };

  return (
    <header style={styles.appBar}>
      <div style={styles.appBarContent}>
        <div style={styles.logo}>
          <a href="/" style={styles.logo}>
            PizzaPalace
          </a>
        </div>

        <IconButton
          style={styles.menuButton}
          onClick={handleMenuOpen}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {isSmallScreen && (
            <>
              <MenuItem onClick={handleMenuClose}>
                <Tooltip title="Cart">
                  <ShoppingCartIcon style={styles.menuItem} />
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Tooltip title="Menu">
                  <RestaurantMenuIcon style={styles.menuItem} />
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Tooltip title="About">
                  <InfoIcon style={styles.menuItem} />
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Tooltip title="Contact-Us">
                  <ConnectWithoutContactIcon style={styles.menuItem} />
                </Tooltip>
              </MenuItem>
            </>
          )}
        </Menu>

        {!isSmallScreen && (
          <nav style={styles.navLinks}>
            <Tooltip title="Your Cart">
              <ShoppingCartIcon style={styles.navLink} />
            </Tooltip>
            <Tooltip title="Home">
              <HomeIcon style={styles.navLink} />
            </Tooltip>
            <Tooltip title="Menu">
              <RestaurantMenuIcon style={styles.navLink} />
            </Tooltip>
            <Tooltip title="About">
              <InfoIcon style={styles.navLink} />
            </Tooltip>
            <Tooltip title="Contact-Us">
              <ConnectWithoutContactIcon style={styles.navLink} />
            </Tooltip>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AppBar;
