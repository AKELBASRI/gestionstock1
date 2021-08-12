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

function Topbar(props) {
  const signout = () => {
    fetch(`${API_URL}/signout`)
      .then(() => {
        toastr.info("utilisateur est deconnecté", "À la prochaine", {
          positionClass: "toast-top-right",
        });
        localStorage.removeItem("jwt_info");
        props.history.push("/signin");
        dispatch(showorhidesidebar(true));
      })
      .catch();
  };
  const dispatch = useDispatch();

  // const [showSidebar,setShowSidebar,ref]=useStateRef(false)
  // const showsidebar = useSelector((state) => state.showorhidereducers);

  return (
    <div className="topbar">
      {isAuthenticated() ? (
        <div className="topbarWrapper">
          <div className="topLeft">
            {/* { showsidebar ? <GrClose className="header" onClick={()=>{dispatch(showorhidesidebar(false))}}/> : 
                <GiHamburgerMenu className="header" onClick={()=>{dispatch(showorhidesidebar(true))}}/>
                }
                 */}
            {/* <GiHamburgerMenu className="mobilehumberger" onClick={()=>{dispatch(showorhidesidebar(true))}}/> */}
          </div>
          <div className="topRight">
            {/* <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div> */}
            {/* <div className="topbarIconContainer">
                    <Settings />
                </div> */}

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
