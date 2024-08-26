const express  = require('express');
const app = express();
const db = require('./db')
const Person = require('./models/person.models.schema')
const MenuItem = require('./models/menuItems.Schema')

require('dotenv').config()
const PORT = process.env.PORT || 3001

// Middleware to extract body from the http requests
const bodyParser = require('body-parser')
app.use(bodyParser.json());         // req.body

app.get('/' , (req , res)=>{
    res.send("Hello Welcome to my Restraunt.")
})



// Import the router files and use them
const personRoutes = require('./routes/personRoutes.js')
app.use('/person' , personRoutes)

const menuRoutes = require('./routes/menuRoutes.js')
app.use('/menu' , menuRoutes)

app.listen(PORT , ()=>console.log(`Listening on port : ${PORT}`))