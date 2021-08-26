import { isAuthenticated } from "../auth/helpers";
import { API_URL } from "../config";
import { FETCH_ADMINS, FETCH_AGENTS, SHOW_HIDE,FETCH_CATEGORY, FETCH_DESIGNATION, FETCH_FOURNISSEUR, FETCH_SERVICE, FETCH_MATERIELS } from "./constants";
const { user, token } = isAuthenticated();
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
export const FetchAdmin = () => ({
  type: FETCH_ADMINS,
  request: { url: `/admin/alladmins/${user.Mle}`,headers },

});
export const FetchAgent = () => ({
  type: FETCH_AGENTS,
  request: { url: `/agents/all/${user.Mle}`,headers },

});
export const FetchCategory = () => ({
  type: FETCH_CATEGORY,
  request: { url: `/category/allcategories/${user.Mle}`,headers },

});
export const FetchDesignation = () => ({
  type: FETCH_DESIGNATION,
  request: { url: `/designations/all/${user.Mle}`,headers },

});
export const FetchFournisseur = () => ({
  type: FETCH_FOURNISSEUR,
  request: { url: `/fournisseurs/all/${user.Mle}`,headers },

});
export const FetchService = () => ({
  type: FETCH_SERVICE,
  request: { url: `/service/allservices/${user.Mle}`,headers },

});
export const FetchMateriels= () => ({
  type: FETCH_MATERIELS,
  request: { url: `/materiels/all/${user.Mle}`,headers },

});
export const showorhide=()=>({
  type:SHOW_HIDE
})