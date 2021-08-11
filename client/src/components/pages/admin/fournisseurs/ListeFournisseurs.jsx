import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getFournisseurs } from "../../../../actions/getFournisseur";
import AddEditFournisseurModal from "./AddEditFournisseurModal";
import handleClickDelete from "./DeleteFournisseur";
import { Delete } from "../../../../core/util";
function ListeFournisseur() {
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

  const buttons = (dataIndex, rowIndex) => {
    return (
      <div className="row">
        <button
          type="button"
          className="btn btn-success btn-sm px-3"
          onClick={() => {
            handleShowEditAddModal(listFournisseurs[dataIndex]);
          }}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>

        <button
          type="button"
          className="btn btn-danger btn-sm px-3"
          onClick={() =>
            Delete(
              listFournisseurs[dataIndex],
              actiongetFournisseurs,
              handleClickDelete
            )
          }
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
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
    selectableRows: false,
  };
  return (
    <div>
      <Layout>
        <button
          className="btn btn-outline-primary my-4"
          onClick={handleShowEditAddModal}
        >
          nouveau Fournisseur
        </button>
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
