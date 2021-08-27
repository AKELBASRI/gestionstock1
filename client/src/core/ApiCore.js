import { isAuthenticated } from "../auth/helpers";
import axios from "../../src/axios/CustomAxios";

export const getdesignationbytype = (idtype) => {
  try {
    const { user } = isAuthenticated();

    return axios
      .get(`/designations/getdesignationbytype/${user.Mle}/${idtype}`)

      .then((data) => data.data)
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const flattenObject = function (ob) {
  return Object.keys(ob).reduce(function (toReturn, k) {
    if (Object.prototype.toString.call(ob[k]) === "[object Date]") {
      toReturn[k] = ob[k].toString();
    } else if (typeof ob[k] === "object" && ob[k]) {
      var flatObject = flattenObject(ob[k]);
      Object.keys(flatObject).forEach(function (k2) {
        toReturn[k + "." + k2] = flatObject[k2];
      });
    } else {
      toReturn[k] = ob[k];
    }

    return Object.keys(toReturn).map(function (_) {
      return toReturn[_];
    });
  }, {});
};
