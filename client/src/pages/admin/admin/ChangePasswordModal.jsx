import React, { useRef } from "react";
import { Button } from "@material-ui/core";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../auth/helpers";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useStyles } from "../../../core/styleModalForm";
import customAxios from "../../../axios/CustomAxios";

function ChangePasswordModal(Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = useRef({});

  password.current = watch("password", "");

  const onSubmit = (data) => {
    const { user } = isAuthenticated();
    customAxios
      .put(
        `/admin/updatepassword/${user.Mle}`,
        JSON.stringify({
          password: data.password,
          Mle: Props.usernormal.Mle,
        })
      )

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
          toastr.success(
            `Changement mot de passe bien effectué ${Props.usernormal.nom}   `,
            "Changement mot de passe Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset(res);

          Props.handleClose();
        }
      })
      .catch((err) => {
        if (err.response.status >= 400 && err.response.status < 500) {
          toastr.warning(
            err.response.data.error,
            "S'il vous plaît Veuillez vérifier le Formulaire",
            {
              positionClass: "toast-bottom-left",
            }
          );
        } else {
          toastr.error(err.response.data.error, "Erreur du serveur", {
            positionClass: "toast-bottom-left",
          });
        }
      });
  };

  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <Dialog
        open={Props.show}
        onClose={Props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.bg}>
          {`Modification mot de passe du : ${Props.usernormal.nom} Matricule :${Props.usernormal.Mle}
           `}
        </DialogTitle>
        <DialogContent className={classes.bg}>
          <DialogContentText className={classes.bg}>
            Changement Mot de passe
          </DialogContentText>

          <label className={classes.label}>Mot de Passe</label>
          <input
            className={classes.input}
            id="password"
            type="password"
            {...register("password", {
              required: "You must specify a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className={classes.para}>{errors.password.message}</p>
          )}
          <label className={classes.label}>Confirmer Mot de Passe</label>
          <input
            className={classes.input}
            id="password_repeat"
            type="password"
            {...register("password_repeat", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          {errors.password_repeat && (
            <p className={classes.para}>{errors.password_repeat.message}</p>
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
              Changement mot de passe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ChangePasswordModal;
