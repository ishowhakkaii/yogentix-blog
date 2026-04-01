// ============================================
// MAIN SERVER FILE — Production Ready
// ============================================

const path = require('path');
const dotenv = require('dotenv');

// Load .env for local development
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

// Serve static files from 'public' and 'uploads'
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

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

app.get('/article.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

// Homepage (catch-all - must be LAST)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // <<< CORRECTED LINE!
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
        console.log('');
    });
}).catch((err) => {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
});