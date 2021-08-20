import { makeStyles, Button, withStyles } from "@material-ui/core";
export const ColorButton = withStyles(() => ({
  root: {
    height: "45px",
    width: "160px",
    color: "white",
    borderRadius: "2px",
    backgroundColor: "#011627",
    padding: "30px 12px",
    boxShadow: "-2px -1px 15px 1px rgba(0,0,0,0.40)",
    "&:hover": {
      backgroundColor: "white",
      color: "#011627",
    },
  },
}))(Button);
export const useStyles = makeStyles(() => ({
  input: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid white",
    padding: "10px 15px",
    marginBottom: "20px",
    fontSize: " 14px",
  },
  select: {
    width: "100%",
    borderRadius: "4px",
    border: "1px solid white",
    backgroundColor: "white",
    color: "black",
    padding: "5px 10px",
    marginBottom: "20px",
    width: "100%",
  },
  bg: {
    background: "#011627",
    color: "white",
  },
  para: {
    color: "#bf1650",
    "&::before": {
      display: "inline",
      content: '"⚠ "',
    },
  },
  label: {
    lineHeigh: "2",
    textAlign: "left",
    display: "block",
    marginBottom: "20px",
    marginTop: "0px",
    color: "white",
    fontSize: "14px",
    fontWeight: "200",
    marginTop: "20px",
  },
}));
