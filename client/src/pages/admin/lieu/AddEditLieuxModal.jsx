import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { useStyles } from "../../../core/styleModalForm";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated } from "../../../auth/helpers";

import { useForm } from "react-hook-form";

import customAxios from "../../../axios/CustomAxios";
import { FetchLieu } from "../../../store/actions";

function AddEditLieuxModal(Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,

    formState: { errors },
  } = useForm();

  // const [checked, setChecked] = React.useState(true);

  const dispatch = useDispatch();
  const lieu = useSelector((state) =>
    Props.id
      ? state.requests?.queries?.FETCH_LIEUX?.data.find(
          (p) => p.id === Props.id
        )
      : null
  );
  useEffect(() => {
    if (lieu) {
      setValue("object", lieu);
    } else {
      setValue("object", { lieu: "" });
      clearErrors();
    }
    if (!Props.show) {
      setValue("object", { lieu: "" });
    }
  }, [lieu, Props.show]);

  const AddLieu = (data) => {
    const { user } = isAuthenticated();

    customAxios
      .post(`/lieux/create/${user.Mle}`, JSON.stringify(data.object))

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
          setValue("object", { lieu: "" });
          //props.history.push('/');
          toastr.success(
            `Le lieu ${data.object.lieu}  est crée avec succés `,
            "Nouveau Lieu",
            {
              positionClass: "toast-bottom-left",
            }
          );

          dispatch(FetchLieu());
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
  const updateLieu = (data) => {
    console.log(data);
    const { user } = isAuthenticated();
    customAxios
      .put(`/lieux/update/${user.Mle}`, JSON.stringify(data.object))

      .then(() => {
        dispatch(FetchLieu());
        //props.history.push('/');
        toastr.success(
          `lieu ${data.object.lieu}  est modifié avec succés `,
          "Modification Lieu",
          {
            positionClass: "toast-bottom-left",
          }
        );
        reset({
          object: {},
        });

        Props.handleClose();
        // }
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
    if (!Props.id) {
      AddLieu(data);
    } else {
      updateLieu(data);
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
        {lieu ? `Modification  du lieu : ${lieu.lieu} ` : "Ajout Lieu"}
      </DialogTitle>
      <DialogContent className={classes.bg}>
        <DialogContentText className={classes.bg}></DialogContentText>

        <label className={classes.label}>Nom</label>
        <input
          className={classes.input}
          id="object.lieu"
          name="object.lieu"
          type="text"
          {...register("object.lieu", {
            required: "You must enter a name of place",
          })}
        />
        {errors["object"]?.lieu && (
          <p className={classes.para}>{errors["object"].lieu?.message}</p>
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

export default AddEditLieuxModal;
