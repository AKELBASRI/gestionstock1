import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { API_URL } from "../../../../config";
import { isAuthenticated } from "../../../../auth/helpers";
import { getusers } from "../../../../actions/getUserAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useStyles } from "../../../../core/styleModalForm";
import { useForm } from "react-hook-form";

function AddEditUserModal(Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const usernormal = useSelector((state) =>
    Props.Mle ? state.usersReducer.find((p) => p.Mle === Props.Mle) : null
  );
  useEffect(() => {
    if (usernormal) {
      setValue("object", usernormal);
    } else {
      reset();
      clearErrors();
    }
  }, [usernormal]);

  const classes = useStyles();

  const UpdateUser = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/admin/update/${user.Mle}`, {
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
        console.log(res);
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
            `L'utilisateur ${data.object.nom}  est modifié avec succés `,
            "Modification Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          // setUser({ Mle: "", password: "", codesce: "", nom: "" });
          dispatch(getusers());
          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const AddUser = (data) => {
    console.log(data.object);
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/admin/create/${user.Mle}`, {
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
          Props.handleClose();

          toastr.success(
            `L'utilisateur ${data.object.nom}  est crée avec succés `,
            "Nouveau Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();
          clearErrors();
          dispatch(getusers());
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };

  const onSubmit = (data) => {
    if (usernormal) {
      UpdateUser(data);
    } else {
      AddUser(data);
    }
  };

  return (
    <div>
      <Dialog
        open={Props.show}
        onClose={Props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title" className={classes.bg}>
          {usernormal
            ? `Modification  de l'utilisateur : ${usernormal.nom} Matricule : ${usernormal.Mle}`
            : "Ajout Utilisateur"}
        </DialogTitle>
        <DialogContent className={classes.bg}>
          <DialogContentText className={classes.bg}></DialogContentText>

          <label className={classes.label}>Nom</label>
          <input
            className={classes.input}
            id="object.nom"
            type="text"
            {...register("object.nom", {
              required: "You must specify a name",
            })}
          />
          {errors["object"]?.nom && (
            <p className={classes.para}>{errors["object"].nom?.message}</p>
          )}
          {!usernormal && (
            <div>
              <label className={classes.label}>Matricule</label>
              <input
                className={classes.input}
                id="object.Mle"
                type="text"
                {...register("object.Mle", {
                  required: "You must specify Mle",
                })}
              />
              {errors["object"]?.Mle && (
                <p className={classes.para}>{errors["object"]?.Mle?.message}</p>
              )}
              <label className={classes.label}>Mot de passe</label>
              <input
                className={classes.input}
                id="object.password"
                type="password"
                {...register("object.password", {
                  required: "You must specify password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              {errors["object"]?.password && (
                <p className={classes.para}>
                  {errors["object"].password?.message}
                </p>
              )}
            </div>
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
              {usernormal ? "Modifier" : "Ajout"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default AddEditUserModal;
