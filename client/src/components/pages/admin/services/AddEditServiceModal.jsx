import React, { useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated } from "../../../../auth/helpers";

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

import customAxios from "../../../../axios/CustomAxios";
import Actions from "../../../../store/actions";
function AddEditServiceModal(Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const service = useSelector((state) =>
    Props.CodeSce
      ? state.requests?.queries?.FETCH_SERVICE?.data.find(
          (p) => p.id === Props.CodeSce
        )
      : null
  );
  useEffect(() => {
    if (service) {
      setValue("object", service);
    } else {
      reset();
    }
    if (!Props.show) {
      reset();
    }
  }, [service, Props.show]);

  const AddService = (data) => {
    const { user } = isAuthenticated();
    customAxios
      .post(`/service/create/${user.Mle}`, JSON.stringify(data.object))

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
            `Le service ${data.object.service_name}  est crée avec succés `,
            "Nouveau Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();
          dispatch(new Actions().FetchService());
          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err.response.data.error, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const updateService = (data) => {
    const { user } = isAuthenticated();
    customAxios
      .put(`/service/update/${user.Mle}`, JSON.stringify(data.object))

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
          dispatch(new Actions().FetchService());
          //props.history.push('/');
          toastr.success(
            `Le service ${data.object.service_name}  est modifié avec succés `,
            "Modification Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();

          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err.response.data.error, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const onSubmit = (data) => {
    if (!Props.CodeSce) {
      AddService(data);
    } else {
      updateService(data);
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={Props.show}
        onClose={Props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title" className={classes.bg}>
          {service
            ? `Modification  du service : ${service.service_name} `
            : "Ajout Service"}
        </DialogTitle>
        <DialogContent className={classes.bg}>
          <DialogContentText className={classes.bg}></DialogContentText>

          <label className={classes.label}>Libelle</label>
          <input
            className={classes.input}
            id="object.service_name"
            name="object.service_name"
            type="text"
            {...register("object.service_name", {
              required: "You must enter a name of service",
            })}
          />
          {errors["object"]?.service_name && (
            <p className={classes.para}>
              {errors["object"].service_name?.message}
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
              {Props.CodeSce ? "Modifier" : "Ajout"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddEditServiceModal;
