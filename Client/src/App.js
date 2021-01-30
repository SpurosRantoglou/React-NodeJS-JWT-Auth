import './App.css';

function App() {
    return (
    <div className="App" >
        <div className="registration">
            <h1>Registration</h1>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="password"></input>
            <button>Register</button>
        </div>
        <div className="login">
        <h1>Login</h1>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="password"></input>
            <button>Login</button>
        </div>

    </div>
    );
}

export default App;