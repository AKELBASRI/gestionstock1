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
  FETCH_SERVICE_HIARCHY,
  FETCH_LIEUX,
} from "./constants";

// const { user } = isAuthenticated();
export const FetchAdmin = () => {
  return {
    type: FETCH_ADMINS,
    request: { url: `/admin/alladmins/${isAuthenticated().user.Mle}` },
  };
};
export const FetchAgent = () => {
  return {
    type: FETCH_AGENTS,
    request: { url: `/agents/all/${isAuthenticated().user.Mle}` },
  };
};
export const FetchCategory = () => {
  return {
    type: FETCH_CATEGORY,
    request: { url: `/category/allcategories/${isAuthenticated().user.Mle}` },
  };
};
export const FetchDesignation = () => {
  return {
    type: FETCH_DESIGNATION,
    request: { url: `/designations/all/${isAuthenticated().user.Mle}` },
  };
};
export const FetchFournisseur = () => {
  return {
    type: FETCH_FOURNISSEUR,
    request: { url: `/fournisseurs/all/${isAuthenticated().user.Mle}` },
  };
};
export const FetchService = () => {
  return {
    type: FETCH_SERVICE,
    request: { url: `/service/allservices/${isAuthenticated().user.Mle}` },
  };
};
export const FetchServiceHiearchy = () => {
  return {
    type: FETCH_SERVICE_HIARCHY,
    request: {
      url: `/service/allserviceswithhiearchy/${isAuthenticated().user.Mle}`,
    },
  };
};
export const FetchMateriels = () => {
  return {
    type: FETCH_MATERIELS,
    request: { url: `/materiels/all/${isAuthenticated().user.Mle}` },
  };
};

export const FetchAgencies = () => {
  return {
    type: FETCH_AGENCIES,
    request: { url: `/agencies/all/${isAuthenticated().user.Mle}` },
  };
};
export const FetchTotalMateriels = () => {
  return {
    type: FETCH_TOTAL_MATERIELS,

    request: {
      url: `/materiels/countMaterielbyType/${isAuthenticated().user.Mle}`,
    },
  };
};
export const FetchTotalAvailableMateriels = () => {
  return {
    type: FETCH_TOTAL_AVAILABLE_MATERIELS,
    request: {
      url: `/materiels/countMaterielavailablebyType/${
        isAuthenticated().user.Mle
      }`,
    },
  };
};
export const FetchLieu = () => {
  return {
    type: FETCH_LIEUX,
    request: {
      url: `/lieux/alllieux/${isAuthenticated().user.Mle}`,
    },
  };
};
export const showorhide = (state) => {
  return {
    type: SHOW_HIDE,
    payload: state,
  };
};
