const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItems.Schema')


// POST route to add a Menu:
router.post('/' , async (req , res)=>{
    
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
router.get('/' , async(req , res)=>{
    try{
            const data = await MenuItem.find()
            console.log("Data is Fetched.");
        res.status(201).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }

})
router.get('/:tasteType' , async(req , res)=>{
    try{
        const tasteType = req.params.tasteType ;
        if(tasteType == "sour" || tasteType == "spicy" || tasteType == "sweet"){
            const response = await MenuItem.find({taste : tasteType})
            res.status(201).json(response);
        }else{
            console.log("Internal Server Error");
            res.status(400).json("Invalid tasteType.")
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
} )

router.patch('/:id' , async (req ,res)=>{

    //Case 1 : If Person found
    try{
        const menuItemId = req.params.id ;
        const updatedData = req.body ;

        const response  = await MenuItem.findByIdAndUpdate(menuItemId , updatedData , {
            new : true ,        //return updated person
            runValidators : true    // run mongoose validation
        })
        console.log("Data Updated");
        res.status(201).json(response);
        // Case 3 : If person is not found
        if(!response){
            return res.status(404).json({error : "Menu Items not found."})
        }
    }
    // Case 2 : If some error occured
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
})

router.delete('/:id' , async(req , res)=>{
    try{
        const menuItemId = req.params.id ;
        const response = await MenuItem.findByIdAndDelete(menuItemId);

        if(!response){
            return res.status(404).json({error : "Menu Item not found."})
        }
        console.log("Data Deleted");
        
        res.status(201).json({message : "Menu Item Data deleted"})
    }catch(err){

        console.log(err);
        res.status(500).json({error : "Internal Server error"})
    }
})
module.exports = router;