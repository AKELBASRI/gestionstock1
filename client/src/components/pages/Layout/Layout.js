import React from 'react'
import { isAuthenticated } from '../../../auth/helpers'
import { useSelector,useDispatch } from "react-redux"
import { withRouter } from 'react-router-dom';
import "./Layout.css"

function Layout({children,props}) {
    const state = useSelector((state) => state.showorhidereducers);
    
  
    // function useHookWithRefCallback() {
    //     const ref = useRef(null)
    //     const setRef = useCallback(node => {
    //      if(ref && ref.current) {
          
    //         if(state){
    //             console.log("ok")
    //             // ref.current.style.marginLeft = "307px";
    //         }
    //         else{
    //           console.log("ko")
    //             // ref.current.style.marginLeft = "90px";
               
    //        }
    //      }
          
    //       if (node) {
    //         // Check if a node is actually passed. Otherwise node would be null.
    //         // You can now do what you need to, addEventListeners, measure, etc.
          
    //       }
          
    //       // Save a reference to the node
    //       ref.current = node
    //     }, [])
        
    //     return [setRef]
    //   }

    
 
    //  const openNav=() =>{
    //     setstate(true)
    //     if (
    //         document.getElementById("mySidenav") &&
    //         document.getElementById("main")
    //       ) {
    //         document.getElementById("mySidenav").style.width = "250px";
    //         document.getElementById("main").style.marginLeft = "250px";
    //       }
    //   }
      
    //   const closeNav=() =>{
    //     setstate(false)
    //     if (
    //         document.getElementById("mySidenav") &&
    //         document.getElementById("main")
    //       ) {
    //         document.getElementById("mySidenav").style.width = "50px";
    //         document.getElementById("main").style.marginLeft = "50px";
    //       }
    //   }
    // const [ref] = useHookWithRefCallback()

    return (
       
      <div>
  

        <div id={isAuthenticated() && (isAuthenticated() && state ? 'main':state ?'mainsignin':'mainclose') }> 
        <div className="mx-5">{children}</div>
              <div className={`${isAuthenticated() ?`bg-blue  `:`bg-blue2`} py-4`}>
            <div className="footer ml-4 ml-sm-5 mb-2 text-center">
                <small>Copyright &copy; 2021.  RADEEO S.S.I. Tous droits réservés.<br/>Gestion Stock V1.0 by Ahmed Khalil El Basri.</small></div> 
               
                </div>
                
  

                </div>
           
        </div>
    )
}

export default withRouter(Layout)
