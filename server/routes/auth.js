// ============================================
// AUTH ROUTES
// These handle admin login and setup
// ============================================

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --------------------------------------------
// Helper function: Generate a JWT token
// --------------------------------------------
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// --------------------------------------------
// ROUTE: Login
// URL: POST /api/auth/login
// --------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Please provide username and password'
            });
        }

        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user._id,
                username: user.username,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// --------------------------------------------
// ROUTE: Setup (Create the first admin user)
// URL: POST /api/auth/setup
// --------------------------------------------
router.post('/setup', async (req, res) => {
    try {
        // First, delete any existing users (clean start)
        await User.deleteMany({});
        console.log('🗑️  Cleared old users');

        // Create the admin user
        const user = new User({
            username: process.env.ADMIN_USERNAME || 'admin',
            password: process.env.ADMIN_PASSWORD || 'admin123'
        });

        const savedUser = await user.save();
        console.log('✅ Admin user created:', savedUser.username);

        res.status(201).json({
            message: 'Admin user created successfully!',
            username: savedUser.username
        });
    } catch (error) {
        console.error('Setup error:', error.message);
        res.status(500).json({ 
            message: 'Server error during setup',
            error: error.message 
        });
    }
});

module.exports = router;