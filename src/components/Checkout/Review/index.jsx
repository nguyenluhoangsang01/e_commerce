import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React from "react";

const Review = ({ checkoutToken }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List>
        {checkoutToken?.live?.line_items?.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={`${product.name.substring(0, 50)}...`}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            {checkoutToken?.live.subtotal?.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default Review;
