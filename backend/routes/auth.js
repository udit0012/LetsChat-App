const express = require("express");
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcyrpt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const jwt_key = process.env.JWT_SECRET

router.post('/register', [
    body("username", "username must be 3+ characters").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('phoneno', "enter a valid phoneno").isMobilePhone(),
    body("password", "password must be 6+ characters").isLength({ min: 6 }),
], async (req, res) => {

    try {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        let user = await User.findOne({ $or: [{ email: req.body.email }, { phoneno: req.body.phoneno }] })
        if (user) {
            return res.status(400).json({success, error: "User already exists" })
        }
        const salt = await bcyrpt.genSalt(10);
        const secpass = await bcyrpt.hash(req.body.password, salt)
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            phoneno: req.body.phoneno,
            password: secpass,
            pic: req.body.pic
        });
        const data = {
            user: {
                id: user.id                
            }
        }
        const authtoken = jwt.sign(data, jwt_key)
        success = true
        res.json({success, authtoken })
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }

})
const ValidateEmail = (email) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}
const phonenumber = (phone) => {
    let phoneno = /^\d{10}$/;
    if (phone.match(phoneno)){
        return true;
    }
    else {
        return false;
    }
}


router.post('/login', [
    body("password", "Please enter the password").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let success = false
        const { emailphone, password } = req.body
        let user;
        if (ValidateEmail(emailphone)) {
            user = await User.findOne({ email: emailphone })
        }
        if (phonenumber(emailphone)) {
            user = await User.findOne({ phoneno: emailphone })
        }
        if (!user) {
            return res.status(400).json({success, error: "Invalid credentials" })
        }
        const passcompare = await bcyrpt.compare(password, user.password)
        if (!passcompare) {
            return res.status(400).json({success, error: "Invalid Credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_key)
        success=true
        res.json({success, authtoken })
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }

})

router.get('/getUser', fetchuser, async (req, res) => {

    try {
        userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }

})

module.exports = router