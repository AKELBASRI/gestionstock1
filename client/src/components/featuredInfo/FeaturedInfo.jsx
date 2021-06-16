import React from 'react'
import './featuredInfo.css'
import {ArrowDownward, ArrowUpward} from '@material-ui/icons'
function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Nombre Total des Micro-ordinateurs</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">12</span>
                    {/* <span className="featuredMoneyRate">-11,4 <ArrowDownward /></span> */}
                </div>
                {/* <span className="featuredSub">Compared to last month</span> */}
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Nombre Total des imprimantes</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">16</span>
                    {/* <span className="featuredMoneyRate">-1,4 <ArrowDownward /></span> */}
                </div>
                {/* <span className="featuredSub">Compared to last month</span> */}
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Nombre Total des scanners </span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">12</span>
                    {/* <span className="featuredMoneyRate">11,4 <ArrowUpward /></span> */}
                </div>
                {/* <span className="featuredSub">Compared to last month</span> */}
            </div>
        </div>
    )
}

export default FeaturedInfo
