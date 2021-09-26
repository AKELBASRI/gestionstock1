import React from "react";
import { isAuthenticated } from "../../auth/helpers";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Layout.css";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  FooterBackground: {
    position: isAuthenticated() ? "absolute" : "relative",
    zIndex: "125455",
    width: "100%",
    color: "#fff",
    backgroundColor: "#011627",
    padding: "15px",
    "& h6": {
      color: "white",
    },
  },
}));

function Layoutsignin(Props) {
  const state = useSelector((state) => state.showorhide);
  const classes = useStyles();
  return (
    <div>
      <Box
        className={classes.root}
        style={{
          marginLeft:
            isAuthenticated() && state
              ? "280px"
              : state
              ? "69px"
              : isAuthenticated()
              ? "69px"
              : "0",
        }}
      >
        <Box className={classes.root} mx="10px">
          {Props.children}
        </Box>
      </Box>

      <Box
        textAlign="center"
        fontSize="14px"
        className={classes.FooterBackground}
        style={{
          marginTop: isAuthenticated
            ? "calc(100vh - 50px)"
            : "calc(100% - 80%)",
        }}
      >
        <Typography variant="subtitle1">
          Copyright &copy; 2021. RADEEO S.S.I. Tous droits réservés.
          <Typography></Typography>
          Gestion Stock V1.0 by Ahmed Khalil El Basri.
        </Typography>
      </Box>
    </div>
  );
}

export default withRouter(Layoutsignin);
