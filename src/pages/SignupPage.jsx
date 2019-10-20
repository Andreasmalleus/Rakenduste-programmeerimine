import React from "react";
import "../../public/css/loginpage.css";
import { Link } from "react-router-dom";

class SignupPage extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            email : "",
            phone : ""
        };

    }

    

    handleChange = (event) => {
        //console.log(event.target.name, event.target.value);
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();//dont refresh browser
        //console.log(this.state);
        //console.log(event);
        fetch("api/users/signup", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(this.state),
        });
    }

    render(){
        return(

                <div className="signupPageForm" onSubmit={this.handleSubmit.bind(this)}>
                <h1>Sign in</h1>
                <form>
                    <div className="usernameInput" data-validate = "Username is required">
						<input className="signupInput-1" type="text" name="username" onChange={this.handleChange.bind(this)} value={this.state.username} placeholder="Username"/>
                        <div className="signupInput-1-text">Username</div>
					</div>
                    <br></br>
                    <div className="emailInput" data-validate = "Email is required">
						<input className="signupInput-2" type="email" name="email" onChange={this.handleChange.bind(this)} value={this.state.email} placeholder="Email"/>
                        <div className="signupInput-2-text">Email</div>
					</div>
                    <br></br>
                    <div className="phoneInput" data-validate = "Phone number is required">
						<input className="signupInput-3" type="text" name="phone" onChange={this.handleChange.bind(this)} value={this.state.phone} placeholder="Phone"/>
                        <div className="signupInput-3-text">Phone number</div>
					</div>
                    <br></br>
                    <div className="passwordInput" data-validate = "Password is required">
						<input className="signupInput-4" type="password" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} placeholder="Password"/>
                        <div className="signupInput-4-text">Password</div>
					</div>
                    <br></br>
                    <button className="submitSignup">
							Sign Up
					</button>
                    <Link to={"/login"}>
                        <div className="loginInstead">
                            <p>Back to loginpage</p>
                        </div>
                    </Link>
                </form>
                </div>            
            );
    }
}

export default SignupPage;