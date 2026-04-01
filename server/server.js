const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // ← THIS LINE WAS MISSING!

const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/health', function(req, res) {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);

app.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'index.html'));
});

app.get('/article.html', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

app.get('/article', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'article.html'));
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

var PORT = process.env.PORT || 5000;

console.log('');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'MISSING');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'MISSING');
console.log('PORT:', PORT);
console.log('');

connectDB().then(function() {
    app.listen(PORT, '0.0.0.0', function() {
        console.log('');
        console.log('Yogentix Server Started!');
        console.log('Port: ' + PORT);
        console.log('');
    });
}).catch(function(err) {
    console.error('Failed to start:', err.message);
    process.exit(1);
});