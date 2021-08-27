import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";

import AddEditServiceModal from "./AddEditServiceModal";
import handleClickDelete from "./DeleteService";
import { Delete } from "../../../../core/util";
import { Box, makeStyles } from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
import { ColorButton } from "../../../../core/styleModalForm";
import Actions from "../../../../store/actions";

function ListServices() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const dispatch = useDispatch();
  const listservices = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE?.data
  );
  const handleShowEditAddModal = (service) => {
    setshowEditAddModal(true);
    setservice(service);
  };
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [service, setservice] = useState({});
  useEffect(() => {
    if (!listservices) {
      dispatch(new Actions().FetchService());
    }
  }, [dispatch]);
  const handleClose = () => {
    setshowEditAddModal(false);
  };
  const actiongetservices = () => {
    dispatch(new Actions().FetchService());
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
            handleShowEditAddModal(listservices[dataIndex]);
          }}
        ></CreateIcon>

        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(
              listservices[dataIndex],
              actiongetservices,
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
      name: "id",
      options: {
        filter: true,
      },
    },
    {
      label: "Libelle",
      name: "service_name",
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
    <Layout>
      <ColorButton onClick={handleShowEditAddModal}>
        nouveau service
      </ColorButton>
      {listservices && (
        <MUIDataTable
          title={"Liste des services"}
          data={listservices}
          columns={columns}
          options={options}
        />
      )}

      <AddEditServiceModal
        CodeSce={service.id}
        show={showEditAddModal}
        handleClose={handleClose}
      />
    </Layout>
  );
}

export default ListServices;
