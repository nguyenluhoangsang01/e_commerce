import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Confirmation = ({ order, errorMessage }) => {
  const classes = useStyles();

  return order.customer ? (
    <>
      <div>
        <Typography>
          Thank you for your purchase,
          <Typography
            component="span"
            color="primary"
            style={{ marginLeft: "5px" }}
          >
            {order.customer.email}
          </Typography>
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button variant="outlined" type="button" component={Link} to="/">
        Back to Home
      </Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};

export default Confirmation;
