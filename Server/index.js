const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const e = require('express');

const saltRounds = 10;

app.use(cors());
app.use(express.json());

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
                    res.send(result)    
                }else{
                    res.send({message: "Wrong username and password combination"})
                }
                

            })
        
        }else{
            res.send({message: "This user doesn't exist"})
        }
                
         
     });

});

//Get 
app.get('/employees', (req, res) => {
    
    
    db.query("SELECT * FROM employees", (error, result) => {
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    });
});


app.listen(3001, ()=>{console.log("Running on 3001")});