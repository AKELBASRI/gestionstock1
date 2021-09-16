import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { flattenObject } from "../../core/ApiCore";
import ReactHookFormReactSelect from "../../core/Components/ReactHookReactSelect";
import {
  FetchCategory,
  FetchTotalAvailableMateriels,
  FetchTotalMateriels,
} from "../../store/actions";
import { useStyles } from "../../core/styleModalForm";
import FeaturedItem from "./FeaturedItem";
function FeaturedInfo() {
  const classes = useStyles();
  const {
    register,

    control,
  } = useForm();

  const dispatch = useDispatch();

  const listTotalAvailableByType = useSelector(
    (state) => state.requests?.queries?.FETCH_TOTAL_AVAILABLE_MATERIELS?.data
  );
  const listTotalCountbyType = useSelector(
    (state) => state.requests?.queries?.FETCH_TOTAL_MATERIELS?.data
  );
  const listcategories = useSelector(
    (state) => state.requests?.queries?.FETCH_CATEGORY?.data
  );
  const [cat, setcat] = useState(listcategories && listcategories[2]);
  useEffect(() => {
    dispatch(FetchCategory());
    dispatch(FetchTotalMateriels());
    dispatch(FetchTotalAvailableMateriels());
  }, []);

  const listTotalCountbyType1 =
    listTotalCountbyType &&
    listTotalCountbyType
      .filter((item) => item.idtype == cat.id)
      .map((_data) => {
        return flattenObject(_data);
      });
  const listTotalAvailableByType1 =
    listTotalAvailableByType &&
    listTotalAvailableByType
      .filter((item) => item.idtype == cat.id)
      .map((_data) => {
        return flattenObject(_data);
      });
  const optionscategories =
    listcategories &&
    listcategories.map((category) => ({
      value: category.id,
      label: category.type,
    }));
  const FeaturedItemList = (title, total, color) => {
    return (
      <div>
        <Box my="10px"></Box>
        {total.length > 0 && (
          <>
            <Typography variant="h5">{title}</Typography> <Box my="10px"></Box>
            <Grid container>
              {total.map((totalmateriel, i) => (
                <FeaturedItem
                  totalmateriel={totalmateriel}
                  key={i}
                  color={color}
                />
              ))}
            </Grid>
          </>
        )}
      </div>
    );
  };
  return (
    <Grid>
      <Typography variant="h5">{"Veuillez Choisir une Categorie"}</Typography>
      <Box my="16px"></Box>
      <ReactHookFormReactSelect
        options={optionscategories}
        className={classes.SelectSearch}
        id="object.service_id"
        Name="object.service_id"
        control={control}
        reef={register("object.service_id", { required: true })}
        onchange={(e) => {
          setcat({ id: e.value, type: e.label });
        }}
        Value={cat}
      />

      {listTotalAvailableByType1 &&
        FeaturedItemList("Disponible", listTotalAvailableByType1, "#ceefce")}
      {listTotalCountbyType1 &&
        FeaturedItemList("Total", listTotalCountbyType1, "white")}
      <Box my="10px"></Box>
    </Grid>
  );
}

export default FeaturedInfo;
