import React from "react";
import "./topbar.css";

import { BiLogOut } from "react-icons/bi";

import { withRouter } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch } from "react-redux";
import { showorhidesidebar } from "../../actions/showorhideAction";
import { API_URL } from "../../config";
import { isAuthenticated } from "../../auth/helpers";

function Topbar(Props) {
  const signout = () => {
    fetch(`${API_URL}/signout`)
      .then(() => {
        toastr.info("utilisateur est deconnecté", "À la prochaine", {
          positionClass: "toast-top-right",
        });
        localStorage.removeItem("jwt_info");
        Props.history.push("/signin");
        dispatch(showorhidesidebar(true));
      })
      .catch();
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
