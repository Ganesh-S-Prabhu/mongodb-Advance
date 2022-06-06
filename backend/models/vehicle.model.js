const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    Vehicle_Name:{type:String,required:true},
    Color:{type:String,required:true},
    Vehicle_Manufacturer:{type:String,required:true},
    Vehicle_Model:{type:String,required:true},
    vehicle_types:{type:String,required:true},
    Price:{type:Number,required:true}
    
},{
    timestamps : true,
    versionKey : false,
})



const vehicle = mongoose.model("vehicles", vehicleSchema)

module.exports = vehicle;
