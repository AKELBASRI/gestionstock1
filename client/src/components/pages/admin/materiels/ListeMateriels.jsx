import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import MUIDataTable from "mui-datatables";
import Switch from "@material-ui/core/Switch";

import AddEditSaisieMaterielModal from "./AddEditSaisieMaterielModal";
import handleClickDelete from "./DeleteMateriel";
import AffecterMaterielModal from "./AffecterMaterielModal";
import { flattenObject } from "../../../../core/ApiCore";
import { Delete } from "../../../../core/util";
import { Box, makeStyles } from "@material-ui/core";
import { ColorButton } from "../../../../core/styleModalForm";
import CreateIcon from "@material-ui/icons/Create";
import LinkIcon from "@material-ui/icons/Link";
import ClearIcon from "@material-ui/icons/Clear";
import {
  FetchMateriels,
  FetchTotalAvailableMateriels,
  FetchTotalMateriels,
} from "../../../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function ListMateriels() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [materiel, setMateriel] = useState({});
  const listmateriels1 = useSelector(
    (state) => state.requests?.queries?.FETCH_MATERIELS?.data
  );
  const [showAffctMaterielModal, setshowAffctMaterielModal] = useState(false);
  const [showEditAddModal, setshowEditAddModal] = useState(false);

  const handleShowEditAddModal = (materiel) => {
    // console.log(materiel)
    setshowEditAddModal(true);
    setMateriel(materiel);
  };
  const handleClose = () => {
    setshowEditAddModal(false);
    setshowAffctMaterielModal(false);
    setMateriel({});
  };
  const handleShowAffctMateriel = (materiel) => {
    setshowAffctMaterielModal(true);
    setMateriel(materiel);
  };
  useEffect(() => {
    // if (!listmateriels1) {
    dispatch(FetchMateriels());
    // }
  }, [dispatch]);
  const ActiongetMateriels = () => {
    dispatch(FetchMateriels());
    dispatch(FetchTotalAvailableMateriels());
    dispatch(FetchTotalMateriels());
  };

  const listmateriels =
    listmateriels1 &&
    listmateriels1.map((_data) => {
      return flattenObject(_data);
    });

  const buttons = (dataIndex) => {
    return (
      <Box className={classes.root}>
        <CreateIcon
          type="button"
          variant="contained"
          color="inherit"
          style={{ cursor: "pointer" }}
          onClick={() => handleShowEditAddModal(listmateriels1[dataIndex])}
        ></CreateIcon>

        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(
              listmateriels1[dataIndex],
              ActiongetMateriels,
              handleClickDelete
            )
          }
        ></ClearIcon>

        <LinkIcon
          type="button"
          color="primary"
          onClick={() => handleShowAffctMateriel(listmateriels1[dataIndex])}
          style={{ cursor: "pointer" }}
        ></LinkIcon>
      </Box>
    );
  };
  const columns = [
    {
      label: "id",
      name: "idmateriel",
      options: {
        filter: true,
        display: false,
      },
    },

    {
      label: "iddesignation",
      name: "iddesignation",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      label: "Numero Inventaire",
      name: "numeroinventaire",
      options: {
        filter: true,
      },
    },
    {
      label: "Garentie",
      name: "garentie",
      options: {
        filter: true,
        sort: false,
        print: false,
        customBodyRender: function an(value) {
          return (
            <Box>
              {parseInt(value) === 1
                ? value + " an"
                : value && parseInt(value) === 2
                ? value + " ans"
                : null}
            </Box>
          );
        },
      },
    },
    {
      label: "Date reception provisoire",
      name: "datereceptionprovisoire",
      options: {
        filter: true,
        print: false,
      },
    },
    {
      label: "Affecter",
      name: "Affecter",
      options: {
        filter: true,
        sort: false,
        print: false,
        customBodyRender: function checked(value) {
          return (
            <Box>
              <Switch checked={Boolean(value)} disableRipple />
            </Box>
          );
        },
      },
    },
    {
      label: "idtype",
      name: "idtype",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },

    {
      label: "IDFournisseur",
      name: "IDFournisseur",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      label: "idagence",
      name: "idagence",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      label: "mleagent",
      name: "mleagent",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      label: "idservice",
      name: "idservice",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },

    {
      label: "Disponible",
      name: "disponible",
      options: {
        filter: true,
        sort: true,
        customBodyRender: function checked(value) {
          return (
            <Box>
              <Switch checked={Boolean(value)} disableRipple />
            </Box>
          );
        },
      },
    },
    {
      label: "idlieu",
      name: "idlieu",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      label: "Reforme",
      name: "proposerreforme",
      options: {
        filter: true,
        customBodyRender: function checked(value) {
          return (
            <Box>
              <Switch checked={Boolean(value)} disableRipple />
            </Box>
          );
        },
      },
    },
    {
      label: "service",
      name: "service.service_name",
      options: {
        print: true,
        filter: false,
        display: true,
      },
    },
    {
      label: "agency_id",
      name: "idagence",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      label: "Agent",
      name: "agent.agent_full_name",
      options: {
        filter: true,
      },
    },
    {
      label: "Category",
      name: "typemateriel.type",
      options: {
        filter: true,
      },
    },
    {
      label: "Fournisseur",
      name: "fournisseur.NomFournisseur",
      options: {
        print: false,
        filter: true,
      },
    },
    {
      label: "Designation",
      name: "designation.designation",
      options: {
        filter: true,
      },
    },

    {
      label: "Lieu",
      name: "lieu.lieu",
      options: {
        filter: true,
      },
    },

    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        print: false,
        setCellProps: () => ({ style: { minWidth: "5px", maxWidth: "5px" } }),
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return buttons(dataIndex, rowIndex);
        },
      },
    },
  ];
  const options = {
    pagination: true,
    // filter: true,
    // filterType: 'dropdown',
    responsive: "standard",
    // onRowsDelete: (e) => {
    //   e.data.map((data) => console.log(listmateriels1[data.dataIndex]));
    // },
    selectableRows: "none",
  };
  return (
    <Layout>
      <ColorButton onClick={handleShowEditAddModal}>
        nouveau Materiel
      </ColorButton>
      {listmateriels && (
        <MUIDataTable
          title={"Liste des Materiels"}
          data={listmateriels}
          columns={columns}
          options={options}
        />
      )}
      <AffecterMaterielModal
        codemtrl={materiel.idmateriel}
        show={showAffctMaterielModal}
        handleClose={handleClose}
      />
      <AddEditSaisieMaterielModal
        codemtrl={materiel.idmateriel}
        show={showEditAddModal}
        handleClose={handleClose}
      />
    </Layout>
  );
}

export default ListMateriels;
