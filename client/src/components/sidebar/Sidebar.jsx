
import React,{useState,useEffect,useRef,useCallback} from 'react';
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
    const sidebar=useRef(null)
    const state = useSelector((state) => state.showorhidereducers);
    const keys=SidebarData.map(function(item,key){
      return{key:key,close:null,item:item}
    })
    const onOpen=(key)=>{
      
      keys.forEach(x=>{
        
        if(x.key!==key && x.close !==null){
         
          x.close();
        }
      })
    }
    const openNav=() =>{
        
      //  console.log("ok")
          dispatch(showorhidesidebar(true))
         
            if (
              sidebar.current
            ) {
          
              sidebar.current.style.width="307px";
              
              sidebar.current.classList.remove('active');
              
            }
          }
           
        
          
      
      
      const closeNav=() =>{
       
        
        dispatch(showorhidesidebar(false))
          if (
            sidebar.current
          ) {
    
            sidebar.current.style.width="90px";
            sidebar.current.classList.add('active');
          }
       
       
      }
   const sidenavdesktop=()=>{
     return(
    <div id="mySidenav" className={`sidenav`} ref={sidebar}>
    <span className="titleapp">Gestion Stock</span>
    {state ?   <span className="closebtn" onClick={closeNav}>&times;</span> :
    <GiHamburgerMenu className="humberger"  onClick={openNav}/>}
 {/* {SidebarData.map((item,index)=>{
   return <SubMenu item={item} key={index} state={state} props={props} />
 })} */}
{keys.map((item,index)=>{
 
   return <SubMenu onOpen={onOpen} item1={item} key={index} state={state} props={props} />
 })}

</div>
     );
   }
   function useHookWithRefCallback() {
    const ref = useRef(null)
    const setRef = useCallback(node => {
     if(ref && ref.current) {
      
        if (window.matchMedia("(min-width: 728px)").matches) {
          openNav(ref)
           
        }
        else{
         
           closeNav(ref)
           
       }
     }
      
      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
      
      }
      
      // Save a reference to the node
      ref.current = node
    }, [])
    
    return [setRef]
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

  const [ref] = useHookWithRefCallback()

    return (
        <div>
            {isAuthenticated() ?(
                        
                       
                       sidenavdesktop()
                           
       
        ):""}
        </div>
      );
    }
export default withRouter( Sidebar);