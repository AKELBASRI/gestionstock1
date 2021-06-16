import React,{useState,useEffect} from 'react'
import "./topbar.css"
import {NotificationsNone,Settings} from '@material-ui/icons';
import {GiHamburgerMenu} from 'react-icons/gi'

import {GrClose} from 'react-icons/gr'

import { useDispatch,useSelector } from "react-redux";
import { showorhidesidebar } from '../../actions/showorhideAction';
function Topbar() {
    const dispatch=useDispatch();
   
    // const [showSidebar,setShowSidebar,ref]=useStateRef(false)
    const showsidebar = useSelector((state) => state.showorhidereducers);
    
    return (
        <div className="topbar">
            <div className="topbarWrapper">
            
            <div className="topLeft">
           { showsidebar ? <GrClose className="header" onClick={()=>{dispatch(showorhidesidebar(false))}}/> : 
                <GiHamburgerMenu className="header" onClick={()=>{dispatch(showorhidesidebar(true))}}/>}
                
                <GiHamburgerMenu className="mobilehumberger" onClick={()=>{dispatch(showorhidesidebar(true))}}/>
                
                {/* <span className="logo">Gestion Stock</span> */}
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
                <img src="https://images.pexels.com/photos/1627936/pexels-photo-1627936.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="topAvatar"/>
            
            </div>
            </div>
           
        </div>
    )
}

export default Topbar
