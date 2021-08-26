import React from "react";
import { isAuthenticated } from "../../../auth/helpers";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Layout.css";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  FooterBackground: {
    color: "#fff",
    backgroundColor: "#011627",
  },
}));

function Layout(Props) {
  const state = useSelector((state) => state.showorhide);
  const classes = useStyles();
  return (
    <div>
      <Box
        style={{
          marginLeft:
            isAuthenticated() && state ? "320px" : state ? "0px" : "90px",
        }}
      >
        <Box mx="10px">{Props.children}</Box>
        <Box
          className={classes.FooterBackground}
          style={{
            marginTop: isAuthenticated
              ? "calc(100vh - 50px)"
              : "calc(100% - 80%)",
          }}
        >
          <Box py="30px">
            <Box textAlign="center" fontSize="14px">
              <Typography variant="subtitle1">
                Copyright &copy; 2021. RADEEO S.S.I. Tous droits réservés.
                <Typography></Typography>
                Gestion Stock V1.0 by Ahmed Khalil El Basri.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default withRouter(Layout);
