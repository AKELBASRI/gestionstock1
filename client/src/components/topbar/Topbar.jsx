import React,{useState} from 'react'
import "./topbar.css"
import {NotificationsNone,Settings} from '@material-ui/icons';
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrClose} from 'react-icons/gr'

import { useDispatch,useSelector } from "react-redux";
import { showorhidesidebar, showsidebar } from '../../actions/showorhideAction';
function Topbar() {
    const dispatch=useDispatch();
    const[showSidebar,setShowSidebar]=useState(true);
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                
            <div className="topLeft">
                {!showSidebar ? <GrClose className="header" onClick={()=>{setShowSidebar(!showSidebar);dispatch(showorhidesidebar(showSidebar))}}/> : <GiHamburgerMenu className="header" onClick={()=>{setShowSidebar(!showSidebar);dispatch(showorhidesidebar(showSidebar))}}/>}
                
                
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
