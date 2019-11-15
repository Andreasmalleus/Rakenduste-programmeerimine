import React from "react";
import "../../public/css/loginpage.css";
import propTypes from "prop-types";
import { Link } from "react-router-dom";



class LoginPage extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : ""
        };

    }

    

    handleChange = (event) => {
        //console.log(event.target.name, event.target.value);
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    //A promise is a mechanism for tracking a value that will be assigned some time in the future.
    //Promise is at the pending state at the beginning
    handleSubmit = (event) => {
        event.preventDefault();//dont refresh browser
        fetch("/api/v1/auth/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(this.state),
            
        }).then(result => {//needed to get resolved promise
            return result.json();
        }).then(data => { //then when promise is resolved
            console.log(data);
            this.props.onLogin({
                token : data.token,
                user : data.user
            });
            if(typeof data != "undefined"){
                //acts as a router and redirects if successful
                this.props.history.push("/user");//`/users/${data.user._id}`
            }
        }).catch(err => {
            console.log(err);
        });
        
    }

    render(){
        return(
            <div className="form-body" onSubmit={this.handleSubmit.bind(this)}>
            <form className="box">
            <h1>Login</h1>
            <input type="text" name="username" placeholder="Username" onChange={this.handleChange.bind(this)} value={this.state.username}/>
            <input type="password" name="password" placeholder="Password"onChange={this.handleChange.bind(this)} value={this.state.password}/>
            <input type="submit" name="" value="Login"/>
            <div className="links">
                <Link to= {"/signup"}>
                    <h2 className="home-button">
                        Signup
                    </h2>
                </Link>
                <Link to= {"/home"}>
                    <h2 className="signup-button">
                        Home
                    </h2>
                </Link>
            </div>
            </form>
            </div>
            );
    }
}

LoginPage.propTypes = {

    onLogin : propTypes.func,
    history : propTypes.object
          
};

export default LoginPage;
