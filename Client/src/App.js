import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [usernameLog, setUsernameLog] = useState('')
    const [passwordLog, setPasswordLog] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    const register = () =>{
        Axios.post("http://localhost:3001/register", {username: usernameReg, password: passwordReg}).then((response)=>{
            console.log(response.data)
        });
    }

    const login = () =>{
        Axios.post("http://localhost:3001/login", {username: usernameLog, password: passwordLog}).then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message)
            }
            else{
                setLoginStatus(response.data[0].username)
            }
            
        });
    }
    return (
    <div className="App" >
        <div className="registration">
            <h1>Registration</h1>

            <label>Username</label>
            <input type="text"
                onChange={(event)=>{setUsernameReg(event.target.value)}}>
            </input>

            <label>Password</label>
            <input type="password"
                onChange={(event)=>{setPasswordReg(event.target.value)}}>
            </input>

            <button on onClick={register}>Register</button>
        </div>
        <div className="login">
        <h1>Login</h1>
            <label>Username</label>
            <input type="text" 
                onChange={(event)=>{setUsernameLog(event.target.value)}}>
            </input>

            <label>Password</label>
            <input type="password" 
                onChange={(event)=>{setPasswordLog(event.target.value)}}>
            </input>
            <button onClick={login}>Login</button>
        </div>
        <h1>{loginStatus}</h1>

    </div>
    );
}

export default App;