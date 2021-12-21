import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Webfont from 'webfontloader';
import React from 'react';

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
      <Footer />
    </Router>
  );
}

export default App;
