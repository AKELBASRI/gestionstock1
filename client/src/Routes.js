import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './components/pages/admin/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import PrivateRoute from './auth/PrivateRoute'
import AuthRoute from './auth/AuthRoute'
import './app.css'
// import './app'
import Signin from './components/pages/user/signin/Signin';
import ListUsers from './components/pages/admin/admin/ListAdmins';

import ListServices from './components/pages/admin/services/ListServices';
import ListAgents from './components/pages/admin/agents/ListAgents';
import ListeCategories from './components/pages/admin/categories/ListeCategories';
import ListeFournisseur from './components/pages/admin/fournisseurs/ListeFournisseurs';
function Routes() {
    
    return (
        <BrowserRouter >
        <React.Fragment>
            {/* <div className="row"> */}
            <Sidebar/>
            
                <Switch>
                <React.Fragment>
                {/* <div className="d-flex flex-column col p-0"> */}
                
                    <Topbar/>
                    <PrivateRoute path='/'exact component={Home}/>
                    
                    <PrivateRoute path='/admin/listusers'exact component={ListUsers}/>
                    <PrivateRoute path='/categories'exact component={ListeCategories}/>
                    <PrivateRoute path='/admin/services'exact component={ListServices}/>
                    <PrivateRoute path='/admin/agents'exact component={ListAgents}/>
                    <PrivateRoute path='/admin/fournisseurs'exact component={ListeFournisseur}/>
                   
                    <AuthRoute path="/signin" exact component={Signin} />

                    {/* </div>  */}
                    </React.Fragment>
                </Switch>
                {/* </div> */}
                </React.Fragment>
        </BrowserRouter>
    )
}

export default Routes
