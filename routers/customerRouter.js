const router = require("express").Router();
const User = require("../models/user");
const Customer = require("../models/customer");
const auth = require("../middleware/auth")

router.post("/", auth, async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.userId })
        const newCustomer = new Customer({
            name: req.body.name,
            createdBy: user.email,
        })
        newCustomer.save();
        res.send("done");
    } catch (err) {
        console.log(err);
        res.send("Error");
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const customer = await Customer.find();
        console.log(customer);
        res.json(customer);
    } catch (err) {
        console.log(err);
        res.send("Error");
    }
});

module.exports = router; 