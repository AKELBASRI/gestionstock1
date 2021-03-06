import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EndOfInventory } from "./EndOfInventory";
import { useDispatch } from "react-redux";
import { Fetch_table_exist } from "../../../store/actions";
export default function AreYouSure(Props) {
  //   const [open, setOpen] = React.useState(false);
  const { show, handleClose, showpopup } = Props;
  const dispatch = useDispatch();
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
          {"Iventaire  fini pour cette année ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              "Le Systeme va cloturer l'inventaire pour cette Année et reseter vers non disponible"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              EndOfInventory().then((result) => {
                if (result) {
                  handleClose();
                  dispatch(Fetch_table_exist());
                  showpopup(true);
                }
              });
            }}
          >
            oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
