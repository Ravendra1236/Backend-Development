const mongoose = require('mongoose')

// Define the MongoDB connection URL : 


// Try to use 127.0.0.1 as localhost 
// Switching from `localhost` to `127.0.0.1` works because some systems resolve `localhost` to the IPv6 address `::1` instead of the IPv4 address `127.0.0.1`. If MongoDB is not configured to listen on IPv6, the connection would fail, leading to the issue you experienced. By explicitly using `127.0.0.1`, you ensure the connection uses IPv4, which resolved the problem.
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'// Replace myDatabase with your DB name


// Connection using mongoDB server

// mongoose.connect(mongoURL , {
//     useNewURlParser : true ,
//     useUnifiedTopology : true
// })

mongoose.connect(mongoURL)


// Mongoose maintains a default connection object corresponding MongoDB connection
// This object is used in interacting with DB
const db = mongoose.connection ;  

// Event Listeners for DB connection: 
db.on('connected' , ()=>{
    console.log("DB Connected");
    
})

db.on('error' , (err)=>{
    console.log("MongoDB connection error" , err);
    
})
db.on('disconnected' , ()=>{
    console.log("MongoDB disconnected.");
    
})

// Export this connection 
module.exports = db;




