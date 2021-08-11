import React, { useState,useEffect } from 'react'
import { Link,withRouter } from 'react-router-dom';
import styled from 'styled-components'
function SubMenu({item1,state,props,onOpen}) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    item1.close=()=>{setSubnav(false)}
    const isActive = (history, path) => {
      
      if (history.location.pathname === path) {
          
      
        return {
          background:"#172b4d",
          width: '100%'
        }
       
      } else {
       
        return {  
          width: '100%'
        }
       
      }
    };
    const clickitem=(item1,path)=>{
      
    
        if(item1.item.subNav){
          showSubnav()
        }else if(path){
          onOpen(item1.key)
        }

      
    }
    useEffect(()=>{
      if(subnav) {
        onOpen(item1.key)
      }
    },[subnav])
    return (
        <div>
           
           
            <ul>
            <li>
                
                <Link to={item1.item.subNav ?"#":item1.item.path}  style={isActive(props.history,item1.item.path)}  onClick={()=>clickitem(item1,item1.item.path)}
                 
                
                >
                  <span ><i className={item1.item.icon} ></i></span>
                  <Title state={state} >{item1.item.title}</Title>
                  {item1.item.subNav &&(
                      item1.item.subNav && subnav
                        ? item1.item.iconOpened
                        : item1.item.subNav
                        ? item1.item.iconClosed
                        : null
                  )}
                </Link>
               
                {
                  subnav && 
                
              <ShowLeft state={state}>

                
                {subnav && item1.item.subNav && item1.item.subNav.map((item,index)=>{
                    return(
                        <li key={index}  >
                      <Link to={item.path} style={isActive(props.history,item.path)  }   >
                      
                      <SubTitle >{item.title}</SubTitle>
                    </Link></li>
                    );
                })}
                </ShowLeft>
                
                }
              </li>
              
             
            </ul>
        </div> 
       
    )
}

export default withRouter(SubMenu)

const ShowLeft=styled.div`
${({ state }) =>!state?`
    position: fixed !important;
    display: block;
    left: 90px;
    transform: translateY(-25%);
    background-color:#011627 ;
    transition: all 1s ease;
`:''}
   
`
const Title=styled.div`
    display:  ${({ state }) =>!state?'none':'block' };
    font-size: 16px;
    margin-left: 20px;
    font-weight: bold;

`
const SubTitle=styled.div`
  
    font-size: 16px;;
    margin-left: 20px;
    font-weight: bold;
    padding-left:20px;
`