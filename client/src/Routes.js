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
import categories from './components/pages/admin/categories/Categories';
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
                    <PrivateRoute path='/categories'exact component={categories}/>
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
