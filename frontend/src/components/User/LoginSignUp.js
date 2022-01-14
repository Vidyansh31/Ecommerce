import React, { Fragment ,useRef,useState} from 'react';
import './LoginSignUp.css';
// import Loader from '../layout/Loader/Loader';
import {Link} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";


const LoginSignUp = () => {

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = () => {
        console.log("login successfully")
    }

    const switchTabs = (e,tab) => {
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
    }
    return (
        <Fragment>
            <div className="login-sign-up-container">
                <div className="login-sign-up-box">
                    <div>
                        <div className="login-sign-up-toggle">
                            <p onClick={(e) => switchTabs(e,"login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e,"register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form  className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}></input>
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                required
                                placeholder="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}></input>
                        </div>
                        <Link to="/password/forget" >Forget Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn"></input>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginSignUp
