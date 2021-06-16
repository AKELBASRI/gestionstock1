import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import AboutUs from './components/pages/AboutUs/AboutUs';
import Home from './components/pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './app.css'
import Signin from './components/pages/admin/signin/Signin';
function Routes() {
    
    return (
        <BrowserRouter >
        <React.Fragment>
            <div className="rowFlex">
            <Sidebar/>
            
                <Switch>
                <React.Fragment>
                <div className="Columnflex">
                    <Topbar/>
                    <Route path='/'exact component={Home}/>
                    <Route path='/aboutus'exact component={AboutUs}/>
                    <Route path="/signin" exact component={Signin} />
                    </div> 
                    </React.Fragment>
                </Switch>
                </div>
                </React.Fragment>
        </BrowserRouter>
    )
}

export default Routes
