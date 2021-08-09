import React from 'react'

function FeaturedItem({countype}) {
   
    return (
     
        <div className="featured">
        
        <div className="featuredItem" >
        <span className="featuredTitle">{`Nombre Total des ${countype[1]}s`}</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">{countype[0]}</span>
            {/* <span className="featuredMoneyRate">-11,4 <ArrowDownward /></span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
        </div>
        </div>
    )
}

export default FeaturedItem
