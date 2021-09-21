import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Layout from "../../Layout/Layout";
import CreateIcon from "@material-ui/icons/Create";

import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";

// import AddEditCategoryModal from "./AddEditCategoryModal";
import { Delete } from "../../../core/util";
import { Box, makeStyles } from "@material-ui/core";
import { ColorButton } from "../../../core/styleModalForm";
import { FetchLieu } from "../../../store/actions";
import AddEditLieuxModal from "./AddEditLieuxModal";
import handleClickDelete from "./DeleteLieux";

function ListeLieux() {
  const dispatch = useDispatch();
  const ListeLieux = useSelector(
    (state) => state.requests?.queries?.FETCH_LIEUX?.data
  );
  const handleShowEditAddModal = (lieu) => {
    setshowEditAddModal(true);
    setLieu(lieu);
  };
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [lieu, setLieu] = useState({});
  useEffect(() => {
    // if (!listcategories) {
    dispatch(FetchLieu());
    // }
  }, [dispatch]);
  const handleClose = () => {
    setshowEditAddModal(false);
  };
  const actiongetLieux = () => {
    dispatch(FetchLieu());
  };
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
          onClick={() => handleShowEditAddModal(ListeLieux[dataIndex])}
        ></CreateIcon>

        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(ListeLieux[dataIndex], actiongetLieux, handleClickDelete)
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
      label: "Lieu",
      name: "lieu",
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
        <ColorButton onClick={handleShowEditAddModal}>nouveau lieu</ColorButton>
        {ListeLieux && (
          <MUIDataTable
            title={"Liste des Lieux"}
            data={ListeLieux}
            columns={columns}
            options={options}
          />
        )}

        <AddEditLieuxModal
          id={lieu.id}
          show={showEditAddModal}
          handleClose={handleClose}
        />
      </Layout>
    </div>
  );
}

export default ListeLieux;
