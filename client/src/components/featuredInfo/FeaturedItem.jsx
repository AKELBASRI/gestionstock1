import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  Featured: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  Item: {
    flex: "1",
    margin: "20px 14px",
    padding: "30px",
    borderRadius: "10px",
    cursor: "pointer",

    boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
  },
  FeaturedMainContainer: {
    margin: "10px 0px",
    display: "flex",
    alignItems: "center",
  },
}));

function FeaturedItem(Props) {
  const classes = useStyles();
  return (
    <div>
      {/* <Box className={classes.Item} style={{ backgroundColor: Props.color }}> */}
      <Grid
        className={classes.Item}
        item
        style={{ backgroundColor: Props.color }}
      >
        <Box fontSize="20px">{`Nombre Total des ${Props.totalmateriel[2]}s`}</Box>
        <Box>
          <Box
            className={classes.FeaturedMainContainer}
            fontSize="30px"
            fontWeight="600"
          >
            {Props.totalmateriel[0]}
          </Box>
        </Box>
      </Grid>
    </div>
  );
}
export default FeaturedItem;
