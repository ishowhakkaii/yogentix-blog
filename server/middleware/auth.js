// ============================================
// AUTH MIDDLEWARE
// This is the "security guard" that checks
// if someone is logged in before allowing
// them to create/edit/delete articles
// ============================================

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check if a token was sent in the request header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token is real and valid
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user info to the request
            req.userId = decoded.id;

            // Let the request continue
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;