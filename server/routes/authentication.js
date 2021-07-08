const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Import user model 
const User = require('../models/User');


/**
 * @route POST api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // simple validation
    if (!username || !password) {
        return res.status(400)
            .json({
                success: false,
                message: "Missing username or password"
            }
            );
    }

    // if inputs are provided, try to find the username in database
    try {
        const user = await User.findOne({ username });

        // If username has already been taken, notify the user
        if (user) {
            return res.status(400).json({
                success: false,
                message: "username has already been taken"
            });
        }

        // If username has not been taken, hash the password
        const hashedPassword = await argon2.hash(password);

        // Create a new user with 2 properties
        const newUser = new User({ username, password: hashedPassword });

        // Save the user to DB
        await newUser.save();

        // Return a token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            message: "Successfully registered",
            accessToken
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

/**
 * @route POST api/auth/login
 * @desc Login
 * @access Public
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // simple validation
    if (!username || !password) {
        return res.status(400)
            .json({
                success: false,
                message: "Missing username or password"
            }
            );
    }

    try {
        //check for existing user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect login information"
            }
            )
        }

        const isPasswordCorrect = await argon2.verify(user.password, password);
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect login information"
            });
        }

        // Correct login info
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return res.json({
            success: true,
            message: "Successfully login",
            accessToken
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }




});


module.exports = router;