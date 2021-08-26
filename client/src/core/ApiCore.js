import { isAuthenticated } from "../auth/helpers";
import { API_URL } from "../config";
export const getTotalAvailableMaterielByType = () => {
  const { user, token } = isAuthenticated();
  return fetch(
    `${API_URL}/materiels/countMaterielavailablebyType/${user.Mle}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

export const getTotaMaterielByType = () => {
  const { user, token } = isAuthenticated();
  return fetch(`${API_URL}/materiels/countMaterielbyType/${user.Mle}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};

export const getdesignationbytype = (idtype) => {
  try {
    const { user, token } = isAuthenticated();
    return fetch(
      `${API_URL}/designations/getdesignationbytype/${user.Mle}/${idtype}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data)
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
