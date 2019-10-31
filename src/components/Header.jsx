import React from "react";
import { Link } from "react-router-dom";
import { cartIcon, loginIcon, userIcon } from "../icons.js";
import "../../public/css/header.css";//possible because of css and style loader
import { AuthContext } from "./App.jsx";



const Header = () => {

    return (
        <AuthContext>
            {value => (
                        <div className={"heading"}>
                        <Link to= {"/home"}>
                            <div className={"logo"}>
                                <img srcSet="/Images/logo.png"></img>
                            </div>
                        </Link>
                        {check(value)}
                        </div>
            )}
        </AuthContext>
    );
};
const check = (param) => {
    if(param.user.username == null){
        return (
            <div className={"headerButtons"}>
            <Link to={"/login"} >   
                <div className={"headerButton"}>
                    <img src={loginIcon} className="headerButtonIcon"></img>
                    <div className="headerButtonText">Login/Register</div>
                </div>
            </Link>    
                <div className={"headerButton"}>
                    <img src={cartIcon} className="headerButtonIcon"></img>
                    <div className="headerButtonText">Cart</div>
                </div>

            </div>
        );
    }else{
        return(
            <div className={"headerButtons"}>
                <div>Hello, {param.user.username}</div>
                <Link to={"/user"}>
                    <div className={"headerButton"}>
                        <img src={userIcon} className="userButtonIcon"></img>
                        <div className="headerButtonText">User</div>
                    </div>
                </Link>
                <div className={"headerButton"}>
                    <img src={cartIcon} className="headerButtonIcon"></img>
                    <div className="headerButtonText">Cart</div>
                </div>

            </div>
        );
    }
};

export default Header;