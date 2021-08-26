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
const { user, token } = isAuthenticated();
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
export const FetchAdmin = () => ({
  type: FETCH_ADMINS,
  request: { url: `/admin/alladmins/${user.Mle}`, headers },
});
export const FetchAgent = () => ({
  type: FETCH_AGENTS,
  request: { url: `/agents/all/${user.Mle}`, headers },
});
export const FetchCategory = () => ({
  type: FETCH_CATEGORY,
  request: { url: `/category/allcategories/${user.Mle}`, headers },
});
export const FetchDesignation = () => ({
  type: FETCH_DESIGNATION,
  request: { url: `/designations/all/${user.Mle}`, headers },
});
export const FetchFournisseur = () => ({
  type: FETCH_FOURNISSEUR,
  request: { url: `/fournisseurs/all/${user.Mle}`, headers },
});
export const FetchService = () => ({
  type: FETCH_SERVICE,
  request: { url: `/service/allservices/${user.Mle}`, headers },
});
export const FetchMateriels = () => ({
  type: FETCH_MATERIELS,
  request: { url: `/materiels/all/${user.Mle}`, headers },
});
export const FetchAgencies = () => ({
  type: FETCH_AGENCIES,
  request: { url: `/agencies/all/${user.Mle}`, headers },
});
export const FetchTotalMateriels = () => ({
  type: FETCH_TOTAL_MATERIELS,
  request: { url: `/materiels/countMaterielbyType/${user.Mle}`, headers },
});
export const FetchTotalAvailableMateriels = () => ({
  type: FETCH_TOTAL_AVAILABLE_MATERIELS,
  request: {
    url: `/materiels/countMaterielavailablebyType/${user.Mle}`,
    headers,
  },
});
export const showorhide = () => ({
  type: SHOW_HIDE,
});
