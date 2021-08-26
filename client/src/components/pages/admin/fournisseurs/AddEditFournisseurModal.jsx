import React, { useEffect } from "react";

import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated } from "../../../../auth/helpers";
import { API_URL } from "../../../../config";


import { useStyles } from "../../../../core/styleModalForm";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { FetchFournisseur } from "../../../../store/actions";

function AddEditFournisseurModal(Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const fournisseur = useSelector((state) =>
    Props.id
      ? state.requests?.queries?.FETCH_FOURNISSEUR?.data.find((p) => p.idFournisseur === Props.id)
      : null
  );
  useEffect(() => {
    if (fournisseur) {
      setValue("object", fournisseur);
    } else {
      reset();
    }
    if (!Props.show) {
      reset();
    }
  }, [fournisseur, Props.show]);

  const AddFournisseur = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/fournisseurs/create/${user.Mle}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.object),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(
            res.error,
            "S'il vous plaît Veuillez vérifier le Formulaire",
            {
              positionClass: "toast-bottom-left",
            }
          );
        } else {
          //props.history.push('/');
          toastr.success(
            `Le Fournisseur ${data.object.NomFournisseur}  est crée avec succés `,
            "Nouveau Fournisseur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();
          dispatch(FetchFournisseur());
          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const updateFournisseur = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/fournisseurs/update/${user.Mle}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.object),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(
            res.error,
            "S'il vous plaît Veuillez vérifier le Formulaire",
            {
              positionClass: "toast-bottom-left",
            }
          );
        } else {
          dispatch(FetchFournisseur());
          //props.history.push('/');
          toastr.success(
            `Le fournisseur ${data.object.NomFournisseur}  est modifié avec succés `,
            "Modification Fournisseur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();

          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const onSubmit = (data) => {
    if (!Props.id) {
      AddFournisseur(data);
    } else {
      updateFournisseur(data);
    }
  };

  const classes = useStyles();
  return (
    <Dialog
      open={Props.show}
      onClose={Props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title" className={classes.bg}>
        {fournisseur
          ? `Modification  du Fournisseur : ${fournisseur.NomFournisseur} `
          : "Ajout Fournisseur"}
      </DialogTitle>
      <DialogContent className={classes.bg}>
        <DialogContentText className={classes.bg}></DialogContentText>

        <label className={classes.label}>Nom Fournisseur</label>
        <input
          className={classes.input}
          id="object.NomFournisseur"
          name="object.NomFournisseur"
          type="text"
          {...register("object.NomFournisseur", {
            required: "You must enter a name of Fournisseur",
          })}
        />
        {errors["object"]?.NomFournisseur && (
          <p className={classes.para}>
            {errors["object"].NomFournisseur?.message}
          </p>
        )}
      </DialogContent>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <DialogActions className={classes.bg}>
          <Button
            onClick={Props.handleClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>

          <Button color="primary" variant="contained" type="submit">
            {Props.id ? "Modifier" : "Ajout"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddEditFournisseurModal;
