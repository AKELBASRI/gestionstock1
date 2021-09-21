import React, { useEffect, useState } from "react";
import { Box, Grid, InputLabel, Typography } from "@material-ui/core";
import {
  ButtonDanger,
  ColorButton,
  useStyles,
} from "../../../core/styleModalForm";
import { useForm } from "react-hook-form";
import ReactHookFormReactSelect from "../../../core/Components/ReactHookReactSelect";
import { useDispatch, useSelector } from "react-redux";
import BarcodeReader from "react-barcode-reader";
import toastr from "toastr";
import {
  FetchAgencies,
  FetchAgent,
  FetchMateriels,
  FetchService,
  FetchServiceHiearchy,
  Fetch_table_exist,
} from "../../../store/actions";
import Layout from "../../Layout/Layout";
import customAxios from "../../../axios/CustomAxios";
import { isAuthenticated } from "../../../auth/helpers";
import AddEditSaisieMaterielModal from "../materiels/AddEditSaisieMaterielModal";
import ReactHookFormSwitch from "../../../core/Components/ReactHookFormSwitch";
import reactUsestateref from "react-usestateref";
import AreYouSure from "./AreYouSure";
import Popupend from "./popupendofinventory";
import ReactTreeSelect from "../../../core/Components/TreeSelect";
import { replaceAll } from "../../../core/util";

// import Switch from "@material-ui/core/Switch";
// import ReactHookTextField from "../../../../core/Components/ReactHookTextField";

function Affectation() {
  const dispatch = useDispatch();
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [showendpopup, setshowpopup] = useState(false);
  // const [Numeroinventairecodebar, setobject] = useState({});
  const [showAreYouSure, setshowAreYouSure] = useState(false);
  const [, setmaterielselect, materielselect] = reactUsestateref({});
  const ListAgents = useSelector(
    (state) => state.requests?.queries?.FETCH_AGENTS?.data
  );
  const ListeService = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE?.data
  );
  const ListeLieux = useSelector(
    (state) => state.requests?.queries?.FETCH_LIEUX?.data
  );
  const Listagencies = useSelector(
    (state) => state.requests?.queries?.FETCH_AGENCIES?.data
  );
  const listmateriels1 = useSelector(
    (state) => state.requests?.queries?.FETCH_MATERIELS?.data
  );
  const tableexist = useSelector(
    (state) => state.requests?.queries?.FETCH_TABLE_EXIST?.data
  );
  const servicesHiearchy = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE_HIARCHY?.data
  );
  const [value, setvalue] = useState(null);
  // const optionsservices =
  //   ListeService &&
  //   ListeService.map((service) => ({
  //     value: service.id,
  //     label: service.service_name,
  //   }));
  const optionagent =
    ListAgents &&
    ListAgents.map((agent) => ({
      value: agent.agent_number,
      label: agent.agent_full_name,
    }));
  const optionsLienx =
    ListeLieux &&
    ListeLieux.map((lieu) => ({
      value: lieu.id,
      label: lieu.lieu,
    }));
  const optionagency =
    Listagencies &&
    Listagencies.map((agency) => ({
      value: agency.id,
      label: agency.agency_name,
    }));
  const optionmateriels =
    listmateriels1 &&
    listmateriels1.map((agency) => ({
      value: agency.numeroinventaire,
      label: agency.numeroinventaire,
    }));
  const classes = useStyles();
  const currentDate = new Date();
  const {
    register,
    handleSubmit,
    control,
    reset,
    // watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const handleShowEditAddModal = () => {
    // console.log(materiel)
    setshowEditAddModal(true);
  };
  const handleClose = () => {
    setshowEditAddModal(false);
    setshowAreYouSure(false);
  };
  const handleScan = (data) => {
    getmaterielchoosed({ value: data });

    for (const property in materielselect.current[0]) {
      if (materielselect.current[0][property] !== null) {
        console.log(`object.${property}`, materielselect?.current[0][property]);
        setValue(`object.${property}`, materielselect?.current[0][property]);
      } else {
        setValue(`object.${property}`, "");
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const servicesHiearchylabel = replaceAll(servicesHiearchy);
  useEffect(() => {
    dispatch(FetchServiceHiearchy());
    dispatch(Fetch_table_exist());
    console.log(tableexist);
    if (tableexist !== "") {
      setshowpopup(true);
    }
    // handleScan();
    dispatch(FetchMateriels());
    if (!ListeService) {
      dispatch(FetchService());
    }
    if (!ListAgents) {
      dispatch(FetchAgent());
    }
    if (!Listagencies) {
      dispatch(FetchAgencies());
    }
  }, [dispatch]);
  const onSubmit = (data) => {
    const { user } = isAuthenticated();
    customAxios
      .put(
        `/materiels/AffecterMaterielbynumberofinventory/${user.Mle}`,
        JSON.stringify(data.object)
      )
      .then(() => {
        toastr.success(
          `Le Materiel numero ${data.object.numeroinventaire} est affecté avec succés `,
          "Affectation Materiel",
          { positionClass: "toast-bottom-left" }
        );
        dispatch(FetchMateriels());
        reset();
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
  const getmaterielchoosed = (data) => {
    setmaterielselect(
      listmateriels1.filter((materiel) => {
        return materiel.numeroinventaire === data?.value;
      })
    );
  };
  const handleChange = (data) => {
    getmaterielchoosed(data);

    // if (materielselect?.current[0] !== null) {
    //   console.log(materielselect?.current[0]);
    //   setValue("object", materielselect?.current[0]);
    // }
    for (const property in materielselect.current[0]) {
      if (materielselect.current[0][property] !== null) {
        console.log(`object.${property}`, materielselect?.current[0][property]);
        setValue(`object.${property}`, materielselect?.current[0][property]);
      } else {
        setValue(`object.${property}`, "");
      }
    }
  };
  return (
    <Layout>
      <BarcodeReader onError={handleError} onScan={handleScan} />

      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Typography variant="h4">
          Inventaire {currentDate.getFullYear()}
        </Typography>
        <Box my="30px" />

        <Box display="flex" justifyContent="center">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            width="96%"
          >
            <Box display="flex" alignItems="center" flexGrow="1" flex="60%">
              {/* <Box > */}
              <InputLabel
                htmlFor="age-native-simple"
                className={classes.label1}
              >
                N° Invt
              </InputLabel>
              <Box flexGrow="1">
                <ReactHookFormReactSelect
                  options={optionmateriels}
                  className={classes.SelectSearch}
                  id="object.numeroinventaire"
                  Name="object.numeroinventaire"
                  control={control}
                  onchange={handleChange}
                  Value=""
                  reef={register("object.numeroinventaire", {
                    required: true,
                  })}
                />

                {errors["object"]?.numeroinventaire && (
                  <p className={classes.para}>
                    {errors["object"]?.numeroinventaire?.message ||
                      "You must enter number of inventory"}
                  </p>
                )}
              </Box>
            </Box>

            <Box display="flex" alignItems="center" flexGrow="1" flex="50%">
              <InputLabel
                htmlFor="age-native-simple"
                className={classes.label1}
              >
                Agent
              </InputLabel>

              <Box flexGrow="3">
                <ReactHookFormReactSelect
                  options={optionagent}
                  className={classes.SelectSearch}
                  id="object.mleagent"
                  Name="object.mleagent"
                  control={control}
                  Value=""
                  reef={register("object.mleagent", { required: true })}
                />

                {errors["object"]?.mleagent && (
                  <p className={classes.para}>
                    {errors["object"]?.mleagent?.message ||
                      "You must select an agent"}
                  </p>
                )}
              </Box>
            </Box>

            <Box display="flex" alignItems="center" flexGrow="1" flex="50%">
              <Box>
                <InputLabel
                  htmlFor="age-native-simple"
                  className={classes.label1}
                >
                  Service
                </InputLabel>
              </Box>
              <Box flexGrow="1">
                {/* <ReactHookFormReactSelect
                  options={optionsservices}
                  className={classes.SelectSearch}
                  id="object.idservice"
                  Name="object.idservice"
                  control={control}
                  reef={register("object.idservice", { required: true })}
                  Value=""
                /> */}
                <ReactTreeSelect
                  className={classes.SelectSearch}
                  control={control}
                  id="object.idservice"
                  Name="object.idservice"
                  data={servicesHiearchylabel}
                  onchange={(value) => {
                    setvalue(value);
                    setValue("object.idservice", value);
                  }}
                  Value={getValues("object.idservice") || value || null}
                  reef={register("object.idservice", {
                    required: "You must select a service",
                  })}
                />
                {errors["object"]?.idservice && (
                  <p className={classes.para}>
                    {errors["object"]?.idservice?.message ||
                      "You must select an service"}
                  </p>
                )}
              </Box>
            </Box>

            <Box display="flex" alignItems="center" flexGrow="1" flex="50%">
              <Box>
                <InputLabel
                  htmlFor="age-native-simple"
                  className={classes.label1}
                >
                  Agence
                </InputLabel>
              </Box>
              <Box flexGrow="1">
                <ReactHookFormReactSelect
                  options={optionagency}
                  className={classes.SelectSearch}
                  id="object.idagence"
                  Name="object.idagence"
                  control={control}
                  reef={register("object.idagence", { required: true })}
                  Value=""
                />

                {errors["object"]?.idagence && (
                  <p className={classes.para}>
                    {errors["object"]?.idagence?.message ||
                      "You must select an agency"}
                  </p>
                )}
              </Box>
            </Box>

            <Box display="flex" alignItems="center" flexGrow="2" flex="50%">
              <InputLabel
                htmlFor="age-native-simple"
                className={classes.label1}
              >
                Lieux
              </InputLabel>
              <Box flexGrow="1">
                <ReactHookFormReactSelect
                  options={optionsLienx}
                  className={classes.SelectSearch}
                  id="object.idlieu"
                  Name="object.idlieu"
                  control={control}
                  reef={register("object.idlieu", { required: true })}
                  Value=""
                />

                {errors["object"]?.idagence && (
                  <p className={classes.para}>
                    {errors["object"]?.idagence?.message ||
                      "You must select a place"}
                  </p>
                )}
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" flexGrow="1" flex="60%">
              <Box>
                <InputLabel
                  htmlFor="age-native-simple"
                  className={classes.label1}
                >
                  Disponible
                </InputLabel>
              </Box>
              <Box>
                <ReactHookFormSwitch
                  name="object.disponible"
                  id="object.disponible"
                  control={control}
                  reef={register("object.disponible", {})}
                ></ReactHookFormSwitch>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" flexGrow="1" flex="40%">
              <Box>
                <InputLabel
                  htmlFor="age-native-simple"
                  className={classes.label1}
                >
                  Proposer Reforme
                </InputLabel>
              </Box>
              <Box>
                <ReactHookFormSwitch
                  name="object.proposerreforme"
                  id="object.proposerreforme"
                  control={control}
                  reef={register("object.proposerreforme", {})}
                ></ReactHookFormSwitch>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* {materielselect[0] && (
          <div>
            <InputLabel htmlFor="age-native-simple" className={classes.label1}>
              Agent : {materielselect[0]?.agent?.agent_full_name}
            </InputLabel>
            <InputLabel htmlFor="age-native-simple" className={classes.label1}>
              Service : {materielselect[0]?.service?.service_name}
            </InputLabel>
            <InputLabel htmlFor="age-native-simple" className={classes.label1}>
              Agence : {materielselect[0]?.agency?.agency_name}
            </InputLabel>
            <InputLabel htmlFor="age-native-simple" className={classes.label1}>
              Lieu : {materielselect[0]?.lieu?.lieu}
            </InputLabel>
            <InputLabel htmlFor="age-native-simple" className={classes.label1}>
              Disponible :{materielselect[0]?.disponible}
              <Switch checked={materielselect[0]?.disponible} disableRipple /> 
            </InputLabel>
          </div>
        )} */}
        <Box my="40px" />
        <Box mx="15px">
          <Grid container spacing={3}>
            <Grid item>
              <ColorButton type="submit">Affecter</ColorButton>
            </Grid>
            <Grid item>
              <ColorButton
                type="button"
                onClick={() => handleShowEditAddModal()}
              >
                Ajout Materiel
              </ColorButton>
            </Grid>
            <Grid item>
              <ButtonDanger
                type="button"
                onClick={() => setshowAreYouSure(true)}
              >
                Fin Inventaire ?
              </ButtonDanger>
            </Grid>
          </Grid>
        </Box>
      </form>
      <AreYouSure
        show={showAreYouSure}
        handleClose={handleClose}
        showpopup={(popup) => setshowpopup(popup)}
      />
      <Popupend show={showendpopup} />
      <AddEditSaisieMaterielModal
        show={showEditAddModal}
        handleClose={handleClose}
      />
    </Layout>
  );
}

export default Affectation;
