import React from 'react'
import "./Layout.css"
function Layout({children}) {
    return (
        <div>
            <div>{children}</div>
              <div className="bg-blue1 py-4 ">
            <div className="footer ml-4 ml-sm-5 mb-2 text-center">
                <small>Copyright &copy; 2021.  RADEEO S.S.I. Tous droits réservés.<br/>Gestion Stock V1.0 by Ahmed Khalil El Basri.</small></div> 
             
           
        </div> 
        </div>
    )
}

export default Layout
