const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const personSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true 
    },
    age : {
        type : Number , 
        required : true 
    },
    work : {
        type : String,
        enum : ["chef" , "waiter" , "manager"],
        required : true 
    },
    mobile:{
        type :String , 
        required : true
    },
    email : {
        type : String,
        required : true , 
        unique : true 
    },
    salary : {
        type : Number,
        required : true 
    },
    username : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
})

personSchema.pre('save' , async function(next){
    const person = this 
    // Hash the password only if it has been modified (or is new)
    // Example : changing Salary not password
    if(!person.isModified('password')) return next()

    try{
        // hash password generation
        // const salt = "Adding salt"
        const salt = await bcrypt.genSalt(10);  // Adding Salt

        //hash password: 
        const hashedPassword = await bcrypt.hash(person.password , salt);

        person.password = hashedPassword ;
        next();

    }catch(err){
        return next(err);
    }
})
// Now go to auth.js
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword , this.password)
        return isMatch ;
    }catch(err){
        throw err ;
    }
}

// ravi --> bdhsxzjhdcnsjkdhzxdnkj
// login --> Ravendra

// bdhsxzjhdcnsjkdhzxdnkj --> extract salt
// salt + Ravendra = xjsakzdxmlkaxsjjzdxks

const Person = mongoose.model('Person' , personSchema);
module.exports = Person ;