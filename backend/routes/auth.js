const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const fetchuser = require('../Middleware/Fetchuser')
const { default: userEvent } = require('@testing-library/user-event')
const JWT_SECRET = "Meetshahnaamtosunahihoga"

router.post('/', [
    body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 5 }),
    body('password', 'enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)

    const secpass = await bcrypt.hash(req.body.password, salt)
    let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
    })
    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    //   res.json(user)
      success = true
    res.send({ success,authtoken })
})

// Authenticate a user

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password Cannot be blank').exists()
], async (req, res) => {
    // If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.return(400).json({ error: 'please login with correct creds' })
        }
        const comparepassword = await bcrypt.compare(password, user.password) 
        if (!comparepassword) {
            success = false
            return res.return(400).json({ success, error: 'please login with correct creds' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success=true
        res.send({ success,authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal error occures')
    }
})

// Fetch data of user
router.post('/fetchuser',fetchuser, async (req, res) => {
    try {
        userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal error occures')
    }
})

module.exports = router