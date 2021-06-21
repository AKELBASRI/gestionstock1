import React, { useState,useEffect } from 'react'
import { Link,withRouter } from 'react-router-dom';

function SubMenu({item,state,props}) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const isActive = (history, path) => {
      if (history.location.pathname === path) {
        // setSubnav(true)
        return {
          background:"#172b4d",
          width: '100%'

        }

       
      } else {
        // setSubnav(false)
        return {
          
          width: '100%'

        }
       
      }
    };
    const closeifnotactive=(history,path)=>{
      if (history.location.pathname === path) {
        console.log("ok")
         setSubnav(true)
      }else{
        // showSubnav()
        setSubnav(false)
        console.log("ko")
      }
     
    }
    
    return (
        <div>
           
            <div >
            <ul>
            <li>
                
                <Link to={item.subNav ?"#":item.path} className="" style={isActive(props.history,item.path)}  onClick={item.subNav && showSubnav  } 
                
                >
                  <span className="icon"><i className={item.icon} ></i></span>
                  <span className="title">{item.title}</span>
                  {item.subNav &&(
                      item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null
                  )}
                </Link>
               
                {
                  subnav && 
                
                <ul className={state?"show":"showleft"}>

                
                {subnav && item.subNav && item.subNav.map((item,index)=>{
                    return(
                        <li key={index}  >
                      <Link to={item.path} style={isActive(props.history,item.path)  }   >
                      {/* <span className="icon"><i className={item.icon}></i></span> */}
                      <span className="title">{item.title}</span>
                    </Link></li>
                    );
                })}
                </ul>
                }
              </li>
              
             
            </ul>
        </div> 
        </div>
    )
}

export default withRouter(SubMenu)
