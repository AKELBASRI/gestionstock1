import React, { useEffect, useState } from "react";
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

import { useStyles } from "../../../core/styleModalForm";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";

import { isAuthenticated } from "../../../auth/helpers";

import ReactHookFormSelect from "../../../core/Components/ReactHookFormSelect";

import customAxios from "../../../axios/CustomAxios";
import {
  FetchAgencies,
  FetchAgent,
  FetchService,
  FetchServiceHiearchy,
} from "../../../store/actions";
// import ReactHookFormReactSelect from "../../../core/Components/ReactHookReactSelect";
import { replaceAll } from "../../../core/util";
import ReactTreeSelect from "../../../core/Components/TreeSelect";

function AddEditAgentModal(Props) {
  const [value, setvalue] = useState(null);
  const { agent_number, show, handleClose } = Props;
  // const [services, setservices] = useState([]);
  // const [agencies, setAgencies] = useState([]);
  const agencies = useSelector(
    (state) => state.requests?.queries?.FETCH_AGENCIES?.data
  );
  const services = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE?.data
  );
  const servicesHiearchy = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE_HIARCHY?.data
  );
  // const [, setIsValid, ref] = useStateRef(true);
  // const [errors, setErrors] = useState({});
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

  const dispatch = useDispatch();
  const usernormal = useSelector((state) =>
    agent_number
      ? state.requests?.queries?.FETCH_AGENTS?.data?.find(
          (p) => p.agent_number === agent_number
        )
      : null
  );

  // const servicesHiearchylabel = [
  //   JSON.parse(
  //     JSON.stringify(
  //       servicesHiearchy[0].replace(/"service_name"|"id"/g, function (matched) {
  //         return mapObj[matched];
  //       })
  //     )
  //   ),
  // ];

  // const servicesHiearchylabel = [
  //   JSON.parse(
  //     JSON.stringify(servicesHiearchy[0]).replace(/"service_name"/g, '"title"')
  //   ),
  // ];

  // const servicesHiearchylabel = [replaceAll(JSON.stringify(servicesHiearchy))];
  const servicesHiearchylabel = replaceAll(servicesHiearchy);
  useEffect(() => {
    console.log(getValues("object.serviceid"));
    dispatch(FetchServiceHiearchy());
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
    if (!show) {
      setvalue("");
    }
  }, [usernormal, show]);

  const UpdateUser = (data) => {
    const { user } = isAuthenticated();
    customAxios
      .put(`/agents/update/${user.Mle}`, JSON.stringify(data.object))

      .then((res) => {
        if (res.error) {
          toastr.warning(
            res.error,
            "S'il vous pla??t Veuillez v??rifier le Formulaire",
            {
              positionClass: "toast-bottom-left",
            }
          );
        } else {
          toastr.success(
            `L'agent matricule ${data.object.agent_full_name}   est modifi?? avec succ??s `,
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
        if (err.response.status >= 400 && err.response.status < 500) {
          toastr.warning(
            err.response.data.error,
            "S'il vous pla??t Veuillez v??rifier le Formulaire",
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
    customAxios
      .post(`/agents/create/${user.Mle}`, JSON.stringify(data.object))

      .then((res) => {
        if (res.error) {
          toastr.warning(
            res.error,
            "S'il vous pla??t Veuillez v??rifier le Formulaire",
            {
              positionClass: "toast-bottom-left",
            }
          );
        } else {
          handleClose();

          toastr.success(
            `L'utilisateur matricule ${data.object.agent_number}  est cr??e avec succ??s `,
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
        if (err.response.status >= 400 && err.response.status < 500) {
          toastr.warning(
            err.response.data.error,
            "S'il vous pla??t Veuillez v??rifier le Formulaire",
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
  const classes = useStyles();

  // let { ref1, ...rest1 } = register("object.agency_id");
  // const optionsservices =
  //   services &&
  //   services.map((service) => ({
  //     value: service.id,
  //     label: service.service_name,
  //   }));
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
        <DialogContent className={classes.bg} style={{ height: "601px" }}>
          <DialogContentText className={classes.bg}></DialogContentText>
          <div>
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
            {!usernormal && (
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
              </div>
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
            {/* <ReactHookFormReactSelect
              options={optionsservices}
              className={classes.SelectSearch}
              id="object.service_id"
              Name="object.service_id"
              Value={""}
              control={control}
              reef={register("object.service_id", { required: true })}
            /> */}

            <ReactTreeSelect
              className={classes.SelectSearch}
              control={control}
              id="object.service_id"
              Name="object.service_id"
              data={servicesHiearchylabel}
              onchange={(value) => {
                setvalue(value);
                setValue("object.service_id", value);
              }}
              Value={getValues("object.service_id") || value || null}
              reef={register("object.service_id", {
                required: "You must select a service",
              })}
            />
            {errors["object"]?.service_id && (
              <p className={classes.para}>
                {errors["object"]?.service_id?.message}
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
