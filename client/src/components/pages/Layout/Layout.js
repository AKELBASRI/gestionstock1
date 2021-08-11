import React from 'react'
import { isAuthenticated } from '../../../auth/helpers'
import { useSelector } from "react-redux"
import { withRouter } from 'react-router-dom';
import "./Layout.css"
import styled from 'styled-components'
function Layout({children,props}) {
    const state = useSelector((state) => state.showorhidereducers);
    
    return (
       
      <div>
       
        <Container state={state} isAuthenticated={isAuthenticated()}>
        <div className="mx-5">{children}</div>
        <FooterBackground isAuthenticated={isAuthenticated()}>
              <div className="py-4">
            <div className="footer ml-4 ml-sm-5 mb-2 text-center">
                <small>Copyright &copy; 2021.  RADEEO S.S.I. Tous droits réservés.<br/>Gestion Stock V1.0 by Ahmed Khalil El Basri.</small></div> 
               
                </div>
        </FooterBackground>     
  

     
        </Container>
       </div>
    )
}

export default withRouter(Layout)

const Container=styled.div`
  margin-left: ${({state,isAuthenticated})=>isAuthenticated && state?'270px;':state?'0px;':'90px;'} 
`

const FooterBackground=styled.div`
  color: #fff;
  background-color: #011627;
  margin-top: ${({isAuthenticated})=>isAuthenticated ?'calc(100vh - 50px);':'calc(100% - 80%);'}
`