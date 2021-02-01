import React from 'react';
import loginImage from "../../login.svg"

export class Register extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
        <div className="base-container">
            <div className="header">Register</div>
            <div className="content">
                <div className="image">
                    <img src={loginImage} alt=""/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                    <div className="button-container">
                        <button type="button" className="btn">Sign Up</button>
                    </div>

                </div>
            </div>
        </div>
        )
    }
}