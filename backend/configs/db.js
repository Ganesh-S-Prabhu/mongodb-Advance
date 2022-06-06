const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ganesh:ganesh@cluster0.ohzhp.mongodb.net/vehicle_Database?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.log(error);
  }
};
// vehicle_Database
module.exports = connectDB;
