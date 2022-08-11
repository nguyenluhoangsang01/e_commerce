import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "62.5%",
  },

  cardContent: {},

  name: {
    display: "box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    marginBottom: "1rem",
  },

  cardActions: {
    marginBottom: "1rem",
    justifyContent: "space-between",
  },

  buttons: {
    display: "flex",
  },
}));
