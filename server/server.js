// ============================================
// MAIN SERVER FILE — Production Ready
// ============================================

const path = require('path');
const dotenv = require('dotenv');

// Load .env file (only works locally, Railway uses its own env vars)
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
app.use(express.static(path.join(__dirname, '..', 'public')));

// ============================================
// API ROUTES
// ============================================
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);

// ============================================
// SERVE FRONTEND PAGES
// ============================================
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'index.html'));
});

app.get('/article', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

app.get('/article.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

// Homepage (catch-all - must be LAST)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log('');
        console.log('🌿 ================================');
        console.log('🌿  Yogentix Server Started!');
        console.log('🌿 ================================');
        console.log('🌐 Running on port: ' + PORT);
        console.log('🌐 Environment: ' + (process.env.RAILWAY_ENVIRONMENT || 'local'));
        console.log('');
    });
}).catch((err) => {
    console.error('Failed to start:', err.message);
});