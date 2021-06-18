
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
import SubMenu from './SubMenu';
const Sidebar = (props) => {
    const[state,setstate]=useState(false)
    const dispatch=useDispatch();
   
    const isActive=(history,path)=>{
        if(history.location.pathname===path){
            return "active"
        }else{
            return ""
        }
    }
    
    const openNav=() =>{
        
        setstate(true)
        
          
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
       
        setstate(false)
        if (
            document.getElementById("mySidenav") &&
            document.getElementById("main")
          ) {
            document.getElementById("mySidenav").style.width = "90px";
            document.getElementById("main").style.marginLeft = "90px";
            document.getElementById("mySidenav").classList.add("active")
          }
      }
      useEffect(()=>{
        openNav()
    },[])
    return (
        <div>
            {isAuthenticated() ?(
                         <div>
                          
                        <div id="mySidenav" className="sidenav">
                        <span className="titleapp">Gestion Stock</span>
                        {state ?   <span className="closebtn" onClick={closeNav}>&times;</span> :
                        <GiHamburgerMenu className="humberger"  onClick={openNav}/>}
                     {SidebarData.map((item,index)=>{
                       return <SubMenu item={item} key={index} />
                     })}
            
                                    
                    </div>
                           
        </div>
        ):""}
        </div>
      );
    }
export default withRouter( Sidebar);