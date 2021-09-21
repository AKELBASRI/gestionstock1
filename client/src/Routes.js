import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/admin/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import PrivateRoute from "./auth/PrivateRoute";
import AuthRoute from "./auth/AuthRoute";
import "./app.css";
// import './app'
import Signin from "./pages/user/signin/Signin";
import ListUsers from "./pages/admin/admin/ListAdmins";

import ListServices from "./pages/admin/services/ListServices";
import ListAgents from "./pages/admin/agents/ListAgents";
import ListeCategories from "./pages/admin/categories/ListeCategories";
import ListeFournisseur from "./pages/admin/fournisseurs/ListeFournisseurs";
import ListMateriels from "./pages/admin/materiels/ListeMateriels";
import ListeDesignation from "./pages/admin/designations/ListeDesignation";
import PrintMateriels from "./pages/admin/materiels/PrintMateriels";
import Affectation from "./pages/admin/inventaire/Affectation";
import ListeLieux from "./pages/admin/lieu/ListeLieux";
import ProposerReforme from "./pages/admin/materiels/ProposerReforme";
import ComparaisonMaterieloldnew from "./pages/admin/materiels/ComparaisonMaterieloldnew";

function Routes() {
  return (
    <BrowserRouter>
      <React.Fragment>
        {/* <div className="row"> */}
        <Sidebar />

        <Switch>
          <React.Fragment>
            {/* <div className="d-flex flex-column col p-0"> */}

            <Topbar />
            <PrivateRoute path="/" exact component={Home} />

            <PrivateRoute path="/admin/listusers" exact component={ListUsers} />
            <PrivateRoute
              path="/categories"
              exact
              component={ListeCategories}
            />
            <PrivateRoute
              path="/admin/services"
              exact
              component={ListServices}
            />
            <PrivateRoute path="/admin/agents" exact component={ListAgents} />
            <PrivateRoute
              path="/admin/fournisseurs"
              exact
              component={ListeFournisseur}
            />
            <PrivateRoute path="/addmtrl" exact component={ListMateriels} />
            <PrivateRoute
              path="/listdesignation"
              exact
              component={ListeDesignation}
            />
            <PrivateRoute
              path="/printmateriels"
              exact
              component={PrintMateriels}
            />
            <PrivateRoute
              path="/comparaison"
              exact
              component={ComparaisonMaterieloldnew}
            />
            <PrivateRoute path="/reforme" exact component={ProposerReforme} />
            <PrivateRoute path="/lieu" exact component={ListeLieux} />
            <PrivateRoute path="/inventory" exact component={Affectation} />
            <AuthRoute path="/signin" exact component={Signin} />

            {/* </div>  */}
          </React.Fragment>
        </Switch>
        {/* </div> */}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default Routes;
