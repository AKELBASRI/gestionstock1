import React from "react";
import "./topbar.css";

import { BiLogOut } from "react-icons/bi";

import { withRouter } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch } from "react-redux";

import { API_URL } from "../../config";
import { isAuthenticated } from "../../auth/helpers";

import axios from "axios";
import { showorhide } from "../../store/actions";

function Topbar(Props) {
  const signout = () => {
    axios
      .get(`${API_URL}/signout`)

      .then(() => {
        toastr.info("utilisateur est deconnecté", "À la prochaine", {
          positionClass: "toast-top-right",
        });
        localStorage.removeItem("jwt_info");
        Props.history.push("/signin");
        dispatch(showorhide(false));
      })
      .catch((err) => {
        if (err.response.status >= 400 && err.response.status < 500) {
          toastr.warning(
            err.response.data.error,
            "S'il vous plaît Veuillez vérifier le Formulaire",
            {
              positionClass: "toast-bottom-left",
            }
          );
        } else {
          toastr.error(err.response.data.error, "Erreur du serveur", {
            positionClass: "toast-bottom-left",
          });
        }
      });
    // fetch(`${API_URL}/signout`)
    //   .then(() => {
    //     toastr.info("utilisateur est deconnecté", "À la prochaine", {
    //       positionClass: "toast-top-right",
    //     });
    //     localStorage.removeItem("jwt_info");
    //     Props.history.push("/signin");
    //     dispatch(showorhide(false));
    //   })
    //   .catch();
  };
  const dispatch = useDispatch();

  return (
    <div className="topbar">
      {isAuthenticated() ? (
        <div className="topbarWrapper">
          <div className="topLeft"></div>
          <div className="topRight">
            <BiLogOut className="logout" onClick={signout} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default withRouter(Topbar);
