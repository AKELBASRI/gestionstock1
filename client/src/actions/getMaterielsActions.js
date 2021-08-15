import { isAuthenticated } from "../auth/helpers";
import { API_URL } from "../config";

export const getMateriels = () => async (dispatch) => {
  try {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/materiels/all/${user.Mle}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "GetMateriels", payload: data });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
