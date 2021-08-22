import React, { useState, useEffect } from "react";

import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated } from "../../../../auth/helpers";
import { API_URL } from "../../../../config";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { getDesignation } from "../../../../actions/getDesignationAction";
import { getCategories } from "../../../../core/ApiCore";
import { useStyles } from "../../../../core/styleModalForm";
import { useForm } from "react-hook-form";
import ReactHookFormSelect from "../../../../core/Components/ReactHookFormSelect";
function AddEditDesignationModal(Props) {
  // const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const designation = useSelector((state) =>
    Props.iddesignation
      ? state.designationReducer.find(
          (p) => p.idDesignation === Props.iddesignation
        )
      : null
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res))
      .catch((err) => console.log(err));
    if (designation) {
      setValue("object", designation);
    } else {
      reset();
    }
    if (!Props.show) {
      reset();
    }
  }, [designation, Props.show]);

  const AddDesignation = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/designations/create/${user.Mle}`, {
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
            `La designation ${data.object.designation}  a été crée avec succés `,
            "Nouvelle Designation",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();
          dispatch(getDesignation());
          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const updateDesignation = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/designations/update/${user.Mle}`, {
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
          dispatch(getDesignation());
          //props.history.push('/');
          toastr.success(
            `Designation ${data.object.designation}  est modifié avec succés `,
            "Modification designation",
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
    if (!Props.iddesignation) {
      AddDesignation(data);
    } else {
      updateDesignation(data);
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
        {designation
          ? `Modification  du designation : ${designation.designation} `
          : "Ajout Designation"}
      </DialogTitle>
      <DialogContent className={classes.bg}>
        <DialogContentText className={classes.bg}></DialogContentText>
        <label className={classes.label}>Designation</label>
        <input
          className={classes.input}
          id="object.designation"
          type="text"
          {...register("object.designation", {
            required: "You must specify a designation",
          })}
        />
        {errors["object"]?.designation && (
          <p className={classes.para}>
            {errors["object"].designation?.message}
          </p>
        )}

        <InputLabel htmlFor="age-native-simple" className={classes.label}>
          Type
        </InputLabel>
        <ReactHookFormSelect
          className={classes.select}
          label="Selectionner une categorie"
          id="object.idtype"
          name="object.idtype"
          control={control}
          defaultValue={"0"}
          reef={register("object.idtype", {
            validate: (value) => value !== "0",
          })}
        >
          <MenuItem value="0" style={{ cursor: "pointer" }}>
            Selectionner une categorie
          </MenuItem>
          {categories &&
            categories.map((category, i) => (
              <MenuItem
                key={i + 1}
                value={category.id}
                style={{ cursor: "pointer" }}
              >
                {category.type}
              </MenuItem>
            ))}
        </ReactHookFormSelect>
        {errors["object"]?.idtype && (
          <p className={classes.para}>
            {errors["object"]?.idtype?.message || "You must select a category"}
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
            {Props.iddesignation ? "Modifier" : "Ajout"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddEditDesignationModal;
