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

export default class Actions {
  constructor() {
    this.user = isAuthenticated().user;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    };
  }

  FetchAdmin() {
    const headers = this.headers;
    const mle = this.user.Mle;
    return {
      type: FETCH_ADMINS,
      request: { url: `/admin/alladmins/${mle}`, headers },
    };
  }
  FetchAgent() {
    const User = this.user;
    const headers = this.headers;
    return {
      type: FETCH_AGENTS,
      request: { url: `/agents/all/${User.Mle}`, headers },
    };
  }
  FetchCategory() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_CATEGORY,
      request: { url: `/category/allcategories/${User.Mle}`, headers },
    };
  }
  FetchDesignation() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_DESIGNATION,
      request: { url: `/designations/all/${User.Mle}`, headers },
    };
  }
  FetchFournisseur() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_FOURNISSEUR,
      request: { url: `/fournisseurs/all/${User.Mle}`, headers },
    };
  }
  FetchService() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_SERVICE,
      request: { url: `/service/allservices/${User.Mle}`, headers },
    };
  }
  FetchMateriels() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_MATERIELS,
      request: { url: `/materiels/all/${User.Mle}`, headers },
    };
  }

  FetchAgencies() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_AGENCIES,
      request: { url: `/agencies/all/${User.Mle}`, headers },
    };
  }
  FetchTotalMateriels() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_TOTAL_MATERIELS,

      request: {
        url: `/materiels/countMaterielbyType/${User.Mle}`,
        headers,
      },
    };
  }
  FetchTotalAvailableMateriels() {
    const headers = this.headers;
    const User = this.user;
    return {
      type: FETCH_TOTAL_AVAILABLE_MATERIELS,
      request: {
        url: `/materiels/countMaterielavailablebyType/${User.Mle}`,
        headers,
      },
    };
  }
  showorhide(state) {
    return {
      type: SHOW_HIDE,
      payload: state,
    };
  }
}
