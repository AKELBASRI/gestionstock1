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
import { FetchService } from "../../../../store/actions";
import { flattenObject } from "../../../../core/ApiCore";

function ListServices() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const dispatch = useDispatch();
  let listservices;
  let listservicesf;
  listservices = useSelector(
    (state) => state.requests?.queries?.FETCH_SERVICE?.data
  );
  const handleShowEditAddModal = (service) => {
    setshowEditAddModal(true);
    setservice(service);
  };
  if (listservices) {
    listservicesf = listservices.map((_data) => {
      return flattenObject(_data);
    });
  }
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [service, setservice] = useState({});
  useEffect(() => {
    // if (!listservices) {
    dispatch(FetchService());
    // }
  }, [dispatch]);
  const handleClose = () => {
    setshowEditAddModal(false);
  };
  const actiongetservices = () => {
    dispatch(FetchService());
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
      label: "hierarchyLevel",
      name: "hierarchyLevel",
      options: {
        filter: true,
      },
    },
    {
      label: "parentId",
      name: "parentId",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      label: "Parentid",
      name: "parent.id",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      label: "Parent",
      name: "parent.service_name",
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

      {listservicesf && (
        <MUIDataTable
          title={"Liste des services"}
          data={listservicesf}
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
