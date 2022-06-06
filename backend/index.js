const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const vehiclecontroller=require("./controllers/vehicle.controller")


const app = express();
const PORT = 9000;
app.use(express.json());
app.use(cors());

app.use("/vehicles",vehiclecontroller)


try{
    app.listen(PORT, () => {
        connectDB();
        console.log(`http://localhost:${PORT}`);
      });
}catch(err){
    console.log(err)
}