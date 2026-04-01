// ============================================
// MAIN SERVER FILE — Production Ready
// ============================================

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');

const app = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// ============================================
// API ROUTES
// ============================================
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);

// ============================================
// SERVE FRONTEND PAGES (explicit routes FIRST)
// ============================================

// Admin page
app.get('/admin', (req, res) => {
    console.log('📍 Admin page requested');
    const adminPath = path.join(__dirname, '..', 'public', 'admin', 'index.html');
    console.log('📍 Looking for:', adminPath);
    res.sendFile(adminPath, (err) => {
        if (err) {
            console.error('❌ Admin file error:', err.message);
            res.status(404).send('Admin page not found. File: ' + adminPath);
        }
    });
});

// Article page
app.get('/article.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

app.get('/article', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Homepage (catch-all - MUST be last)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;

console.log('');
console.log('🔍 Environment Check:');
console.log('   PORT:', PORT);
console.log('   MONGO_URI:', process.env.MONGO_URI ? 'Set ✅' : 'MISSING ❌');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? 'Set ✅' : 'MISSING ❌');
console.log('   Admin HTML path:', path.join(__dirname, '..', 'public', 'admin', 'index.html'));
console.log('');

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log('');
        console.log('🌿 ================================');
        console.log('🌿  Yogentix Server Started!');
        console.log('🌿 ================================');
        console.log('🌐 Running on port: ' + PORT);
        console.log('');
    });
}).catch((err) => {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
});