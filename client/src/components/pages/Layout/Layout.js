import React,{useState,useEffect,useRef} from 'react'
import { isAuthenticated } from '../../../auth/helpers'
import { useSelector,useDispatch } from "react-redux"
import { BrowserRouter, Link,withRouter } from 'react-router-dom';
import {FiHome} from 'react-icons/fi';
import {CgMenuGridR} from 'react-icons/cg'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import {VscChromeClose} from 'react-icons/vsc'
import {MdPerson}from 'react-icons/md'
import "./Layout.css"
import Sidebar from '../../sidebar/Sidebar';
function Layout({children,props}) {
    const state = useSelector((state) => state.showorhidereducers);
    const main=useRef(null)
    const isActive=(history,path)=>{
        if(history.location.pathname===path){
            return "active"
        }else{
            return ""
        }
    }
    useEffect(()=>{
        if(state){
            main.current.style.marginLeft = "277px";
        }else{
            main.current.style.marginLeft = "90px";
        }
    },[state])
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
 
    return (
      <div>
    
       
        {/* <div id={`${isAuthenticated() ? `main`:`mainsignin`}> */}
        <div id={`${isAuthenticated() ? `main`:`mainsignin`}`} ref={main}> 
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
