const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  license: { type: Number, required: true },
  age: {type:Number, required: true},
  dob:{type: Date,required:true},
  cardetails: {
    make: {type:String, required:true},
    model: {type:String, required: true},
    year: {type:Number, required: true},
    plate: {type:String, required:true},
  },
});

const User = new mongoose.model('User',userSchema);

module.exports = User;
