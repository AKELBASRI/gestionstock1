import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
const Popupend = (Props) => {
  //   const [open, setOpen] = React.useState(false);
  const { show, handleClose } = Props;
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Inventaire  est fini pour cette année "}
          <Alert severity="info">{"l'inventaire est cloturé "}</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <Alert severity="info">{"l'inventaire est cloturé "}</Alert> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              Props.history.push("/");
            }}
          >
            {"Retour vers la page d'acceuil"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default withRouter(Popupend);
