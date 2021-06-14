// import React,{useEffect} from 'react'
// import './sidebar.css'
// import { Link } from "react-router-dom";
// import {LineStyle,Timeline,PermIdentityOutlined,StorefrontOutlined,MailOutline} from '@material-ui/icons'

// const Sidebar=(props)=> {
//     const isActive=(history,path)=>{
//         if(history.location.pathname===path){
//             return "active"
//         }else{
//             return ""
//         }
//     }
//     useEffect(()=>{
       
//     },[])
//     return (
        
//         <div className="sidebar">
          
//             <div className="sidebarWrapper">
//             <div className="sidebarMenu">
//                 <h3 className="sidebarTitle">Tableau de Bord</h3>
//                 <ul className="sidebarList">
//                     <li className="sidebarListItem active " >
//                         <LineStyle className="sidebarIcon" />
//                         Acceuil
//                     </li>
//                     <li className="sidebarListItem">
//                         <Timeline className="sidebarIcon"/>
//                         Analytique 
//                     </li>
                   
//                 </ul>
//                 </div>
                
//                 <div className="sidebarMenu">
//                 <h3 className="sidebarTitle">Menu</h3>
//                 <ul className="sidebarList">
//                     <li className="sidebarListItem ">
//                         <PermIdentityOutlined  className="sidebarIcon"/>
//                         Utilisateurs
//                     </li>
//                     <li className="sidebarListItem">
//                         <StorefrontOutlined  className="sidebarIcon"/>
//                         Produits 
//                     </li>
                   
//                 </ul>
//                 </div>
//                 <div className="sidebarMenu">
//                 <h3 className="sidebarTitle">Notification</h3>
//                 <ul className="sidebarList">
//                     <li className="sidebarListItem ">
//                         <MailOutline  className="sidebarIcon"/>
//                         Mail
//                     </li>
//                     <li className="sidebarListItem">
//                         <Timeline  className="sidebarIcon"/>
//                         Analytique 
//                     </li>
                   
//                 </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar
import React,{useEffect} from 'react';
import { Link ,withRouter} from 'react-router-dom';
import './sidebar.css'
import logo from '../logo_radeeo.jpg'
import { useSelector } from "react-redux"
import {FiHome} from 'react-icons/fi';
import {BsPersonFill} from 'react-icons/bs';

const Sidebar = (props) => {
    const showsidebar = useSelector((state) => state.showorhidereducers);
    const isActive=(history,path)=>{
        if(history.location.pathname===path){
            return "active"
        }else{
            return ""
        }
    }
 
    return (
        <div className={`SideBar ${showsidebar?'active':''}`}>
            <div className="wrapper">
            <img src={logo} alt="logo" className='logo' />
            <span className="brand">Gestion Stock</span>
            </div>
            <ul>
                <li>
                    <Link className={isActive(props.history,'/')}   to='/'><FiHome/>
                    Home</Link>
                </li>
                <li>
                    <Link className={isActive(props.history,'/aboutus')}   to='/aboutus'><BsPersonFill/>
                    About us</Link>
                </li>
                <li>
                    <a href='/'> Contact us</a>
                </li>
            </ul>
        </div>
      );
    }
export default withRouter( Sidebar);