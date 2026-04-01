// ============================================
// ARTICLE ROUTES
// These handle all article-related actions:
// - Get all articles
// - Get one article
// - Create an article
// - Update an article
// - Delete an article
// ============================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Article = require('../models/Article');
const protect = require('../middleware/auth');

// --------------------------------------------
// MULTER SETUP (for image uploads)
// This tells the server WHERE to save uploaded
// images and WHAT to name them
// --------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Create a unique filename: timestamp + original name
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

// Only allow image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB
});

// --------------------------------------------
// ROUTE: Get all articles
// URL: GET /api/articles
// Anyone can access this (no login needed)
// --------------------------------------------
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};

        // If a category was specified, filter by it
        if (category && category !== 'all') {
            filter.category = category;
        }

        // Get articles, newest first
        const articles = await Article.find(filter).sort({ createdAt: -1 });

        res.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Server error while fetching articles' });
    }
});

// --------------------------------------------
// ROUTE: Get a single article by ID
// URL: GET /api/articles/:id
// Anyone can access this
// --------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Server error while fetching article' });
    }
});

// --------------------------------------------
// ROUTE: Create a new article
// URL: POST /api/articles
// Only admin can access this (login required)
// --------------------------------------------
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        const { title, content, category, summary } = req.body;

        // Validate required fields
        if (!title || !content || !category) {
            return res.status(400).json({
                message: 'Please provide title, content, and category'
            });
        }

        const article = new Article({
            title,
            content,
            category,
            summary: summary || '',
            image: req.file ? '/uploads/' + req.file.filename : ''
        });

        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: 'Server error while creating article' });
    }
});

// --------------------------------------------
// ROUTE: Update an article
// URL: PUT /api/articles/:id
// Only admin can access this (login required)
// --------------------------------------------
router.put('/:id', protect, upload.single('image'), async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const { title, content, category, summary } = req.body;

        // Update fields
        article.title = title || article.title;
        article.content = content || article.content;
        article.category = category || article.category;
        article.summary = summary || article.summary;

        // If a new image was uploaded, update it
        if (req.file) {
            article.image = '/uploads/' + req.file.filename;
        }

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: 'Server error while updating article' });
    }
});

// --------------------------------------------
// ROUTE: Delete an article
// URL: DELETE /api/articles/:id
// Only admin can access this (login required)
// --------------------------------------------
router.delete('/:id', protect, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Server error while deleting article' });
    }
});

module.exports = router;