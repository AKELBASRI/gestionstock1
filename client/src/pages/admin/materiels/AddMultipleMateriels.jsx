import React, { useState, useEffect } from "react";
import BarcodeReader from "react-barcode-reader";
import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";
import NumericInput from "react-numeric-input";
// import FormControl from 'react-bootstrap/lib/FormControl';
import useStateRef from "react-usestateref";

import { isAuthenticated } from "../../../auth/helpers";
import DateFnsUtils from "@date-io/date-fns";
import { getdesignationbytype } from "../../../core/ApiCore";
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
} from "@material-ui/core";
import { useStyles } from "../../../core/styleModalForm";
import { useForm } from "react-hook-form";

import customAxios from "../../../axios/CustomAxios";
import {
  FetchCategory,
  FetchFournisseur,
  FetchLieu,
  FetchMateriels,
  FetchTotalAvailableMateriels,
  FetchTotalMateriels,
} from "../../../store/actions";
import ReactHookFormReactSelect from "../../../core/Components/ReactHookReactSelect";

const AddMultipleMateriels = (Props) => {
  // const [Numeroinventairecodebar, setnuminventaire] = useState("");
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

  const [, setDesignation, Designations] = useStateRef([]);

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
    dispatch(FetchLieu());

    if (!Props.show) {
      reset();
      setDate(null);
    }
  }, [material1, Props.show]);
  const handleQte = (e) => {
    setQte(e);
  };

  const handleChange = () => {
    // const value = e.target.id === "Qte" ? e.target.value - 1 : e.target.value;
    // setMaterial({ ...material.current, [e.target.id]: value });

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

  const optionsCategories =
    categories &&
    categories.map((category) => ({
      value: category.id,
      label: category.type,
    }));
  const optionsFournisseurs =
    Fournisseurs &&
    Fournisseurs.map((fournisseur) => ({
      value: fournisseur.idFournisseur,
      label: fournisseur.NomFournisseur,
    }));

  const optionsDesignation =
    Designations &&
    Designations.current.map((marque) => ({
      value: marque.idDesignation,
      label: marque.designation,
    }));

  const optionsGarentie = [
    {
      label: "1 an",
      value: 1,
    },
    {
      label: "2 ans",
      value: 2,
    },
    {
      label: "3 ans",
      value: 3,
    },
  ];

  const AjoutMateriel = (data) => {
    const marque = Designations?.current.filter(
      (designation) =>
        parseInt(designation?.idDesignation) ===
        parseInt(data.object?.iddesignation)
    )[0].designation;
    for (let i = 0; i < Qte; i++) {
      let num = parseInt(getValues("object.num"));

      let number = i + num;

      const numinventaire = getValues("object.suffix") + number;

      data.object.numeroinventaire = numinventaire;

      delete data.object.num;
      delete data.object.suffix;

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
    AjoutMateriel(data);
  };
  const classes = useStyles();
  const handleScan = (data) => {
    setValue("object.numeroinventaire", data);
    // setnuminventaire(data);
  };
  const handleError = (err) => {
    console.error(err);
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
          Ajout des Materiels
        </DialogTitle>
        <DialogContent className={classes.bg} style={{ height: "651px" }}>
          <BarcodeReader onError={handleError} onScan={handleScan} />
          <DialogContentText className={classes.bg}></DialogContentText>

          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Type
          </InputLabel>
          <ReactHookFormReactSelect
            options={optionsCategories}
            className={classes.SelectSearch}
            id="object.idtype"
            Name="object.idtype"
            control={control}
            reef={register("object.idtype", {
              required: "You must specify a type",
            })}
            onchange={handleChange}
            Value=""
          />

          {errors["object"]?.idtype && (
            <p className={classes.para}>
              {errors["object"]?.idtype?.message ||
                "You must select a category"}
            </p>
          )}

          <label className={classes.label}>Numero premier</label>
          <input
            className={classes.input}
            name="object.num"
            id="object.num"
            type="text"
            {...register("object.num", {
              required: "You must specify a number",
            })}
            // value={Numeroinventairecodebar || ""}
          />
          {errors["object"]?.num && (
            <p className={classes.para}>{errors["object"].num?.message}</p>
          )}
          <label className={classes.label}>Suffix</label>
          <input
            className={classes.input}
            type="text"
            {...register("object.suffix", {
              required: "You must specify a suffix",
            })}
            // value={Numeroinventairecodebar || ""}
          />
          {errors["object"]?.suffix && (
            <p className={classes.para}>{errors["object"].suffix?.message}</p>
          )}

          <label className={classes.label}>Nombres</label>
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

          {Designations.current.length > 0 && (
            <div>
              <label className={classes.label}>Designation</label>
              <ReactHookFormReactSelect
                options={optionsDesignation}
                className={classes.SelectSearch}
                id="object.iddesignation"
                Name="object.iddesignation"
                control={control}
                reef={register("object.iddesignation", {
                  required: "You must specify a Designation",
                })}
                Value=""
              />

              {errors["object"]?.iddesignation && (
                <p className={classes.para}>
                  {errors["object"]?.iddesignation?.message ||
                    "You must select a designation"}
                </p>
              )}
            </div>
          )}

          <label className={classes.label}>Garentie</label>
          <ReactHookFormReactSelect
            Placeholder={"Selectionner une garentie"}
            options={optionsGarentie}
            className={classes.SelectSearch}
            id="object.garentie"
            Name="object.garentie"
            control={control}
            Value=""
            reef={register("object.garentie", {
              required: "Veuillez specifié une garentie ",
            })}
          />

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
          <ReactHookFormReactSelect
            options={optionsFournisseurs}
            className={classes.SelectSearch}
            id="object.IDFournisseur"
            Name="object.IDFournisseur"
            control={control}
            reef={register("object.IDFournisseur", {
              required: "Veuillez entrer un fournisseur",
            })}
            Value=""
          />

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
              Ajout
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default AddMultipleMateriels;
