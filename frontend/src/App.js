import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Webfont from 'webfontloader';
import React from 'react';
import ProductDetail from './components/product/ProductDetail.js';
import Products from './components/product/Products.js';
import Search from './components/search/Search.js';
import LoginSignUp from "./components/User/LoginSignUp";

function App() {
  React.useEffect(() => {
    Webfont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"],
      },
    })
  })
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetail} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/:keyword" component={Products} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/login" component={LoginSignUp} />

      <Footer />
    </Router>
  );
}

export default App;
