import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import handleClickDelete from "./DeleteDesignation";
import { getDesignation } from "../../../../actions/getDesignationAction";
import AddEditDesignationModal from "./AddEditDesignationModal";
import { flattenObject } from "../../../../core/ApiCore";
import { Delete } from "../../../../core/util";

function ListeDesignation() {
  const dispatch = useDispatch();
  const listdesignations1 = useSelector((state) => state.designationReducer);
  const handleShowEditAddModal = (designation) => {
    setshowEditAddModal(true);
    setDesignation(designation);
  };
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [designation, setDesignation] = useState({});
  useEffect(() => {
    dispatch(getDesignation());
  }, [dispatch]);
  const handleClose = () => {
    setshowEditAddModal(false);
  };
  const actiongetDesignation = () => {
    dispatch(getDesignation());
  };

  const listdesignation = listdesignations1.map((_data) => {
    return flattenObject(_data);
  });

  const buttons = (dataIndex) => {
    return (
      <div className="row">
        <button
          type="button"
          className="btn btn-success btn-sm px-3"
          onClick={() => handleShowEditAddModal(listdesignations1[dataIndex])}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>

        <button
          type="button"
          className="btn btn-danger btn-sm px-3"
          onClick={() =>
            Delete(
              listdesignations1[dataIndex],
              actiongetDesignation,
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
      name: "idDesignation",
      options: {
        filter: false,
      },
    },
    {
      label: "Designation",
      name: "designation",
      options: {
        filter: true,
      },
    },
    {
      label: "idtype",
      name: "idtype",
      options: {
        filter: false,
        display: false,
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
          nouvelle Designation{" "}
        </button>
        {listdesignation && (
          <MUIDataTable
            title={"Liste des Designations"}
            data={listdesignation}
            columns={columns}
            options={options}
          />
        )}

        <AddEditDesignationModal
          iddesignation={designation.idDesignation}
          show={showEditAddModal}
          handleClose={handleClose}
        />
      </Layout>
    </div>
  );
}

export default ListeDesignation;
