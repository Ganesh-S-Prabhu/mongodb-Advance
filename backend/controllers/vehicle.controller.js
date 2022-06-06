const vehicle=require("../models/vehicle.model")
const express=require("express")

const router = express.Router();

router.get("",async(req,res)=>{
    try{
        // console.log(req.query)
        let sortby=["_id",1] 
        if(req.query.sortby){
           var sort=req.query.sortby.trim().split(":");
        }
        
       if(sort){
           sortby[0]=sort[0]
           sortby[1]=sort[1]
       }
// console.log(sortby);
        
        let query={
            $and:[],
        };

        if(req.query.name){
            query.$and.push( 
                {"Vehicle_Name": { $regex: req.query.name, $options:"i"}}
            )
        }
       
        if(req.query.model){
            query.$and.push( {"Vehicle_Model":{$regex:req.query.model, $options:"i"}})
        }
        if(req.query.color){
            query.$and.push( {"Color":{$regex:req.query.color, $options:"i"}})
        }
        if(req.query.manufacturer){
            query.$and.push( {"Vehicle_Manufacturer":{$regex:req.query.manufacturer, $options:"i"}})
        }
        if(req.query.types){
            query.$and.push( {"vehicle_types":{$regex:req.query.types, $options:"i"}})
        }
        // console.log(query.$and)
        let page=(req.query.page)||1
        let limit=req.query.limit||10

        // let count=await vehicle.find().count()

        if(query.$and.length!=0){
             vehicles=await vehicle.find(query).sort([[sortby[0], sortby[1]]])
        .limit(limit).skip((page-1)*limit)
        .lean().exec();
        }
        
        else{
             vehicles=await vehicle.find()
        .limit(limit).skip((page-1)*limit).sort([[sortby[0], sortby[1]]])
        .lean().exec();
        }
        let count=await vehicle.find().count();
        count=Math.ceil(count/limit)
          res.status(201).send({count:count,vehicles:vehicles});
    }catch(err){
        res.status(400).send({message : err.message})
    }
})

module.exports=router