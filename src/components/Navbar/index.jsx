import {
  AppBar,
  Badge,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();

  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
              color="inherit"
            >
              <img
                src="https://i.ibb.co/Qp1SXBw/commerce.png"
                alt="Commerce.js"
                height="25px"
                className={classes.image}
              />
              Commerce.js
            </Typography>

            <div className={classes.grow} />

            {location.pathname === "/" && (
              <div className={classes.button}>
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge
                    overlap="rectangular"
                    badgeContent={totalItems}
                    color="secondary"
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
