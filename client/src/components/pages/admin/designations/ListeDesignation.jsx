import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import handleClickDelete from "./DeleteDesignation";

import AddEditDesignationModal from "./AddEditDesignationModal";
import { flattenObject } from "../../../../core/ApiCore";
import { Delete } from "../../../../core/util";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
import { ColorButton } from "../../../../core/styleModalForm";
import { FetchDesignation } from "../../../../store/actions";
function ListeDesignation() {
  const dispatch = useDispatch();
  const listdesignations1 = useSelector((state) => state.requests?.queries?.FETCH_DESIGNATION?.data);
  const handleShowEditAddModal = (designation) => {
    setshowEditAddModal(true);
    setDesignation(designation);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [designation, setDesignation] = useState({});
  useEffect(() => {
    dispatch(FetchDesignation());
  }, [dispatch]);
  const handleClose = () => {
    setshowEditAddModal(false);
  };
  const actiongetDesignation = () => {
    dispatch(FetchDesignation());
  };

  const listdesignation = listdesignations1&&listdesignations1.map((_data) => {
    return flattenObject(_data);
  });
  const classes = useStyles();
  const buttons = (dataIndex) => {
    return (
      <Box className={classes.root}>
        <CreateIcon
          type="button"
          variant="contained"
          color="inherit"
          style={{ cursor: "pointer" }}
          onClick={() => handleShowEditAddModal(listdesignations1[dataIndex])}
        ></CreateIcon>
        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(
              listdesignations1[dataIndex],
              actiongetDesignation,
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
    selectableRows: "none",
  };
  return (
    <div>
      <Layout>
        <ColorButton onClick={handleShowEditAddModal}>
          nouvelle Designation
        </ColorButton>
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
