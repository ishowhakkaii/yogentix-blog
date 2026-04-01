// ============================================
// YOGENTIX WELLNESS BLOG — Main JavaScript
// ============================================

const API_URL = '/api';
let currentCategory = 'all';

// ============================================
// 1. LOAD ARTICLES
// ============================================
async function loadArticles(category) {
    if (category === undefined) category = 'all';
    var grid = document.getElementById('articlesGrid');
    var loading = document.getElementById('loading');
    var noArticles = document.getElementById('noArticles');

    grid.innerHTML = '';
    loading.style.display = 'block';
    noArticles.style.display = 'none';

    try {
        var url = API_URL + '/articles';
        if (category && category !== 'all') {
            url += '?category=' + category;
        }

        var response = await fetch(url);
        var articles = await response.json();

        loading.style.display = 'none';

        // Update article count in hero
        var countEl = document.getElementById('articleCount');
        if (countEl && category === 'all') {
            countEl.textContent = articles.length;
        }

        if (articles.length === 0) {
            noArticles.style.display = 'block';
            return;
        }

        articles.forEach(function(article, index) {
            grid.innerHTML += createArticleCard(article, index);
        });

    } catch (error) {
        console.error('Error loading articles:', error);
        loading.style.display = 'none';
        noArticles.style.display = 'block';
    }
}

// ============================================
// 2. CREATE ARTICLE CARD
// ============================================
function createArticleCard(article, index) {
    var date = new Date(article.createdAt);
    var formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    var emoji = '🌿';
    if (article.category === 'yoga') emoji = '🧘';
    else if (article.category === 'herbs') emoji = '🌱';
    else if (article.category === 'wellness') emoji = '✨';

    var summary = article.summary || article.content.substring(0, 140) + '...';

    var imageHTML = '';
    if (article.image) {
        imageHTML = '<img src="' + article.image + '" alt="' + article.title + '" loading="lazy">';
    } else {
        imageHTML = '<div class="article-placeholder-img">' + emoji + '</div>';
    }

    return ''
        + '<article class="article-card" style="animation-delay:' + (index * 0.1) + 's" onclick="goToArticle(\'' + article._id + '\')">'
        + '<div class="article-card-image">'
        +   imageHTML
        +   '<span class="category-badge">' + emoji + ' ' + article.category + '</span>'
        + '</div>'
        + '<div class="article-card-body">'
        +   '<p class="article-card-date">📅 ' + formattedDate + '</p>'
        +   '<h3 class="article-card-title">' + article.title + '</h3>'
        +   '<p class="article-card-summary">' + summary + '</p>'
        +   '<div class="article-card-footer">'
        +     '<span class="read-more">Read Article <span class="read-more-arrow">→</span></span>'
        +   '</div>'
        + '</div>'
        + '</article>';
}

// ============================================
// 3. NAVIGATE TO ARTICLE
// ============================================
function goToArticle(id) {
    window.location.href = '/article.html?id=' + id;
}

// ============================================
// 4. FILTER BUTTONS
// ============================================
function setupFilterButtons() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            loadArticles(currentCategory);
        });
    });
}

// ============================================
// 5. CATEGORY CARDS
// ============================================
function setupCategoryCards() {
    var cards = document.querySelectorAll('.category-card');
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            var category = card.getAttribute('data-category');
            currentCategory = category;

            var filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(function(btn) {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                }
            });

            loadArticles(category);
            document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ============================================
// 6. CATEGORY LINKS
// ============================================
function setupCategoryLinks() {
    var links = document.querySelectorAll('.category-link');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var category = link.getAttribute('data-category');
            currentCategory = category;

            var navLinks = document.getElementById('navLinks');
            if (navLinks) navLinks.classList.remove('open');

            var filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(function(btn) {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                }
            });

            loadArticles(category);
            setTimeout(function() {
                document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    });
}

// ============================================
// 7. NAVBAR SCROLL
// ============================================
function setupNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// 8. MOBILE MENU
// ============================================
function setupMobileMenu() {
    var menuBtn = document.getElementById('mobileMenuBtn');
    var navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
        var links = navLinks.querySelectorAll('.nav-link');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        });
    }
}

// ============================================
// 9. INIT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    setupFilterButtons();
    setupCategoryCards();
    setupCategoryLinks();
    setupNavbarScroll();
    setupMobileMenu();
});