import React from 'react'
import FeaturedInfo from '../../../featuredInfo/FeaturedInfo'
import Layout from '../../Layout/Layout'
import LayoutRouter from '../../Layout/LayoutRouter'
import './home.css'
function Home() {
    return (
        <Layout>
        <div className="home">
           <FeaturedInfo />
        </div>
        </Layout>
    )
}

export default Home
