const express  = require('express');
const PORT = 3000 ;
// For my understanding :=> express : class , app : instance/object
const app = express();


// Collection of endpoints : API
// Endpoints : 
app.get('/' , (req , res)=>{
    res.send("Hello Welcome to my Restraunt.")
})
app.get('/dosa' , (req , res)=>{
    res.send("South Indian Special.")
})


app.listen(PORT , ()=>console.log(`Listening on port : ${PORT}`))