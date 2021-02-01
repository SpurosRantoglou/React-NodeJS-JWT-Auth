const express = require('express');
const app = express();  
const mysql = require('mysql');
const cors = require('cors');

const jwt = require('jsonwebtoken');

//Hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Cookies-Session
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());

//We use this because we want to create sessions
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 31 //Session expires afte 1 month
    }
}))


//Get connection with the db
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'password',
    database: 'jwtdb'
})


//Register
app.post('/register', (req, res)=>{

    const username = req.body.username
    const password = req.body.password

    console.log(req.body)

    bcrypt.hash(password, saltRounds, (err,hash) =>{
        
        db.query('INSERT INTO users (username, password) VALUES(?,?)',
        [username, hash], (error, result)=>{
             if(error){
                 console.log(error)
             }else{
                 res.send("Values Inserted")
             }
         });
    

    })

  
});

//Login
app.post('/login', (req, res)=>{

    const username = req.body.username
    const password = req.body.password

    console.log(req.body)

    db.query('SELECT * FROM users WHERE username = ?',
    [username],
    (error, result)=>{
         if(error){
             res.send({error: error})
         }
        
        if(result.length>0){
            bcrypt.compare(password,result[0].password, (error, response)=>{
                if(response){
                    
                    req.session.user = result



                    const id = result[0].id
                    const token = jwt.sign({id}, "jwtSecret", {
                        expiresIn: 300,
                    })


                    console.log(req.session.user)
                    res.json({auth: true, token: token, result: result})
                }else{
                    res.send({message: "Wrong username and password combination"})
                }   
            })
        }else{
            res.send({message: "This user doesn't exist"})
        }
                
         
     });
});

app.get('/login', (req,res)=>{
    
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false, user: req.session.user})
    }
})

const verifyJWT = (req, res, next)=>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.send("No token found")
    }else{
        jwt.verify(token, "jwtSecret", (err, decoded)=>{
            if(err){
                res.send({auth: false, message: "Failed to authenticate with token"})
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/userAuth',verifyJWT,(req,res)=>{
    res.send("You are authenticated")
})



app.listen(3001, ()=>{console.log("Running on 3001")});