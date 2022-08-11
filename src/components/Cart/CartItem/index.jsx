import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const CartItem = ({ cart, onUpdateCartQuantity, onRemoveFromCart }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={cart.image.url}
        title={cart.name}
        alt={cart.name}
      />

      <CardContent className={classes.cardContent}>
        <Typography variant="h6" title={cart.name} className={classes.name}>
          {cart.name}
        </Typography>
        <Typography variant="subtitle1" title={cart.name}>
          {cart.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQuantity(cart.id, cart.quantity - 1)}
          >
            -
          </Button>
          <Typography>{cart.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => onUpdateCartQuantity(cart.id, cart.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => onRemoveFromCart(cart.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
