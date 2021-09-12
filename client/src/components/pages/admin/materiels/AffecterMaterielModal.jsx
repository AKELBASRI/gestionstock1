import React, { useEffect } from "react";
import { isAuthenticated } from "../../../../auth/helpers";
import { useDispatch, useSelector } from "react-redux";
import useStateRef from "react-usestateref";
import toastr from "toastr";
import "toastr/build/toastr.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
} from "@material-ui/core";
import { useStyles } from "../../../../core/styleModalForm";
import { useForm } from "react-hook-form";
// import ReactHookFormSelect from "../../../../core/Components/ReactHookReactSelect";
import customAxios from "../../../../axios/CustomAxios";
import { getdesignationbytype } from "../../../../core/ApiCore";
import {
  FetchAgencies,
  FetchAgent,
  FetchMateriels,
  FetchService,
  FetchTotalAvailableMateriels,
  FetchTotalMateriels,
} from "../../../../store/actions";
import ReactHookFormReactSelect from "../../../../core/Components/ReactHookReactSelect";

function AffecterMaterielModal(Props) {
  const [, setDesignation, Designations] = useStateRef([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const ListAgents = useSelector(
    (state) => state.requests?.queries?.FETCH_AGENTS?.data
  );
  const ListeService = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE?.data
  );
  const Listagencies = useSelector(
    (state) => state.requests?.queries?.FETCH_AGENCIES?.data
  );
  const material1 = useSelector((state) =>
    Props.codemtrl
      ? state.requests?.queries?.FETCH_MATERIELS?.data.find(
          (p) => p.idmateriel === Props.codemtrl
        )
      : null
  );
  // const [, setaffctMaterial] = useStateRef({});
  const dispatch = useDispatch();
  // const handleChange = (e) => {
  //   setaffctMaterial({
  //     ...affctMateriel.current,
  //     [e.target.id]: e.target.value,
  //   });
  // };
  const LoadDesignations = async (material) => {
    if (material !== undefined) {
      getdesignationbytype(material.idtype)
        .then((res) => {
          setDesignation(res.designation);
        })
        .catch((err) => console.log(err));
    }
  };
  const onSubmit = (data) => {
    const { user } = isAuthenticated();
    const marque = Designations.current.filter(
      (designation) =>
        parseInt(designation?.idDesignation) ===
        parseInt(data.object?.iddesignation)
    )[0].designation;
    customAxios
      .put(`/materiels/affecter/${user.Mle}`, JSON.stringify(data.object))
      .then((res) => {
        if (res.error) {
          toastr.warning(
            res.error,
            "S'il vous plaît Veuillez vérifier le Formulaire",
            { positionClass: "toast-bottom-left" }
          );
        } else {
          toastr.success(
            `Le Materiel ${marque} est affecté avec succés `,
            "Modification Materiel",
            { positionClass: "toast-bottom-left" }
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
            { positionClass: "toast-bottom-left" }
          );
        } else {
          toastr.error(err.response.data.error, "Erreur du serveur", {
            positionClass: "toast-bottom-left",
          });
        }
      });
  };
  useEffect(() => {
    if (!ListeService) {
      dispatch(FetchService());
    }
    if (!ListAgents) {
      dispatch(FetchAgent());
    }
    if (!Listagencies) {
      dispatch(FetchAgencies());
    }
    if (material1) {
      console.log(material1);
      setValue("object", material1);
      LoadDesignations(material1);
    } else {
      reset();
    }
  }, [material1]);
  const classes = useStyles();
  const optionsservices =
    ListeService &&
    ListeService.map((service) => ({
      value: service.id,
      label: service.service_name,
    }));
  const optionagent =
    ListAgents &&
    ListAgents.map((agent) => ({
      value: agent.agent_number,
      label: agent.agent_full_name,
    }));
  const optionagency =
    Listagencies &&
    Listagencies.map((agency) => ({
      value: agency.id,
      label: agency.agency_name,
    }));
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
        <DialogContent className={classes.bg} style={{ height: "480px" }}>
          <DialogContentText className={classes.bg}></DialogContentText>
          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Agent
          </InputLabel>
          <ReactHookFormReactSelect
            options={optionagent}
            className={classes.SelectSearch}
            id="object.mleagent"
            Name="object.mleagent"
            control={control}
            reef={register("object.mleagent", { required: true })}
          />
          {errors["object"]?.mleagent && (
            <p className={classes.para}>
              {errors["object"]?.mleagent?.message ||
                "You must select an agent"}
            </p>
          )}
          {/* <ReactHookFormSelect
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
          )} */}
          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Service
          </InputLabel>
          <ReactHookFormReactSelect
            options={optionsservices}
            className={classes.SelectSearch}
            id="object.idservice"
            Name="object.idservice"
            control={control}
            reef={register("object.idservice")}
          />
          {/* {errors["object"]?.idservice && (
            <p className={classes.para}>
              {errors["object"]?.idservice?.message ||
                "You must select a service"}
            </p> 
          )}*/}
          <InputLabel htmlFor="age-native-simple" className={classes.label}>
            Agence
          </InputLabel>
          <ReactHookFormReactSelect
            options={optionagency}
            className={classes.SelectSearch}
            id="object.idagence"
            Name="object.idagence"
            control={control}
            reef={register("object.idagence", { required: true })}
          />
          {errors["object"]?.idservice && (
            <p className={classes.para}>
              {errors["object"]?.idservice?.message ||
                "You must select an agency"}
            </p>
          )}
          {/* <ReactHookFormSelect
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
          )} */}
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
              Affecter
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default AffecterMaterielModal;
