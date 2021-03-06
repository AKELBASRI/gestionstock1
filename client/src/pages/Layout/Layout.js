import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth/helpers";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Layout.css";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useIdleTimer } from "react-idle-timer";
import DialogCountDown from "./DialogCountDown";
import reactUsestateref from "react-usestateref";
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

function Layout(Props) {
  const [open, setOpen] = useState(false);
  const timeout = 60000 * 15;
  const [, setRemaining, remaining] = reactUsestateref(timeout);
  const handleOnIdle = (event) => {
    localStorage.removeItem("jwt_info");
    Props.history.push("/signin");
    console.log("user is idle", event);
    console.log("last active", getLastActiveTime());
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: timeout,
    onIdle: handleOnIdle,

    debounce: 500,
  });
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setRemaining(getRemainingTime());

    const timeremaining = setInterval(() => {
      setRemaining(getRemainingTime());

      remaining.current <= 60000 ? setOpen(true) : setOpen(false);
    }, 1000);
    return () => clearInterval(timeremaining);
  }, []);
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

          <DialogCountDown
            open={open}
            handleClose={handleClose}
            remaningtime={millisToMinutesAndSeconds(remaining.current)}
          />
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
          Copyright &copy; 2021. RADEEO S.S.I. Tous droits r??serv??s.
          <Typography></Typography>
          Gestion Stock V1.0 by Ahmed Khalil El Basri.
        </Typography>
      </Box>
    </div>
  );
}

export default withRouter(Layout);
