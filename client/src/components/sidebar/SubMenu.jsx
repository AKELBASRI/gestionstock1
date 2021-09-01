import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import MuiListItem from "@material-ui/core/ListItem";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    fontSize: "14px !important",
  },
  nested: {
    paddingLeft: theme.spacing(9),
    paddingTop: theme.spacing(3),
  },
  leftitem: {
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  listItemText: {
    fontSize: "1em", //Insert your required size
  },
  item: {
    marginTop: "5px",
    padding: "16px 16px !important",
  },
  showleft: {
    position: "fixed !important",
    display: "block",
    left: "57px",
    transform: "translateY(-25%)",
    backgroundColor: "#011627",
    transition: "transform 1s ease",
  },
}));

function SubMenu(Props) {
  const ListItem = withStyles({
    root: {
      // "&$selected": {
      //   backgroundColor: "red",
      //   color: "white",
      //   "& .MuiListItemIcon-root": {
      //     color: "white"
      //   }
      // },
      // "&$selected:hover": {
      //   backgroundColor: "purple",
      //   color: "white",
      //   "& .MuiListItemIcon-root": {
      //     color: "white"
      //   }
      // },
      "&:hover": {
        backgroundColor: "#172b4d",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white",
        },
      },
    },
    selected: {},
  })(MuiListItem);
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const classes = useStyles();
  Props.item1.close = () => {
    setSubnav(false);
  };
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return {
        background: "#172b4d",
        width: "100%",
      };
    } else {
      return {
        width: "100%",
      };
    }
  };
  const clickitem = (item1, path) => {
    if (item1.item.subNav) {
      showSubnav();
    } else if (path) {
      Props.onOpen(item1.key);
    }
  };
  useEffect(() => {
    if (subnav) {
      Props.onOpen(Props.item1.key);
    }
  }, [Props.item1.key, Props.onOpen, subnav]);
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem
        button
        component={Link}
        to={Props.item1.item.subNav ? "#" : Props.item1.item.path}
        style={isActive(Props.props.history, Props.item1.item.path)}
        className={classes.item}
        onClick={() => clickitem(Props.item1, Props.item1.item.path)}
      >
        <ListItemIcon style={{ color: "white" }}>
          {Props.item1.item.icon}
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.listItemText }}>
          {Props.item1.item.title}
        </ListItemText>
        {Props.item1.item.subNav &&
          (Props.item1.item.subNav && subnav
            ? Props.item1.item.iconOpened
            : Props.item1.item.subNav
            ? Props.item1.item.iconClosed
            : null)}
      </ListItem>
      {subnav && (
        <div className={!Props.state ? classes.showleft : ""}>
          {subnav &&
            Props.item1.item.subNav &&
            Props.item1.item.subNav.map((item, index) => {
              return (
                <Collapse key={index} in={subnav} timeout="auto" unmountOnExit>
                  <List key={index} component="div" disablePadding>
                    <ListItem
                      button
                      component={Link}
                      to={item.path}
                      style={isActive(Props.props.history, item.path)}
                      className={
                        Props.state ? classes.nested : classes.leftitem
                      }
                    >
                      <ListItemText classes={{ primary: classes.listItemText }}>
                        {item.title}
                      </ListItemText>
                    </ListItem>
                  </List>
                </Collapse>
              );
            })}
        </div>
      )}
    </List>
  );
}

export default withRouter(SubMenu);
