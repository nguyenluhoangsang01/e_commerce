import { Button, Container, Grid, Typography } from "@material-ui/core";

import React from "react";
import CartItem from "./CartItem";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onEmptyCart,
}) => {
  const classes = useStyles();
  const cartData = cart.line_items;
  const isEmpty = !cartData?.length;

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,{" "}
      <Link to="/">start adding some!</Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cartData.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <CartItem
              cart={item}
              onUpdateCartQuantity={onUpdateCartQuantity}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={onEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />

      <Typography className={classes.title} variant="h4">
        Your Shopping Cart
      </Typography>

      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
