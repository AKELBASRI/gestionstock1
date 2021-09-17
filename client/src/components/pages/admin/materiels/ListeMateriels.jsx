import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import MUIDataTable from "mui-datatables";
import Switch from "@material-ui/core/Switch";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AddEditSaisieMaterielModal from "./AddEditSaisieMaterielModal";
import handleClickDelete from "./DeleteMateriel";
import AffecterMaterielModal from "./AffecterMaterielModal";
import { flattenObject } from "../../../../core/ApiCore";
import { Delete } from "../../../../core/util";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
const StyledPaper = withStyles(() => ({
  root: {
    padding: 8,
    // border: "1px solid black",
    marginLeft: "60px",
    boxShadow: "none",
  },
}))(Paper);

import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { ColorButton } from "../../../../core/styleModalForm";
import CreateIcon from "@material-ui/icons/Create";
import LinkIcon from "@material-ui/icons/Link";
import ClearIcon from "@material-ui/icons/Clear";
import {
  FetchMateriels,
  FetchTotalAvailableMateriels,
  FetchTotalMateriels,
} from "../../../../store/actions";
import { createTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function ListMateriels() {
  const [rowsExpanded] = useState();
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
        display: false,
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
        display: false,
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
        display: false,
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
        display: false,
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
        display: false,
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
  const theme = createTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          // Soft hide the button.
          visibility: "hidden",
        },
      },
    },
  });
  const options = {
    pagination: true,
    filter: true,
    filterType: "multiselect",
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    rowsExpanded: rowsExpanded,
    isRowExpandable: (dataIndex) => {
      const garentie = listmateriels[dataIndex][3];
      const agent = listmateriels[dataIndex][16];
      const fournisseur = listmateriels[dataIndex][18];
      const Lieu = listmateriels[dataIndex][20];
      const datereceptionprov = listmateriels[dataIndex][4];
      const agence = listmateriels[dataIndex][15];
      if (
        agent === null &&
        agence === null &&
        fournisseur === null &&
        Lieu === null &&
        datereceptionprov === null &&
        garentie === null
      ) {
        return false;
      }
      return true;
      // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
    },
    onRowExpansionChange: (_, allRowsExpanded) => {
      // setRowsExpanded(allRowsExpanded.slice(-1).map((item) => item.index));
      console.log(allRowsExpanded);
    },
    // onTableChange: (action, tableState) => {
    //   console.log(action);
    //   switch (action) {
    //     case "rowExpansionChange":
    //       console.log(action);
    //       console.dir(tableState);
    //       var rowsExpanded = tableState.expandedRows.data.map(
    //         (item) => item.index
    //       );

    //       if (rowsExpanded.length > 1) {
    //         // limiting would go here
    //         rowsExpanded = rowsExpanded.slice(-1);
    //       }

    //       console.dir(rowsExpanded);

    //       setRowsExpanded(rowsExpanded);

    //       break;
    //   }
    // },
    renderExpandableRow: function displayexpanded(rowData, rowMeta) {
      // const colSpan = rowData.length + 1;

      const garentie = listmateriels[rowMeta.dataIndex][3];
      const agent = listmateriels[rowMeta.dataIndex][16];
      const fournisseur = listmateriels[rowMeta.dataIndex][18];
      const Lieu = listmateriels[rowMeta.dataIndex][20];
      const datereceptionprov = listmateriels[rowMeta.dataIndex][4];
      const agence = listmateriels[rowMeta.dataIndex][15];
      // const colSpan = rowData.length;
      return (
        // <React.Fragment>
        <tr>
          <td colSpan={7}>
            <TableContainer component={StyledPaper}>
              <Table style={{ minWidth: "650" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {garentie && <TableCell>Garentie</TableCell>}
                    {agent && <TableCell align="left">Agent</TableCell>}
                    {fournisseur && (
                      <TableCell align="left">Fournisseur</TableCell>
                    )}
                    {Lieu && <TableCell align="left">Lieu</TableCell>}

                    {datereceptionprov && (
                      <TableCell align="left">
                        Date reception provisoire
                      </TableCell>
                    )}
                    {agence && <TableCell align="left">Agence</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {garentie && (
                      <TableCell component="th" scope="row">
                        {parseInt(garentie) === 1
                          ? garentie + " an"
                          : garentie && parseInt(garentie) === 2
                          ? garentie + " ans"
                          : null}
                      </TableCell>
                    )}

                    {agent && (
                      <TableCell component="th" scope="row">
                        {agent}
                      </TableCell>
                    )}
                    {fournisseur && (
                      <TableCell component="th" scope="row">
                        {fournisseur}
                      </TableCell>
                    )}
                    {Lieu && (
                      <TableCell component="th" scope="row">
                        {Lieu}
                      </TableCell>
                    )}
                    {datereceptionprov && (
                      <TableCell component="th" scope="row">
                        {datereceptionprov}
                      </TableCell>
                    )}
                    {agence && (
                      <TableCell component="th" scope="row">
                        {agence}
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </td>
        </tr>
      );
    },
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
        <MuiThemeProvider theme={theme}>
          <MUIDataTable
            title={"Liste des Materiels"}
            data={listmateriels}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
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
