const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserModel = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

// POST /routes/api/user/
// @desc Register User

router.post('/', [
    // name must be present and not null
    check('name', 'Name is required')
        .not()
        .isEmpty()
        .trim(),
    // email 
    check('email', 'Please enter the valid email address')
        .isEmail()
        .normalizeEmail()
        .custom((value, { req }) => {
            return UserModel.findOne({ email: value })
                .then(userdoc => {
                    if (userdoc) {
                        return Promise.reject("User is Already Exists");
                    }
                })
        }),
    // Password  
    check('password', 'Please enter a password with 6 or more character')
        .isLength({ min: 6 })
        .trim()

], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() }); //input validation error
    }

    const { name, email, password } = req.body;   // extracting data from request

    try {
        //See user exist or not 
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ errors: [{ message: "User already exists" }] })
        }
        // Get user Gravatar 
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        // user instance creation

        user = new UserModel({
            name,
            email,
            password,
            avatar,
        });

        // Encrypt password 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);


        // save copy of user in database
        await user.save();

        // return json web token

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'),
            {
                expiresIn: 60 * 60
            },
            (err, token) => {
                if (err) throw err;
                res.send({ token })
            })


        // res.send("user registered successfully");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }




});


module.exports = router;
