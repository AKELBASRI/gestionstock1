import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SubMenu({item}) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    return (
        <div>
            
            <div >
            <ul>
            <li>
                
                <Link to={item.path} className="" onClick={showSubnav}>
                  <span className="icon"><i className={item.icon}></i></span>
                  <span className="title">{item.title}</span>
                  {item.subNav &&(
                      item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                        ? item.iconClosed
                        : null
                  )}
                </Link>
                {subnav && 
                <ul className="show">

                
                {subnav && item.subNav.map((item,index)=>{
                    return(
                        <li key={index}>
                      <a href="#">
                      <span className="icon"><i className={item.icon}></i></span>
                      <span className="title">{item.title}</span>
                    </a></li>
                    );
                })}
                </ul>
}
              </li>
              
              {/* <li>
                  
                  <a href="#" className="feat-btn">
                    <span className="icon"><i className="fas fa-dice-d6"></i></span>
                    <span className="title">Features</span>
                    
                    <span className="fas fa-caret-down caret first"></span>
                  </a>
                  <ul className="feat-show">
                    <li>
                      <a href="#">
                      <span className="icon"><i className="fas fa-dice-d6"></i></span>
                      <span className="title">Pages</span>
                    </a></li>
                    <li><a href="#">
                      <span className="icon"><i className="fas fa-dice-d6"></i></span>
                      <span className="title">Elements</span>
                    </a></li>
                  </ul>
                </li> */}
            </ul>
        </div> 
        </div>
    )
}

export default SubMenu
