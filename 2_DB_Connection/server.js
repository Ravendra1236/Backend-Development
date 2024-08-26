const express  = require('express');
const app = express();
const db = require('./db')
const Person = require('./models/person.models.schema')
const MenuItem = require('./models/menuItems.Schema')
const PORT = 3000 ;


// Middleware to extract body from the http requests
const bodyParser = require('body-parser')
app.use(bodyParser.json());         // req.body

app.get('/' , (req , res)=>{
    res.send("Hello Welcome to my Restraunt.")
})


// POST route to add a person
app.post('/person' , async (req , res)=>{
    
    try {
        const data = req.body // Assuming that request body contains person data
        const newPerson = new Person(data)  // Instance 

        // Save the newPerson to DB
        const response = await newPerson.save()
        console.log("Data is Saved.");
        
        res.status(201).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
    
})

app.get('/person' , async(req , res)=>{
    try{
            const data = await Person.find()
            console.log("Data is Fetched.");
        res.status(201).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }

})

app.get('/person/:workType' , async(req , res)=>{
    try{
        const workType = req.params.workType ;
        if(workType == "chef" || workType == "manager" || workType == "waiter"){
            const response = await Person.find({work : workType})
            res.status(201).json(response);
        }else{
            console.log("Internal Server Error");
            res.status(400).json("Invalid Worktype.")
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
} )

// POST route to add a Menu:
app.post('/menu' , async (req , res)=>{
    
    try {
        const data = req.body // Assuming that request body contains person data
        const newMenu = new MenuItem(data)  // Instance 

        // Save the newPerson to DB
        const response = await newMenu.save()
        console.log("Data is Saved.");
        
        res.status(201).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
    
})
app.get('/menu' , async(req , res)=>{
    try{
            const data = await MenuItem.find()
            console.log("Data is Fetched.");
        res.status(201).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }

})
app.listen(PORT , ()=>console.log(`Listening on port : ${PORT}`))