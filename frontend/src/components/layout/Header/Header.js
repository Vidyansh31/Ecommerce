import React from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.jpg";

const options = {
  burgerColorHover:"#ff6347",
  logo,
  link1Text:"Home",
  link2Text:"About",
  link3Text:"Products",
  link4Text:"Contact",
  navColor1:"white",
  link1Url:"/",
  link2Url:"/about",
  link3Url:"/products",
  link4Url:"/contact",
  link1Color:"black",
  link1Size:"1.4vmax",
  nav1justifyContent:"flex-end",
  nav2justifyContent:"flex-end",
  nav3justifyContent:"flex-start",
  nav4justifyContent:"flex-start",
  link1ColorHover:"#ff6347",
  link1Margin:"1vmax",
  link1Padding:"1vmax",
  searchIconColor:"grey",
  cartIconColor:"grey",
  profileIconColor:"grey",
  searchIconMargin:"1vmax",
  profileIconMargin:"1vmax",
  cartIconMargin:"1vmax",
  profileIconUrl:"/login",
  searchIconColorHover:"#ff6347",  
  profileIconColorHover:"#ff6347",  
  cartIconColorHover:"#ff6347",  

}

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
