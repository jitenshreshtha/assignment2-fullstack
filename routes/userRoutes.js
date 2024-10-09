const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/g2', async (req,res) =>{
try{
    const {firstname,lastname,license,age,dob,cardetails}= req.body;

    const newUser = new User({
        firstname,
        lastname,
        license,
        age,
        dob,
        cardetails
    })

    const savedUser = await newUser.save();
    console.log('savedUser', savedUser);
}
catch(err){
    console.log(err);
}
})

module.exports = router;