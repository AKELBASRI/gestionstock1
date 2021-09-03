import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Layout from "../../Layout/Layout";
import CreateIcon from "@material-ui/icons/Create";

import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@material-ui/core/Switch";
import handleClickDelete from "./DeleteCategory";
import AddEditCategoryModal from "./AddEditCategoryModal";
import { Delete } from "../../../../core/util";
import { Box, makeStyles } from "@material-ui/core";
import { ColorButton } from "../../../../core/styleModalForm";
import { FetchCategory } from "../../../../store/actions";

function ListeCategories() {
  const dispatch = useDispatch();
  const listcategories = useSelector(
    (state) => state.requests?.queries?.FETCH_CATEGORY?.data
  );
  const handleShowEditAddModal = (category) => {
    setshowEditAddModal(true);
    setcategory(category);
  };
  const [showEditAddModal, setshowEditAddModal] = useState(false);
  const [category, setcategory] = useState({});
  useEffect(() => {
    if (!listcategories) {
      dispatch(FetchCategory());
    }
  }, [dispatch]);
  const handleClose = () => {
    setshowEditAddModal(false);
  };
  const actiongetcategories = () => {
    dispatch(FetchCategory());
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
          onClick={() => handleShowEditAddModal(listcategories[dataIndex])}
        ></CreateIcon>

        <ClearIcon
          type="button"
          color="error"
          style={{ cursor: "pointer" }}
          onClick={() =>
            Delete(
              listcategories[dataIndex],
              actiongetcategories,
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
      label: "name",
      name: "type",
      options: {
        filter: true,
      },
    },

    {
      name: "inventoryornot",
      options: {
        filter: true,
        sort: false,
        customBodyRender: function checked(value) {
          return (
            <Box>
              <Switch checked={value} disableRipple />
            </Box>
          );
        },
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
          nouvelle Categorie
        </ColorButton>
        {listcategories && (
          <MUIDataTable
            title={"Liste des categories"}
            data={listcategories}
            columns={columns}
            options={options}
          />
        )}

        <AddEditCategoryModal
          CodeSce={category.id}
          show={showEditAddModal}
          handleClose={handleClose}
        />
      </Layout>
    </div>
  );
}

export default ListeCategories;
