import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flattenObject } from "../../core/ApiCore";
import {
  FetchTotalAvailableMateriels,
  FetchTotalMateriels,
} from "../../store/actions";

import FeaturedItem from "./FeaturedItem";
function FeaturedInfo() {
  const dispatch = useDispatch();

  const listTotalAvailableByType = useSelector(
    (state) => state.requests?.queries?.FETCH_TOTAL_AVAILABLE_MATERIELS?.data
  );
  const listTotalCountbyType = useSelector(
    (state) => state.requests?.queries?.FETCH_TOTAL_MATERIELS?.data
  );
  useEffect(() => {
    if (!listTotalCountbyType) {
      dispatch(FetchTotalMateriels());
    }
    if (!listTotalAvailableByType) {
      dispatch(FetchTotalAvailableMateriels());
    }
  }, []);

  const listTotalCountbyType1 =
    listTotalCountbyType &&
    listTotalCountbyType.map((_data) => {
      return flattenObject(_data);
    });
  const listTotalAvailableByType1 =
    listTotalAvailableByType &&
    listTotalAvailableByType.map((_data) => {
      return flattenObject(_data);
    });
  const FeaturedItemList = (title, total, color) => {
    return (
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Box my="10px"></Box>
        <Box display="flex">
          {total.length > 0 &&
            total.map((totalmateriel, i) => (
              <FeaturedItem
                totalmateriel={totalmateriel}
                key={i}
                color={color}
              />
            ))}
        </Box>
      </Box>
    );
  };
  return (
    <div>
      {listTotalCountbyType1 &&
        FeaturedItemList("Total", listTotalCountbyType1, "white")}
      <Box my="10px"></Box>
      {listTotalAvailableByType1 &&
        FeaturedItemList("Disponible", listTotalAvailableByType1, "#ceefce")}
    </div>
  );
}

export default FeaturedInfo;
