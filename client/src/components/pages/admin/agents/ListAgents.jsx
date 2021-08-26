import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import MUIDataTable from "mui-datatables";
import CreateIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
// import handleClickDelete from './DeleteAdmin';

import AddEditAgentModal from "./AddEditAgentModal";
import handleClickDelete from "./DeleteAgent";
import { flattenObject } from "../../../../core/ApiCore";
import { FetchAgent } from "../../../../store/actions";
import { Delete } from "../../../../core/util";
import { ColorButton } from "../../../../core/styleModalForm";
import { Box, makeStyles } from "@material-ui/core";
function ListAgents() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  let listagents;
  let listagentsf;
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  listagents = useSelector(
    (state) => state.requests?.queries?.FETCH_AGENTS?.data
  );
  const handleShowEditAddModal = (user) => {
    setshowEditAddModal(true);
    setUser(user);
  };
  const handleClose = () => {
    setshowEditAddModal(false);
  };

  useEffect(() => {
    if (!listagents) {
      dispatch(FetchAgent());
    }
  }, [dispatch]);
  const Actiongetagents = () => {
    dispatch(FetchAgent());
  };
  if (listagents) {
    listagentsf = listagents.map((_data) => {
      return flattenObject(_data);
    });
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  const buttons = (dataIndex) => {
    return (
      <Box className={classes.root}>
        <CreateIcon
          type="button"
          variant="contained"
          color="inherit"
          style={{ cursor: "pointer" }}
          onClick={() => handleShowEditAddModal(listagents[dataIndex])}
        ></CreateIcon>

        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(listagents[dataIndex], Actiongetagents, handleClickDelete)
          }
        ></ClearIcon>
      </Box>
    );
  };
  const columns = [
    {
      label: "Mle",
      name: "agent_number",
      options: {
        filter: true,
      },
    },

    {
      label: "Nom",
      name: "agent_full_name",
      options: {
        filter: true,
      },
    },
    {
      label: "Email",
      name: "agent_email",
      options: {
        filter: true,
      },
    },
    {
      label: "Service",
      name: "service_id",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      label: "Agence",
      name: "agency_id",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      label: "Service",
      name: "service.service_name",
      options: {
        filter: true,
      },
    },
    {
      label: "agence",
      name: "agency.agency_name",
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
    selectableRows: "none",
  };
  return (
    <Layout>
      <ColorButton onClick={handleShowEditAddModal}>nouveau agent</ColorButton>
      {listagentsf && (
        <MUIDataTable
          title={"Liste des agents"}
          data={listagentsf}
          columns={columns}
          options={options}
        />
      )}
      <AddEditAgentModal
        agent_number={user.agent_number}
        show={showEditAddModal}
        handleClose={handleClose}
      />
    </Layout>
  );
}

export default ListAgents;
