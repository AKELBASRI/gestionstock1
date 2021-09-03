import React, { useEffect, useLayoutEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import { withRouter } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { useDispatch, useSelector } from "react-redux";
import { showorhide } from "../../store/actions";
import SubMenu from "./SubMenu";
import { isAuthenticated } from "../../auth/helpers";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const state = useSelector((state) => state.showorhide);
  const keys = SidebarData.map(function (item, key) {
    return { key: key, close: null, item: item };
  });
  const onOpen = (key) => {
    keys.forEach((x) => {
      if (x.key !== key && x.close !== null) {
        x.close();
      }
    });
  };
  const handleDrawerOpen = () => {
    dispatch(showorhide(true));
    // setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch(showorhide(false));
    // setOpen(false);
  };
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  const [width] = useWindowSize();

  useEffect(() => {
    if (width <= 768) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  }, [width]);
  return (
    <div className={classes.root}>
      {isAuthenticated() ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: state,
            [classes.drawerClose]: !state,
          })}
          classes={{
            paper: clsx(classes.paper, {
              [classes.drawerOpen]: state,
              [classes.drawerClose]: !state,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Typography
              className={clsx(classes.title, {
                [classes.hide]: !state,
              })}
              noWrap
            >
              {" "}
              Gestion Stock
            </Typography>

            <IconButton
              onClick={handleDrawerClose}
              className={clsx(classes.paper, {
                [classes.hide]: !state,
              })}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>

            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: state,
              })}
            >
              <MenuIcon className={classes.paper} />
            </IconButton>
          </div>
          <Divider classes={{ root: classes.divider }} />

          {keys.map((item, index) => {
            return (
              <SubMenu
                onOpen={onOpen}
                item1={item}
                key={index}
                state={state}
                props={props}
              />
            );
          })}
        </Drawer>
      ) : (
        ""
      )}
    </div>
  );
};
const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  divider: {
    // Theme Color, or use css color in quote
    background: "white",
  },
  paper: {
    backgroundColor: "#011627",
    color: "white",
  },
  title: {
    marginRight: "60px",
    fontSize: "17px",
    fontWeight: "bold",
  },
  menuButton: { marginLeft: "0px" },

  hide: {
    display: "none",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: "1215 !important",
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar

    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export default withRouter(Sidebar);
