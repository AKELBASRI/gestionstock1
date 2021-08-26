import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../../../auth/helpers";
import { API_URL } from "../../../../config";
// import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useStateRef from "react-usestateref";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { getAgencies, getAgents, getservices } from "../../../../core/ApiCore";
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
import ReactHookFormSelect from "../../../../core/Components/ReactHookFormSelect";
import { FetchMateriels } from "../../../../store/actions";
function AffecterMaterielModal(Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    control,
    formState: { errors },
  } = useForm();
  const [ListAgents, setAgents] = useState([]);
  const [ListeService, setService] = useState([]);
  const [Listagencies, setAgencies] = useState([]);
  const material1 = useSelector((state) =>
    Props.codemtrl
      ? state.requests?.queries?.FETCH_MATERIELS?.data.find((p) => p.idmateriel === Props.codemtrl)
      : null
  );
  const [, setaffctMaterial, affctMateriel] = useStateRef({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setaffctMaterial({
      ...affctMateriel.current,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (data) => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/materiels/affecter/${user.Mle}`, {
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
          //props.history.push('/');
          toastr.success(
            `Le Materiel ${affctMateriel.current.marque}  est été modifié avec succés `,
            "Modification Materiel",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setaffctMaterial({});
          dispatch(FetchMateriels());
          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  useEffect(() => {
    getservices()
      .then((res) => setService(res))
      .catch((error) => console.log(error));
    getAgents()
      .then((res) => setAgents(res))
      .catch((error) => console.log(error));
    getAgencies()
      .then((res) => setAgencies(res))
      .catch((error) => console.log(error));
    if (material1) {
      console.log(material1);
      setValue("object", material1);
    } else {
      reset();
    }
  }, [material1, setaffctMaterial]);
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
          Affectation Materiel
        </DialogTitle>
        <DialogContent className={classes.bg}>
          <DialogContentText className={classes.bg}></DialogContentText>

          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Agent
          </InputLabel>
          <ReactHookFormSelect
            onchange={handleChange}
            className={classes.select}
            label="Selectionner une categorie"
            id="object.mleagent"
            name="object.mleagent"
            control={control}
            defaultValue={0}
            reef={register("object.mleagent", {
              validate: (value) => value !== 0,
              required: true,
            })}
          >
            <MenuItem value="0" style={{ cursor: "pointer" }}>
              Selectionner un agent
            </MenuItem>
            {ListAgents &&
              ListAgents.map((agent, i) => (
                <MenuItem
                  key={i + 1}
                  value={agent.agent_number}
                  style={{ cursor: "pointer" }}
                >
                  {agent.agent_full_name}
                </MenuItem>
              ))}
          </ReactHookFormSelect>
          {errors["object"]?.mleagent && (
            <p className={classes.para}>
              {errors["object"]?.mleagent?.message ||
                "You must select an agent"}
            </p>
          )}

          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Service
          </InputLabel>
          <ReactHookFormSelect
            onchange={handleChange}
            className={classes.select}
            label="Selectionner une categorie"
            id="object.idservice"
            name="object.idservice"
            control={control}
            defaultValue={0}
            reef={register("object.idservice", {
              validate: (value) => value !== 0,
              required: true,
            })}
          >
            <MenuItem value="0" style={{ cursor: "pointer" }}>
              Selectionner un service
            </MenuItem>
            {ListeService &&
              ListeService.map((service, i) => (
                <MenuItem
                  key={i + 1}
                  value={service.id}
                  style={{ cursor: "pointer" }}
                >
                  {service.service_name}
                </MenuItem>
              ))}
          </ReactHookFormSelect>
          {errors["object"]?.idservice && (
            <p className={classes.para}>
              {errors["object"]?.idservice?.message ||
                "You must select a service"}
            </p>
          )}

          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Agence
          </InputLabel>
          <ReactHookFormSelect
            onchange={handleChange}
            className={classes.select}
            label="Selectionner une categorie"
            id="object.idagence"
            name="object.idagence"
            control={control}
            defaultValue={0}
            reef={register("object.idagence", {
              validate: (value) => value !== 0,
              required: true,
            })}
          >
            <MenuItem value="0" style={{ cursor: "pointer" }}>
              Selectionner une agence
            </MenuItem>
            {Listagencies &&
              Listagencies.map((agency, i) => (
                <MenuItem
                  key={i + 1}
                  value={agency.id}
                  style={{ cursor: "pointer" }}
                >
                  {agency.agency_name}
                </MenuItem>
              ))}
          </ReactHookFormSelect>
          {errors["object"]?.idagence && (
            <p className={classes.para}>
              {errors["object"]?.idagence?.message ||
                "You must select an agency"}
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
}

export default AffecterMaterielModal;
