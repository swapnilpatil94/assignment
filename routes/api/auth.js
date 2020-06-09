const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const UserModel = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require("config");
// GET /api/auth/

router.get('/', auth, async (req, res, next) => {

    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }

});

// Post /api/auth
// @desc LOGIN USER 


router.post('/', [
    // email 
    check('email', 'Please enter the valid email address')
        .isEmail()
        .normalizeEmail(),

    // Password  
    check('password', 'Password is required')
        .isLength({ min: 6 })
        .trim().exists()

], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: [{ message: "'Invalid credentials'" }] })
    }

    const { email, password } = req.body;   // extracting data from request

    try {
        let user = await UserModel.findOne({ email });

        //See user exist or not 
        if (!user) {
            return res.status(400).
                json({ errors: [{ message: "Invalid Credentials" }] })
        }

        // match user

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({ errors: [{ message: "Invalid Credentials" }] })
        }


        // return json web token

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'),
            {
                expiresIn: 60 * 60 * 90
            },
            (err, token) => {
                if (err) throw err;
                res.send({ token })
            });


        // res.send("user registered successfully");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }




});







module.exports = router;
