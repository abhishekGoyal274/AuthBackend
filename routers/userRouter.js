const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user");
const { application } = require("express");

//register
router.post("/", async (req, res) => {
    console.log("here");
    try {

        const { email, password, passwordVerify } = req.body;
        // console.log(email, password, passwordVerify);

        //Validation
        if (!email || !password || !passwordVerify)
            return res.status(400).json({ errorMessage: "Please enter all fields" });
        if (password.lenght < 8)
            return res
                .status(400)
                .json({ errorMessage: "Passsword length less than 8" });
        if (password !== passwordVerify)
            return res.status(400).json({ errorMessage: "Enter same password" });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errorMessage: "account with this email already exists!" })
        }


        // Hashing password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //New user create
        const newUser = new User({
            email,
            passwordHash
        })

        const createdUser = await newUser.save();

        //Login the user
        const token = jwt.sign({ user: createdUser._id }, process.env.JWT_SECRET)
        // console.log(token);


        // Response
        res.cookie("token", token, {
            httpOnly: true,
        }).send();
    }
    //Error in post request
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ errorMessage: "Please enter both, email and password." });

        const userExist = await User.findOne({ email });
        if (!userExist)
            return res.status(401).json({ errorMessage: "No Account related to this email." });

        const userPassword = userExist.passwordHash;
        const match = await bcrypt.compare(password, userPassword);
        if (!match)
            return res.status(400).json({ errorMessage: "Invalid Credentials" });

        const token = jwt.sign({ user: userExist._id }, process.env.JWT_SECRET);
        console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
        }).send()
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }

});

//logout 
router.get("/logout", (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        }).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("Some Error Occurred");
    }
})

router.get("*", (req, res) => {
    res.status(400).json({ errorMessage: "No such route." });
})
router.post("*", (req, res) => {
    res.status(400).json({ errorMessage: "No such route." });
})

router.get("/loggedIn", (req, res) => {
    try {
        if (!req.cookies.token) return res.json(false);
        jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        res.json(true);
    } catch (err) {
        console.log(err);
        return res.json(false);
    }

})

module.exports = router;
