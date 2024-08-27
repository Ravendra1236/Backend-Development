const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware , generateToken} = require('../jwt')
const Person = require('../models/person.models.schema')

// POST route to add a person
router.post('/signup' , async (req , res)=>{
    
    try {
        const data = req.body // Assuming that request body contains person data
        const newPerson = new Person(data)  // Instance 

        // Save the newPerson to DB
        const response = await newPerson.save()
        console.log("Data is Saved.");
        
        // Creating token with the help of payLoad(username)
        // const token = generateToken(response.username);
        const payload = {
            id : response.id,
            username: response.username
        }
        const token = generateToken(payload);
        
        console.log("Token is: " , token);
        
        res.status(201).json({response : response , token : token})

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
    
})
// Login Route: For Token
router.post('/login' , async(req , res)=>{
    try{
        const {username , password} = req.body

        // find the user by its username and password
        const user = await Person.findOne({username:username})

        // If user does not exist in our DB or password is incorrect:
        if(!(user) || !(await user.comparePassword(password))){
            return res.status(401).json({error : "Invalid username or password"})
        }
        //Generate tokens: 
        const payload  = {
            id : user.id ,
            username : user.username
        }

        const token = generateToken(payload)
        //return token
        res.json(token)
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Internal Server Error."})
    }
})

// HWT Auth used : we can get data by token
router.get('/' , async(req , res)=>{
    try{
            const data = await Person.find()
            console.log("Data is Fetched.");
        res.status(201).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }

})

router.get('/:workType' , async(req , res)=>{
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

router.patch('/:pid' , async (req ,res)=>{

    //Case 1 : If Person found
    try{
        const personId = req.params.pid ;
        const updatedData = req.body ;

        const response  = await Person.findByIdAndUpdate(personId , updatedData , {
            new : true ,        //return updated person
            runValidators : true    // run mongoose validation
        })
        console.log("Data Updated");
        res.status(201).json(response);
        // Case 3 : If person is not found
        if(!response){
            return res.status(404).json({error : "Person not found."})
        }
    }
    // Case 2 : If some error occured
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
})

router.delete('/:pid' , async(req , res)=>{
    try{
        const personId = req.params.pid ;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error : "Person not found."})
        }
        console.log("Data Deleted");
        
        res.status(201).json({message : "Person Data deleted"})
    }catch(err){

        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
})
module.exports = router ;
