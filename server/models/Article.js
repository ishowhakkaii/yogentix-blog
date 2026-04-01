// ============================================
// ARTICLE MODEL
// This defines what an article looks like
// in our database
// ============================================

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['yoga', 'herbs', 'wellness']
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Admin'
    },
    summary: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;