const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/g2", async (req, res) => {
  try {
    const { firstname, lastname, license, age, dob, cardetails } = req.body;

    const newUser = new User({
      firstname,
      lastname,
      license,
      age,
      dob,
      cardetails,
    });

    const savedUser = await newUser.save();
    // console.log("savedUser", savedUser);
    res.redirect(`/g?license=${license}`);
  } catch (err) {
    console.log(err);
  }
});

router.get("/g/search", async (req, res) => {
  try {
    const license  = req.query.license;
    console.log(license);
    const user = await User.findOne({ license });
    if (user) {
      res.render("pages/g/search", { user });
      console.log(user);
    } else {
      res.render("pages/g/search", { user: null });
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    // res.render("pages/g", { user: null });
  }
});
// router.get("/g/:license", async (req, res) => {
//   const { license } = req.params;
//   try {
//     const user = await User.findOne({ license: license });
//     if (!user) {
//       return res.send("No user found");
//     }
//     res.render("pages/g", { user });
//   } catch (err) {
//     console.log(err);
//     res.send("Error fetching data", err);
//   }
// });

router.post("/g/update/:license", async (req, res) => {
  const { license } = req.params;
  const { make, model, year, plate } = req.body;

  try {
    const user = await User.findOne({ license: license });
    if (!user) {
      return res.send("no user found");
    }

    user.cardetails.make = make;
    user.cardetails.model = model;
    user.cardetails.year = year;
    user.cardetails.plate = plate;

    const updatedUser = await user.save();
    console.log("updatedUser:", updatedUser);

    res.redirect(`/g?license=${license}`);
  } catch (err) {
    console.log(err);
    res.send("Error updating car details");
  }
});

module.exports = router;
