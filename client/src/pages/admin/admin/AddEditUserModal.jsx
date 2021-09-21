import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../auth/helpers";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useStyles } from "../../../core/styleModalForm";
import { useForm } from "react-hook-form";

import axios from "../../../axios/CustomAxios";
import { FetchAdmin } from "../../../store/actions";
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
    Props.Mle
      ? (state.requests?.queries?.FETCH_ADMINS?.data).find(
          (p) => p.Mle === Props.Mle
        )
      : null
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
    const { user } = isAuthenticated();
    axios
      .put(`/admin/update/${user.Mle}`, JSON.stringify(data.object))

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
            `L'utilisateur ${data.object.nom}  est modifié avec succés `,
            "Modification Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          // setUser({ Mle: "", password: "", codesce: "", nom: "" });
          dispatch(FetchAdmin());
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
  const AddUser = (data) => {
    const { user } = isAuthenticated();
    axios
      .post(`/admin/create/${user.Mle}`, JSON.stringify(data.object))

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
            `L'utilisateur ${data.object.nom}  est crée avec succés `,
            "Nouveau Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          // setUser({ Mle: "", password: "", codesce: "", nom: "" });
          dispatch(FetchAdmin());
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
