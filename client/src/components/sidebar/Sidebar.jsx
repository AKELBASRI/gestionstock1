
import React,{useState,useEffect} from 'react';
import { Link ,withRouter} from 'react-router-dom';
import './sidebar.css'
import logo from '../logo_radeeo.jpg'
import { useSelector,useDispatch } from "react-redux"
import {FiHome} from 'react-icons/fi';
import {CgMenuGridR} from 'react-icons/cg'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import {VscChromeClose} from 'react-icons/vsc'
import {GiHamburgerMenu} from 'react-icons/gi'
import { showorhidesidebar } from '../../actions/showorhideAction';
import {MdPerson}from 'react-icons/md'
import { isAuthenticated } from '../../auth/helpers';
import $ from 'jquery';
import { SidebarData } from './SidebarData';
import useStateRef from 'react-usestateref'
import SubMenu from './SubMenu';
import Media from 'react-media'
const Sidebar = (props) => {
    // const[state,setstate]=useState(true)
    const dispatch=useDispatch();
    // const [state,setstate,ref]=useStateRef(true)
    const state = useSelector((state) => state.showorhidereducers);
    const isActive=(history,path)=>{
        if(history.location.pathname===path){
            return "active"
        }else{
            return ""
        }
    }
    
    const openNav=() =>{
        
       console.log("ok")
          dispatch(showorhidesidebar(true))
         
            if (
              document.getElementById("mySidenav") &&
              document.getElementById("main")
            ) {
              document.getElementById("mySidenav").style.width = "277px";
              document.getElementById("main").style.marginLeft = "277px";
              document.getElementById("mySidenav").classList.remove("active")
            }
          }
           
        
          
      
      
      const closeNav=() =>{
       
        
        dispatch(showorhidesidebar(false))
          if (
            document.getElementById("mySidenav") &&
            document.getElementById("main")
          ) {
            document.getElementById("mySidenav").style.width = "90px";
            document.getElementById("main").style.marginLeft = "90px";
            document.getElementById("mySidenav").classList.add("active")
          }
       
       
      }
   const sidenavdesktop=()=>{
     return(
    <div id="mySidenav" className={`sidenav`}>
    <span className="titleapp">Gestion Stock</span>
    {state ?   <span className="closebtn" onClick={closeNav}>&times;</span> :
    <GiHamburgerMenu className="humberger"  onClick={openNav}/>}
 {SidebarData.map((item,index)=>{
   return <SubMenu item={item} key={index} state={state} props={props} />
 })}


</div>
     );
   }
   const sidenavmobile=()=>{
     
    return(
      <div id="mySidenav" className={`sidenav`}>
      <span className="titleapp">Gestion Stock</span>
      {state ?   <span className="closebtn" onClick={closeNav}>&times;</span> :
      <GiHamburgerMenu className="humberger"  onClick={openNav}/>}
   {SidebarData.map((item,index)=>{
     return <SubMenu item={item} key={index} state={state} props={props} />
   })}

</div>
    );
  }
  useEffect(()=>{
    if (window.matchMedia("(min-width: 728px)").matches) {
      /* the view port is at least 400 pixels wide */
      openNav()
    } else {
      /* the view port is less than 400 pixels wide */
      closeNav()
    }
  },[])
    return (
        <div>
            {isAuthenticated() ?(
                        
                       
                       sidenavdesktop()
                           
       
        ):""}
        </div>
      );
    }
export default withRouter( Sidebar);