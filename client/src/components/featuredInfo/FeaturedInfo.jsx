import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  flattenObject,
  getTotaMaterielByType,
  getTotalAvailableMaterielByType,
} from "../../core/ApiCore";
import FeaturedItem from "./FeaturedItem";
function FeaturedInfo() {
  const [listTotalCountbyType, setlistTotalCountbyType] = useState([]);
  const [listTotalAvailableByType, setlistTotalAvailableByType] = useState([]);
  useEffect(() => {
    getTotaMaterielByType()
      .then((res) => setlistTotalCountbyType(res))
      .catch((err) => console.log(err));
    getTotalAvailableMaterielByType()
      .then((res) => setlistTotalAvailableByType(res))
      .catch((err) => console.log(err));
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
