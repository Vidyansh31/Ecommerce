import React from 'react';
import { CgMouse } from 'react-icons/all';
import "./Home.css";
import Product from './Product.js'

const product = {
    name:"Swift 16ltr",
    images:[{url:"https://i.ibb.co/pxTmTjY/product1.jpg"}],
    _id:"product1",
    price:"₹3000"
}

const Home = () => {
    return (
        <>
            <div className="banner">
                <p>Welcome to Aquafresh</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                
            </div>
        </>
    )
}

export default Home
