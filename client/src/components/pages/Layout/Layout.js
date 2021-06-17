import React from 'react'
import { isAuthenticated } from '../../../auth/helpers'
import "./Layout.css"
function Layout({children}) {
    return (
        <div>
           
            
            <div className="mx-5">{children}</div>
              <div className={`${isAuthenticated() ?`bg-blue  `:`bg-blue2`} py-4`}>
            <div className="footer ml-4 ml-sm-5 mb-2 text-center">
                <small>Copyright &copy; 2021.  RADEEO S.S.I. Tous droits réservés.<br/>Gestion Stock V1.0 by Ahmed Khalil El Basri.</small></div> 
             
                </div>
       
        </div>
    )
}

export default Layout
