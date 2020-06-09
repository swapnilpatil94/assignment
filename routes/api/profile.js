const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');


const { check, validationResult } = require('express-validator');





// GET ALL profile /api/profile

router.get('/', auth, async (req, res, next) => {
    try {
        const profiles = await User.find().populate('user', ['name', 'avatar', 'email']).select('-password');

        res.json(profiles)

    } catch (error) {
        return res.status(500).send("Server Error ")
    }
})








module.exports = router;
