import React, { useEffect } from "react";
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
import { useStyles } from "../../../../core/styleModalForm";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";

import { API_URL } from "../../../../config";
import { isAuthenticated } from "../../../../auth/helpers";

import ReactHookFormSelect from "../../../../core/Components/ReactHookFormSelect";
import {
  FetchAgencies,
  FetchAgent,
  FetchService,
} from "../../../../store/actions";

function AddEditAgentModal(Props) {
  const { agent_number, show, handleClose } = Props;
  // const [services, setservices] = useState([]);
  // const [agencies, setAgencies] = useState([]);
  const agencies = useSelector(
    (state) => state.requests?.queries?.FETCH_AGENCIES?.data
  );
  const services = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE?.data
  );
  // const [, setIsValid, ref] = useStateRef(true);
  // const [errors, setErrors] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,

    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const usernormal = useSelector((state) =>
    agent_number
      ? state.requests?.queries?.FETCH_AGENTS?.data?.find(
          (p) => p.agent_number === agent_number
        )
      : null
  );
  useEffect(() => {
    if (!services) {
      dispatch(FetchService());
    }
    if (!agencies) {
      dispatch(FetchAgencies());
    }

    if (usernormal) {
      setValue("object", usernormal);
      clearErrors();
    } else {
      reset();
    }
  }, [usernormal]);

  const UpdateUser = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/agents/update/${user.Mle}`, {
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
          toastr.success(
            `L'agent matricule ${data.object.agent_full_name}   est modifié avec succés `,
            "Modification Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();
          dispatch(FetchAgent());
          handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const AddUser = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/agents/create/${user.Mle}`, {
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
          handleClose();

          toastr.success(
            `L'utilisateur matricule ${data.object.agent_number}  est crée avec succés `,
            "Nouveau Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          reset();
          dispatch(FetchAgent());
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
  const classes = useStyles();

  // let { ref1, ...rest1 } = register("object.agency_id");

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title" className={classes.bg}>
          {usernormal
            ? `Modification  de l'agent : ${usernormal.agent_full_name} Matricule : ${usernormal.agent_number}`
            : "Ajout Utilisateur"}
        </DialogTitle>
        <DialogContent className={classes.bg}>
          <DialogContentText className={classes.bg}></DialogContentText>
          <label className={classes.label}>Nom</label>
          <input
            className={classes.input}
            id="object.agent_full_name"
            type="text"
            {...register("object.agent_full_name", {
              required: "You must specify a name",
            })}
          />
          {errors["object"]?.agent_full_name && (
            <p className={classes.para}>
              {errors["object"].agent_full_name?.message}
            </p>
          )}
          <div>
            <label className={classes.label}>Matricule</label>
            <input
              className={classes.input}
              id="object.agent_number"
              type="text"
              {...register("object.agent_number", {
                required: "You must specify Mle",
              })}
            />
            {errors["object"]?.agent_number && (
              <p className={classes.para}>
                {errors["object"]?.agent_number?.message}
              </p>
            )}
            <label className={classes.label}>Email</label>
            <input
              className={classes.input}
              id="object.agent_email"
              type="text"
              {...register("object.agent_email", {
                required: "You must specify Email",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid Email",
                },
              })}
            />
            {errors["object"]?.agent_email && (
              <p className={classes.para}>
                {errors["object"]?.agent_email?.message}
              </p>
            )}

            <InputLabel htmlFor="age-native-simple" className={classes.label}>
              Service
            </InputLabel>
            <ReactHookFormSelect
              className={classes.select}
              label="Selectionner un service"
              id="object.service_id"
              name="object.service_id"
              control={control}
              defaultValue={"0"}
              reef={register("object.service_id", {
                validate: (value) => value !== "0",
              })}
            >
              <MenuItem value="0" style={{ cursor: "pointer" }}>
                Selectionner un service
              </MenuItem>
              {services &&
                services.map((service, i) => (
                  <MenuItem
                    key={i + 1}
                    value={service.id}
                    style={{ cursor: "pointer" }}
                  >
                    {service.service_name}
                  </MenuItem>
                ))}
            </ReactHookFormSelect>
            {errors["object"]?.service_id && (
              <p className={classes.para}>
                {errors["object"]?.service_id?.message ||
                  "You must select a service"}
              </p>
            )}
            <InputLabel htmlFor="age-native-simple" className={classes.label}>
              Agence
            </InputLabel>
            <ReactHookFormSelect
              className={classes.select}
              label="Selectionner un service"
              id="object.agency_id"
              name="object.agency_id"
              control={control}
              defaultValue={"0"}
              reef={register("object.agency_id", {
                validate: (value) => value !== "0",
              })}
            >
              <MenuItem value="0" style={{ cursor: "pointer" }}>
                Selectionner une agence
              </MenuItem>
              {agencies &&
                agencies.map((agency, i) => (
                  <MenuItem
                    key={i + 1}
                    value={agency.id}
                    style={{ cursor: "pointer" }}
                  >
                    {agency.agency_name}
                  </MenuItem>
                ))}
            </ReactHookFormSelect>
            {errors["object"]?.agency_id && (
              <p className={classes.para}>
                {errors["object"]?.agency_id?.message ||
                  "You must select a agence"}
              </p>
            )}
          </div>
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
      {/*

       
            {/* <label className={classes.label}>Mot de passe</label>
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
              )} */}
    </div>
  );
}
export default AddEditAgentModal;
