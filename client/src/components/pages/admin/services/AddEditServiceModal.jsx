import React, { useEffect, useState } from "react";
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
import { FetchService } from "../../../../store/actions";
import ReactHookFormSelect from "../../../../core/Components/ReactHookFormSelect";
import ReactHookFormReactSelect from "../../../../core/Components/ReactHookReactSelect";
import { MenuItem } from "@material-ui/core";

function AddEditServiceModal(Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,

    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [parents, setparents] = useState([]);
  const service = useSelector((state) =>
    Props.CodeSce
      ? state.requests?.queries?.FETCH_SERVICE?.data.find(
          (p) => p.id === Props.CodeSce
        )
      : null
  );
  const services = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE?.data
  );
  const optionsParents =
    parents &&
    parents.map((parentsce) => ({
      value: parentsce.id,
      label: parentsce.service_name,
    }));
  const optionsService =
    services &&
    services.map((service) => ({
      value: service.id,
      label: service.service_name,
    }));
  useEffect(() => {
    console.log(Props.CodeSce);
    if (!services) {
      dispatch(FetchService());
    }
    if (service) {
      setValue("object", service);
      console.log(service);
    } else {
      reset();
    }
    if (!Props.show) {
      reset();
    }
  }, [service, Props.show]);

  const AddService = (data) => {
    console.log(data.object);
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
          dispatch(FetchService());
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
          dispatch(FetchService());
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
    if (!Props.CodeSce) {
      AddService(data);
    } else {
      updateService(data);
    }
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setparents(
      services.filter(
        (service) => service.hierarchyLevel === e.target.value - 1
      )
    );
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
        <DialogContent className={classes.bg} style={{ height: "451px" }}>
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

          {/* <input
            type="number"
            className={classes.input}
            id="object.hierarchyLevel"
            name="object.hierarchyLevel"
            {...register(
              "object.hierarchyLevel",
              {
                required: "You must enter Hiearchy Level",
                min: 1,
                max: 5,
              },
              { min: 2, max: 5 }
            )}
          /> */}

          <label className={classes.label}>Hiearchy Level</label>
          <ReactHookFormSelect
            className={classes.select}
            label="Selectionner une hiearchy"
            id="object.hierarchyLevel"
            name="object.hierarchyLevel"
            control={control}
            defaultValue={"0"}
            onchange={onChange}
            garentiereg={register("object.hierarchyLevel", {
              validate: (value) => value !== "0",
            })}
          >
            <MenuItem value="0" style={{ cursor: "pointer" }}>
              Selectionner hiearchy
            </MenuItem>
            {/* <MenuItem key="1" value="1" style={{ cursor: "pointer" }}>
              Direction
            </MenuItem> */}
            <MenuItem key="2" value="2" style={{ cursor: "pointer" }}>
              Division
            </MenuItem>
            <MenuItem key="3" value="3" style={{ cursor: "pointer" }}>
              Service
            </MenuItem>
            <MenuItem key="4" value="4" style={{ cursor: "pointer" }}>
              Bureau
            </MenuItem>
            <MenuItem key="5" value="5" style={{ cursor: "pointer" }}>
              Section
            </MenuItem>
          </ReactHookFormSelect>
          {errors["object"]?.hierarchyLevel && (
            <p className={classes.para}>
              {errors["object"]?.hierarchyLevel?.message ||
                "You must select a hiearchy"}
            </p>
          )}

          {service?.hierarchyLevel !== 1 ? (
            <>
              <label className={classes.label}>Parent</label>
              <ReactHookFormReactSelect
                options={Props.CodeSce ? optionsService : optionsParents}
                className={classes.SelectSearch}
                id="object.parentId"
                Name="object.parentId"
                control={control}
                reef={register("object.parentId", { required: true })}
              />
              {errors["object"]?.parentId && (
                <p className={classes.para}>
                  {errors["object"]?.parentId?.message ||
                    "You must select an agency"}
                </p>
              )}
            </>
          ) : null}
          {errors["object"]?.service_id && (
            <p className={classes.para}>
              {errors["object"]?.service_id?.message ||
                "You must select a service"}
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
