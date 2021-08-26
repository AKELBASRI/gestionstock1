import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../Layout/Layout";
import MUIDataTable from "mui-datatables";
import ChangePasswordModal from "./ChangePasswordModal";
import AddEditUserModal from "./AddEditUserModal";
import { FetchAdmin } from "../../../../store/actions";
import handleClickDeleteAdmin from "./DeleteAdmin";
import { Delete } from "../../../../core/util";
import CreateIcon from "@material-ui/icons/Create";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ClearIcon from "@material-ui/icons/Clear";
import { Box, makeStyles } from "@material-ui/core";
import { ColorButton } from "../../../../core/styleModalForm";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function ListUsers() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const listusers = useSelector((state) => (state.requests?.queries?.FETCH_ADMINS?.data));
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [showPasswordModal, setshowpasswordmodal] = useState(false);
  const handleShowEditAddModal = (user) => {
    setshowEditAddModal(true);
    setUser(user);
  };
  const handleClose = () => {
    setshowpasswordmodal(false);
    setshowEditAddModal(false);
  };
  const handleShowPassword = (user) => {
    setshowpasswordmodal(true);
    setUser(user);
  };
  useEffect(() => {
    dispatch(FetchAdmin());
  }, [dispatch]);
  const Actiongetusers = () => {
    dispatch(FetchAdmin());
  };

  const buttons = (dataIndex) => {
    return (
      <Box className={classes.root}>
        <CreateIcon
          type="button"
          variant="contained"
          color="inherit"
          style={{ cursor: "pointer" }}
          onClick={() => handleShowEditAddModal(listusers[dataIndex])}
        ></CreateIcon>

        <VpnKeyIcon
          type="button"
          color="primary"
          onClick={() => handleShowPassword(listusers[dataIndex])}
          style={{ cursor: "pointer" }}
        ></VpnKeyIcon>

        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(listusers[dataIndex], Actiongetusers, handleClickDeleteAdmin)
          }
        ></ClearIcon>
      </Box>
    );
  };

  const columns = [
    {
      label: "Nom",
      name: "nom",
      options: {
        filter: true,
      },
    },
    {
      label: "Mle",
      name: "Mle",
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
      <ColorButton onClick={handleShowEditAddModal}>nouveau admin</ColorButton>
      {listusers && (
        <MUIDataTable
          title={"Liste des admins"}
          data={listusers}
          columns={columns}
          options={options}
        />
      )}

      <ChangePasswordModal
        usernormal={user}
        show={showPasswordModal}
        handleClose={handleClose}
      />
      <AddEditUserModal
        Mle={user.Mle}
        show={showEditAddModal}
        handleClose={handleClose}
      />
    </Layout>
  );
}

export default ListUsers;
