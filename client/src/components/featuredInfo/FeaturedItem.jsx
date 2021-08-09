import React from 'react'
import styled from 'styled-components'

function FeaturedItem({totalmateriel}) {
   
    return (
     
       <Featured>
        
        <Item>
        <span >{`Nombre Total des ${totalmateriel[1]}s`}</span>
        <FeaturedMoneyContainer>
            <span>{totalmateriel[0]}</span>
            {/* <span className="featuredMoneyRate">-11,4 <ArrowDownward /></span> */}
        </FeaturedMoneyContainer>
        {/* <span className="featuredSub">Compared to last month</span> */}
        </Item>
        </Featured>
        
    )
}

export default FeaturedItem
const Featured=styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
const Item=styled.div`
    flex:1;
    margin: 0px 20px;
    padding: 30px;
    border-radius:10px ;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    span{
        font-size: 20px;
    }
`
const FeaturedMoneyContainer=styled.div`
    margin:10px 0px;
    display: flex;
    align-items: center;
    span{
        font-size: 30px;
        font-weight: 600;
    }
    }
`
const FeaturedMoneyRate=styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
`