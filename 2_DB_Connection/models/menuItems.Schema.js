const mongoose = require('mongoose')


const newMenuItems = new mongoose.Schema({
    name:{
        type : String,
        required : true 
    },
    price:{
        type : Number , 
        required : true 
    },
    taste : {
        type : String , 
        enum : ['sweet' , 'sour' , 'spicy'],
        required : true
    },
    is_drink :{
        type : Boolean ,
        default : false
    },
    ingredients : {
        type: [String],
        default : []
    },
    num_sales: {
        type : String , 
        default : 0 
    }

})

const MenuItem = mongoose.model("MenuItem" , newMenuItems)
module.exports = MenuItem