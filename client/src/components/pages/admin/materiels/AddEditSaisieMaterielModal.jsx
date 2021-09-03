import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";
import NumericInput from "react-numeric-input";
// import FormControl from 'react-bootstrap/lib/FormControl';
import useStateRef from "react-usestateref";

import { isAuthenticated } from "../../../../auth/helpers";
import DateFnsUtils from "@date-io/date-fns";
import { getdesignationbytype } from "../../../../core/ApiCore";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "../../../../core/styleModalForm";
import { useForm } from "react-hook-form";
import ReactHookFormSelect from "../../../../core/Components/ReactHookFormSelect";

import customAxios from "../../../../axios/CustomAxios";
import {
  FetchCategory,
  FetchFournisseur,
  FetchMateriels,
  FetchTotalAvailableMateriels,
  FetchTotalMateriels,
} from "../../../../store/actions";

const AddEditSaisieMaterielModal = (Props) => {
  const [date, setDate] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const categories = useSelector(
    (state) => state.requests?.queries?.FETCH_CATEGORY?.data
  );

  const Fournisseurs = useSelector(
    (state) => state.requests?.queries?.FETCH_FOURNISSEUR?.data
  );
  // const [, setIsValid, ref] = useStateRef(true);
  const [, setShowInventory, showInventory] = useStateRef(true);

  const [, setDesignation, Designations] = useStateRef([]);
  const [, setMaterial, material] = useStateRef({});
  const [Qte, setQte] = useState(1);
  const dispatch = useDispatch();
  let material1 = useSelector((state) =>
    Props.codemtrl
      ? state.requests?.queries?.FETCH_MATERIELS?.data.find(
          (p) => p.idmateriel === Props.codemtrl
        )
      : null
  );
  useEffect(() => {
    if (!categories) {
      dispatch(FetchCategory());
    }
    if (!Fournisseurs) {
      dispatch(FetchFournisseur());
    }

    if (material1) {
      setValue("object", material1);
      LoadDesignations(material1);
    } else {
      reset();
      setValue("object.datereceptionprovisoire", null);
    }
    if (!Props.show) {
      reset();
      setDate(null);
    }
  }, [material1, setMaterial, Props.show]);
  const handleQte = (e) => {
    setQte(e);
  };

  const checkenventoryornot = () => {
    const catselected = categories.find(
      (cat) => cat.id === parseInt(getValues("object.idtype"))
    );
    if (catselected) {
      if (!catselected.inventoryornot) {
        setShowInventory(false);
        setMaterial({ ...material.current, numeroinventaire: "" });
      } else {
        setShowInventory(true);
      }
    }
  };
  const handleChange = () => {
    // const value = e.target.id === "Qte" ? e.target.value - 1 : e.target.value;
    // setMaterial({ ...material.current, [e.target.id]: value });
    checkenventoryornot();
    LoadDesignations(getValues("object"));
  };
  const LoadDesignations = async (material) => {
    if (material !== undefined) {
      getdesignationbytype(material.idtype)
        .then((res) => {
          setDesignation(res.designation);

          checkifdesignationexist(res.designation);
        })
        .catch((err) => console.log(err));
    }
  };
  const checkifdesignationexist = (arrayofdesignations) => {
    if (arrayofdesignations.length === 0) {
      Props.handleClose();
      toastr.warning("Pas de designation sur ce type", "Alerte", {
        positionClass: "toast-bottom-left",
      });
    }
  };
  const UpdateMateriel = (data) => {
    const marque = Designations.current.filter(
      (designation) =>
        parseInt(designation?.idDesignation) ===
        parseInt(data.object?.iddesignation)
    )[0].designation;
    const { user } = isAuthenticated();
    customAxios
      .put(`/materiels/update/${user.Mle}`, JSON.stringify(data.object))

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
            `Le Materiel ${marque}  est été modifié avec succés `,
            "Modification Materiel",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();
          dispatch(FetchMateriels());
          dispatch(FetchTotalAvailableMateriels());
          dispatch(FetchTotalMateriels());
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
  const AjoutMateriel = (data) => {
    const marque = Designations.current.filter(
      (designation) =>
        parseInt(designation?.idDesignation) ===
        parseInt(data.object?.iddesignation)
    )[0].designation;

    for (let i = 0; i < Qte; i++) {
      const { user } = isAuthenticated();
      customAxios
        .post(`/materiels/create/${user.Mle}`, JSON.stringify(data.object))

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
              `Le Materiel ${marque}  est crée avec succés `,
              "Nouveau Materiel",
              {
                positionClass: "toast-bottom-left",
              }
            );
            dispatch(FetchTotalAvailableMateriels());
            dispatch(FetchTotalMateriels());
            dispatch(FetchMateriels());
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

      if (i === Qte - 1) {
        //  reset();
        setQte(1);
      }
    }
  };

  const onSubmit = (data) => {
    // setValue('object.datereceptionprovisoire',dateFormat(data.object.datereceptionprovisoire,"dd-mm-yyyy"))
    // e.preventDefault();
    // if (validate()) {

    if (material1) {
      UpdateMateriel(data);
    } else {
      AjoutMateriel(data);
    }
    // }
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
          {material1
            ? `Modification  du materiel : ${material1.designation.designation}`
            : "Ajout Materiel"}
        </DialogTitle>
        <DialogContent className={classes.bg}>
          <DialogContentText className={classes.bg}></DialogContentText>

          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Type
          </InputLabel>
          <ReactHookFormSelect
            onchange={handleChange}
            className={classes.select}
            label="Selectionner une categorie"
            id="object.idtype"
            name="object.idtype"
            control={control}
            defaultValue={0}
            reef={register("object.idtype", {
              validate: (value) => value !== 0,
              required: true,
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
              {errors["object"]?.idtype?.message ||
                "You must select a category"}
            </p>
          )}

          {showInventory.current && (
            <div>
              <label className={classes.label}>Numero Inventaire</label>
              <input
                className={classes.input}
                name="object.numeroinventaire"
                id="object.numeroinventaire"
                type="text"
                {...register("object.numeroinventaire", {
                  required: "You must specify a number of inventory",
                })}
              />
              {errors["object"]?.numeroinventaire && (
                <p className={classes.para}>
                  {errors["object"].numeroinventaire?.message}
                </p>
              )}
            </div>
          )}
          {!showInventory.current && !Props.codemtrl && (
            <div>
              <label className={classes.label}>Quantité</label>
              <FormControl
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "60px",
                }}
              >
                <NumericInput
                  min={0}
                  max={100}
                  value={Qte || 1}
                  onChange={handleQte}
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    padding: "10px",
                  }}
                  id="Qte"
                />
              </FormControl>
            </div>
          )}

          {Designations.current.length > 0 && (
            <div>
              <label className={classes.label}>Designation</label>
              <ReactHookFormSelect
                className={classes.select}
                label="Selectionner une Designation"
                id="object.iddesignation"
                name="object.iddesignation"
                control={control}
                defaultValue={"0"}
                reef={register("object.iddesignation", {
                  validate: (value) => value !== "0",
                })}
              >
                <MenuItem value="0" style={{ cursor: "pointer" }}>
                  Selectionner Designation du materiel
                </MenuItem>
                {Designations.current &&
                  Designations.current.map((marque, i) => (
                    <MenuItem
                      key={i + 1}
                      value={marque.idDesignation}
                      style={{ cursor: "pointer" }}
                    >
                      {marque.designation}
                    </MenuItem>
                  ))}
              </ReactHookFormSelect>
              {errors["object"]?.iddesignation && (
                <p className={classes.para}>
                  {errors["object"]?.iddesignation?.message ||
                    "You must select a designation"}
                </p>
              )}
            </div>
          )}

          <label className={classes.label}>Garentie</label>
          <ReactHookFormSelect
            className={classes.select}
            label="Selectionner une gerentie"
            id="object.garentie"
            name="object.garentie"
            control={control}
            defaultValue={"0"}
            garentiereg={register("object.garentie", {
              validate: (value) => value !== "0",
            })}
          >
            <MenuItem value="0" style={{ cursor: "pointer" }}>
              Selectionner la garentie
            </MenuItem>
            <MenuItem key="1" value="1" style={{ cursor: "pointer" }}>
              1 an
            </MenuItem>
            <MenuItem key="2" value="2" style={{ cursor: "pointer" }}>
              2 ans
            </MenuItem>
            <MenuItem key="3" value="3" style={{ cursor: "pointer" }}>
              3 ans
            </MenuItem>
          </ReactHookFormSelect>
          {errors["object"]?.garentie && (
            <p className={classes.para}>
              {errors["object"]?.garentie?.message ||
                "You must select a garentie"}
            </p>
          )}

          <label className={classes.label}>Date Reception Provisoire</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: "5px",
              }}
              id="object.datereceptionprovisoire"
              value={getValues("object.datereceptionprovisoire") || date}
              onChange={(date) => {
                setValue("object.datereceptionprovisoire", date);
                setDate(date);
              }}
              format="yyyy-MM-dd"
              margin="normal"
              name="object.datereceptionprovisoire"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              disableToolbar
              inputRef={register("object.datereceptionprovisoire", {
                required: "You must specify a date",
              })}
            />
          </MuiPickersUtilsProvider>
          {errors["object"]?.datereceptionprovisoire && (
            <p className={classes.para}>
              {errors["object"].datereceptionprovisoire?.message}
            </p>
          )}

          <label className={classes.label}>Fournisseur</label>
          <ReactHookFormSelect
            className={classes.select}
            value={getValues("object.IDFournisseur")}
            label="Selectionner un fournisseur"
            id="object.IDFournisseur"
            name="object.IDFournisseur"
            control={control}
            defaultValue={"0"}
            reef={register("object.IDFournisseur", {
              validate: (value) => value !== "0",
            })}
          >
            <MenuItem value="0" style={{ cursor: "pointer" }}>
              Selectionner un Fournisseur
            </MenuItem>
            {Fournisseurs &&
              Fournisseurs.map((fournisseur, i) => (
                <MenuItem
                  key={i + 1}
                  value={fournisseur.idFournisseur}
                  style={{ cursor: "pointer" }}
                >
                  {fournisseur.NomFournisseur}
                </MenuItem>
              ))}
          </ReactHookFormSelect>
          {errors["object"]?.IDFournisseur && (
            <p className={classes.para}>
              {errors["object"]?.IDFournisseur?.message ||
                "You must select a fournisseur"}
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
              {material1 ? "Modifier" : "Ajout"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default AddEditSaisieMaterielModal;
