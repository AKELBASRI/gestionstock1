import { isAuthenticated } from "../auth/helpers";
import {
  FETCH_ADMINS,
  FETCH_AGENTS,
  SHOW_HIDE,
  FETCH_CATEGORY,
  FETCH_DESIGNATION,
  FETCH_FOURNISSEUR,
  FETCH_SERVICE,
  FETCH_MATERIELS,
  FETCH_AGENCIES,
  FETCH_TOTAL_MATERIELS,
  FETCH_TOTAL_AVAILABLE_MATERIELS,
} from "./constants";

const { user } = isAuthenticated();
export const FetchAdmin = () => {
  return {
    type: FETCH_ADMINS,
    request: { url: `/admin/alladmins/${user.Mle}` },
  };
};
export const FetchAgent = () => {
  return {
    type: FETCH_AGENTS,
    request: { url: `/agents/all/${user.Mle}` },
  };
};
export const FetchCategory = () => {
  return {
    type: FETCH_CATEGORY,
    request: { url: `/category/allcategories/${user.Mle}` },
  };
};
export const FetchDesignation = () => {
  return {
    type: FETCH_DESIGNATION,
    request: { url: `/designations/all/${user.Mle}` },
  };
};
export const FetchFournisseur = () => {
  return {
    type: FETCH_FOURNISSEUR,
    request: { url: `/fournisseurs/all/${user.Mle}` },
  };
};
export const FetchService = () => {
  return {
    type: FETCH_SERVICE,
    request: { url: `/service/allservices/${user.Mle}` },
  };
};
export const FetchMateriels = () => {
  return {
    type: FETCH_MATERIELS,
    request: { url: `/materiels/all/${user.Mle}` },
  };
};

export const FetchAgencies = () => {
  return {
    type: FETCH_AGENCIES,
    request: { url: `/agencies/all/${user.Mle}` },
  };
};
export const FetchTotalMateriels = () => {
  const User = this.user;
  return {
    type: FETCH_TOTAL_MATERIELS,

    request: {
      url: `/materiels/countMaterielbyType/${User.Mle}`,
    },
  };
};
export const FetchTotalAvailableMateriels = () => {
  return {
    type: FETCH_TOTAL_AVAILABLE_MATERIELS,
    request: {
      url: `/materiels/countMaterielavailablebyType/${user.Mle}`,
    },
  };
};
export const showorhide = (state) => {
  return {
    type: SHOW_HIDE,
    payload: state,
  };
};
