import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    height: "100%",
  },

  media: {
    height: 0,
    paddingTop: "62.5%",
  },

  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },

  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },

  name: {
    display: "box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    marginRight: "2rem",
  },

  description: {
    display: "box",
    boxOrient: "vertical",
    lineClamp: 3,
    overflow: "hidden",
  },
}));
