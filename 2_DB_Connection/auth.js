const Person = require('./models/person.models.schema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Using Passport for Authentication and Authorization: 
// Using local-passport middleware
passport.use(new LocalStrategy(async(USERNAME , PASSWORD , done)=>{
    // Authentication logic: 
    try{
        console.log("Recieved Credentials: " , USERNAME , PASSWORD);
        const user = await Person.findOne({username : USERNAME});
        if(!user){
            return done(null , false , {message : "Incorrect Username"})
        }
        // const isPasswordMatched = user.password === PASSWORD ;
        // After hasing 
        const isPasswordMatched = await user.comparePassword(PASSWORD)
        if(isPasswordMatched){
            return done(null , user)
        }else{
            return done(null , false , {message:"Incorrect Password."})
        }
    }catch(err){
        return done(err);
    }
}))

module.exports = passport