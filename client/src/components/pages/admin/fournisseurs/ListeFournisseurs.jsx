import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getFournisseurs } from "../../../../actions/getFournisseur";
import AddEditFournisseurModal from "./AddEditFournisseurModal";
import handleClickDelete from "./DeleteFournisseur";
import { Delete } from "../../../../core/util";
import { Box, makeStyles } from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
import { ColorButton } from "../../../../core/styleModalForm";
function ListeFournisseur() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const dispatch = useDispatch();
  const listFournisseurs = useSelector((state) => state.fournisseurReducer);
  const handleShowEditAddModal = (fournisseur) => {
    setshowEditAddModal(true);
    setFournisseur(fournisseur);
  };
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [fournisseur, setFournisseur] = useState({});
  useEffect(() => {
    dispatch(getFournisseurs());
  }, [dispatch]);
  const handleClose = () => {
    setshowEditAddModal(false);
  };
  const actiongetFournisseurs = () => {
    dispatch(getFournisseurs());
  };
  const classes = useStyles();
  const buttons = (dataIndex) => {
    return (
      <Box className={classes.root}>
        <CreateIcon
          type="button"
          variant="contained"
          color="inherit"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleShowEditAddModal(listFournisseurs[dataIndex]);
          }}
        ></CreateIcon>

        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(
              listFournisseurs[dataIndex],
              actiongetFournisseurs,
              handleClickDelete
            )
          }
        ></ClearIcon>
      </Box>
    );
  };
  const columns = [
    {
      label: "id",
      name: "idFournisseur",
      options: {
        filter: true,
      },
    },
    {
      label: "Nom Fournisseur",
      name: "NomFournisseur",
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
    // pagination:false,
    // filter: true,
    // filterType: 'dropdown',
    responsive: "standard",
    selectableRows: "none",
  };
  return (
    <div>
      <Layout>
        <ColorButton onClick={handleShowEditAddModal}>
          nouveau Fournisseur
        </ColorButton>
        {listFournisseurs && (
          <MUIDataTable
            title={"Liste des Fournisseurs"}
            data={listFournisseurs}
            columns={columns}
            options={options}
          />
        )}

        <AddEditFournisseurModal
          id={fournisseur.idFournisseur}
          show={showEditAddModal}
          handleClose={handleClose}
        />
      </Layout>
    </div>
  );
}

export default ListeFournisseur;
