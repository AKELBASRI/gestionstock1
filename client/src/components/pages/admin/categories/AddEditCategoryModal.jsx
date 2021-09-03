import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { useStyles } from "../../../../core/styleModalForm";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated } from "../../../../auth/helpers";

import { useForm } from "react-hook-form";
import ReactHookFormSwitch from "../../../../core/Components/ReactHookFormSwitch";
import customAxios from "../../../../axios/CustomAxios";
import { FetchCategory } from "../../../../store/actions";

function AddEditCategoryModal(Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    getValues,
    control,

    formState: { errors },
  } = useForm();

  // const [checked, setChecked] = React.useState(true);

  const dispatch = useDispatch();
  const category = useSelector((state) =>
    Props.CodeSce
      ? state.requests?.queries?.FETCH_CATEGORY?.data.find(
          (p) => p.id === Props.CodeSce
        )
      : null
  );
  useEffect(() => {
    if (category) {
      setValue("object", category);
    } else {
      setValue("object", { type: "", inventoryornot: false });
      clearErrors();
    }
    if (!Props.show) {
      setValue("object", { type: "", inventoryornot: false });
    }
  }, [category, Props.show]);

  const AddCategory = (data) => {
    const { user } = isAuthenticated();
    customAxios
      .post(`/category/create/${user.Mle}`, JSON.stringify(data.object))

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
          setValue("object", { type: "", inventoryornot: false });
          //props.history.push('/');
          toastr.success(
            `La categorie ${data.object.type}  est crée avec succés `,
            "Nouvelle Category",
            {
              positionClass: "toast-bottom-left",
            }
          );

          dispatch(FetchCategory());
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
  const updateCategory = (data) => {
    const { user } = isAuthenticated();
    customAxios
      .put(`/category/update/${user.Mle}`, JSON.stringify(data.object))

      .then(() => {
        dispatch(FetchCategory());
        //props.history.push('/');
        toastr.success(
          `category ${data.object.type}  est modifié avec succés `,
          "Modification Service",
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
    if (!Props.CodeSce) {
      AddCategory(data);
    } else {
      updateCategory(data);
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
        {category
          ? `Modification  du category : ${category.type} `
          : "Ajout Category"}
      </DialogTitle>
      <DialogContent className={classes.bg}>
        <DialogContentText className={classes.bg}></DialogContentText>

        <label className={classes.label}>Nom</label>
        <input
          className={classes.input}
          id="object.type"
          name="object.type"
          type="text"
          {...register("object.type", {
            required: "You must enter a name of category",
          })}
        />
        {errors["object"]?.type && (
          <p className={classes.para}>{errors["object"].type?.message}</p>
        )}
        <label className={classes.label}>Inventory or Not</label>
        <ReactHookFormSwitch
          name="object.inventoryornot"
          id="object.inventoryornot"
          control={control}
          reef={register("object.inventoryornot", {})}
          Value={getValues("object.inventoryornot")}
        ></ReactHookFormSwitch>
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
  );
}

export default AddEditCategoryModal;
