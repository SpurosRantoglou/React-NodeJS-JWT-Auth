const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Get connection with the db
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'password',
    database: 'jwtdb'
})



app.listen(3001, ()=>{console.log("Running on 3001")});