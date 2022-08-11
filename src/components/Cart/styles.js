import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  title: {
    margin: "5% 0 3%",
  },

  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },

  checkoutButton: {
    minWidth: "150px",
  },

  link: {
    textDecoration: "none",
  },

  cartDetails: {
    display: "flex",
    margin: "10% 0",
    width: "100%",
    justifyContent: "space-between",
  },
}));
