import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import MUIDataTable from "mui-datatables";
import Switch from "@material-ui/core/Switch";
import { getMateriels } from "../../../../actions/getMaterielsActions";
import AddEditSaisieMaterielModal from "./AddEditSaisieMaterielModal";
import handleClickDelete from "./DeleteMateriel";
import AffecterMaterielModal from "./AffecterMaterielModal";
import { flattenObject } from "../../../../core/ApiCore";
import { Delete } from "../../../../core/util";
import { Box } from "@material-ui/core";

function ListMateriels() {
  const dispatch = useDispatch();
  const [materiel, setMateriel] = useState({});
  const listmateriels1 = useSelector((state) => state.MaterielReducer);
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
    dispatch(getMateriels());
  }, [dispatch]);
  const ActiongetMateriels = () => {
    dispatch(getMateriels());
  };

  const listmateriels = listmateriels1.map((_data) => {
    return flattenObject(_data);
  });

  const buttons = (dataIndex) => {
    return (
      <div className="row">
        <button
          type="button"
          className="btn btn-success btn-sm px-3"
          onClick={() => handleShowEditAddModal(listmateriels1[dataIndex])}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>

        <button
          type="button"
          className="btn btn-danger btn-sm px-3"
          onClick={() =>
            Delete(
              listmateriels1[dataIndex],
              ActiongetMateriels,
              handleClickDelete
            )
          }
        >
          <i className="fas fa-times"></i>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm px-3"
          onClick={() => handleShowAffctMateriel(listmateriels1[dataIndex])}
        >
          <i className="fas fa-link"></i>
        </button>
      </div>
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
        customBodyRender: function an(value) {
          return (
            <Box>{parseInt(value) === 1 ? value + " an" : value + " ans"}</Box>
          );
        },
      },
    },
    {
      label: "Date reception provisoire",
      name: "datereceptionprovisoire",
      options: {
        filter: true,
      },
    },
    {
      label: "Affecter",
      name: "Affecter",
      options: {
        filter: true,
        sort: false,
        customBodyRender: function checked(value) {
          return (
            <Box>
              <Switch checked={value} disableRipple="true" />
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
      label: "idservice",
      name: "idservice",
      options: {
        filter: false,
        display: false,
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
    selectableRows: false,
  };
  return (
    <Layout>
      <button
        className="btn btn-outline-primary my-4"
        onClick={handleShowEditAddModal}
      >
        nouveau Materiel
      </button>{" "}
      ,
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
