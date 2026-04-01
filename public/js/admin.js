// ============================================
// YOGENTIX ADMIN DASHBOARD — JavaScript
// ============================================

const API_URL = '/api';
let authToken = localStorage.getItem('yogentix_token') || '';
let deleteArticleId = '';

// ============================================
// 1. CHECK IF ALREADY LOGGED IN
// ============================================
function checkAuth() {
    if (authToken) {
        showDashboard();
        loadAdminArticles();
    }
}

// ============================================
// 2. LOGIN
// ============================================
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var loginBtn = document.getElementById('loginBtn');
    var loginError = document.getElementById('loginError');

    loginBtn.textContent = 'Signing in...';
    loginBtn.disabled = true;
    loginError.style.display = 'none';

    try {
        var response = await fetch(API_URL + '/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        });

        var data = await response.json();

        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('yogentix_token', authToken);
            showDashboard();
            loadAdminArticles();
        } else {
            loginError.style.display = 'flex';
            document.getElementById('loginErrorText').textContent = data.message || 'Invalid credentials';
        }
    } catch (error) {
        loginError.style.display = 'flex';
        document.getElementById('loginErrorText').textContent = 'Connection error. Please try again.';
    }

    loginBtn.textContent = 'Sign In';
    loginBtn.disabled = false;
});

// ============================================
// 3. SHOW / HIDE DASHBOARD
// ============================================
function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
}

function logout() {
    authToken = '';
    localStorage.removeItem('yogentix_token');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// ============================================
// 4. LOAD ARTICLES FOR ADMIN TABLE
// ============================================
async function loadAdminArticles() {
    var tbody = document.getElementById('articlesTableBody');
    var loading = document.getElementById('adminLoading');
    var noData = document.getElementById('noData');

    tbody.innerHTML = '';
    loading.style.display = 'block';
    noData.style.display = 'none';

    try {
        var response = await fetch(API_URL + '/articles');
        var articles = await response.json();

        loading.style.display = 'none';

        // Update stats
        document.getElementById('totalArticles').textContent = articles.length;
        document.getElementById('yogaCount').textContent = articles.filter(function(a) { return a.category === 'yoga'; }).length;
        document.getElementById('herbsCount').textContent = articles.filter(function(a) { return a.category === 'herbs'; }).length;
        document.getElementById('wellnessCount').textContent = articles.filter(function(a) { return a.category === 'wellness'; }).length;

        if (articles.length === 0) {
            noData.style.display = 'block';
            return;
        }

        articles.forEach(function(article) {
            var date = new Date(article.createdAt);
            var formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            var emoji = '🌿';
            if (article.category === 'yoga') emoji = '🧘';
            else if (article.category === 'herbs') emoji = '🌱';
            else if (article.category === 'wellness') emoji = '✨';

            var thumbHTML = '';
            if (article.image) {
                thumbHTML = '<img src="' + article.image + '" alt="">';
            } else {
                thumbHTML = '<div class="table-article-thumb-placeholder">' + emoji + '</div>';
            }

            var row = ''
                + '<tr>'
                + '<td>'
                + '  <div class="table-article-info">'
                + '    <div class="table-article-thumb">' + thumbHTML + '</div>'
                + '    <span class="table-article-title">' + article.title + '</span>'
                + '  </div>'
                + '</td>'
                + '<td><span class="table-category-badge">' + emoji + ' ' + article.category + '</span></td>'
                + '<td>' + formattedDate + '</td>'
                + '<td>'
                + '  <div class="table-actions">'
                + '    <button class="action-btn action-btn-edit" onclick="editArticle(\'' + article._id + '\')">Edit</button>'
                + '    <button class="action-btn action-btn-delete" onclick="openDeleteModal(\'' + article._id + '\')">Delete</button>'
                + '  </div>'
                + '</td>'
                + '</tr>';

            tbody.innerHTML += row;
        });

    } catch (error) {
        console.error('Error loading articles:', error);
        loading.style.display = 'none';
        noData.style.display = 'block';
    }
}

// ============================================
// 5. CREATE / UPDATE ARTICLE
// ============================================
document.getElementById('articleForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    var articleId = document.getElementById('editArticleId').value;
    var submitBtn = document.getElementById('submitBtn');

    var articleData = {
        title: document.getElementById('articleTitle').value,
        category: document.getElementById('articleCategory').value,
        author: document.getElementById('articleAuthor').value || 'Yogentix Team',
        image: document.getElementById('articleImage').value,
        summary: document.getElementById('articleSummary').value,
        content: document.getElementById('articleContent').value
    };

    submitBtn.textContent = articleId ? 'Updating...' : 'Publishing...';
    submitBtn.disabled = true;

    try {
        var url = API_URL + '/articles';
        var method = 'POST';

        if (articleId) {
            url = API_URL + '/articles/' + articleId;
            method = 'PUT';
        }

        var response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(articleData)
        });

        var data = await response.json();

        if (response.ok) {
            showToast('✅', articleId ? 'Article updated successfully!' : 'Article published successfully!');
            resetForm();
            showSection('articles-section', document.querySelector('[data-section="articles-section"]'));
            loadAdminArticles();
        } else {
            showToast('❌', data.message || 'Failed to save article');
        }
    } catch (error) {
        showToast('❌', 'Connection error. Please try again.');
    }

    submitBtn.textContent = articleId ? 'Update Article' : 'Publish Article';
    submitBtn.disabled = false;
});

// ============================================
// 6. EDIT ARTICLE
// ============================================
async function editArticle(id) {
    try {
        var response = await fetch(API_URL + '/articles/' + id);
        var article = await response.json();

        document.getElementById('editArticleId').value = article._id;
        document.getElementById('articleTitle').value = article.title;
        document.getElementById('articleCategory').value = article.category;
        document.getElementById('articleAuthor').value = article.author || '';
        document.getElementById('articleImage').value = article.image || '';
        document.getElementById('articleSummary').value = article.summary || '';
        document.getElementById('articleContent').value = article.content;

        document.getElementById('formTitle').textContent = '✏️ Edit Article';
        document.getElementById('submitBtn').textContent = 'Update Article';

        showSection('create-section', document.querySelector('[data-section="create-section"]'));
    } catch (error) {
        showToast('❌', 'Failed to load article for editing');
    }
}

// ============================================
// 7. DELETE ARTICLE
// ============================================
function openDeleteModal(id) {
    deleteArticleId = id;
    document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
    deleteArticleId = '';
    document.getElementById('deleteModal').style.display = 'none';
}

async function confirmDelete() {
    if (!deleteArticleId) return;

    try {
        var response = await fetch(API_URL + '/articles/' + deleteArticleId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        });

        if (response.ok) {
            showToast('✅', 'Article deleted successfully!');
            loadAdminArticles();
        } else {
            showToast('❌', 'Failed to delete article');
        }
    } catch (error) {
        showToast('❌', 'Connection error');
    }

    closeDeleteModal();
}

// ============================================
// 8. NAVIGATION
// ============================================
function showSection(sectionId, btn) {
    // Hide all sections
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function(s) { s.style.display = 'none'; });

    // Show selected section
    document.getElementById(sectionId).style.display = 'block';

    // Update sidebar active state
    var sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
    if (btn) btn.classList.add('active');

    // Update page title
    var pageTitle = document.getElementById('pageTitle');
    if (sectionId === 'articles-section') {
        pageTitle.textContent = 'All Articles';
    } else {
        var formTitle = document.getElementById('formTitle').textContent;
        pageTitle.textContent = formTitle.includes('Edit') ? 'Edit Article' : 'Create Article';
    }

    // Close mobile sidebar
    document.querySelector('.sidebar').classList.remove('open');
}

function resetForm() {
    document.getElementById('articleForm').reset();
    document.getElementById('editArticleId').value = '';
    document.getElementById('articleAuthor').value = 'Yogentix Team';
    document.getElementById('formTitle').textContent = '✍️ Create New Article';
    document.getElementById('submitBtn').textContent = 'Publish Article';
}

// ============================================
// 9. TOAST NOTIFICATION
// ============================================
function showToast(icon, message) {
    var toast = document.getElementById('toast');
    document.getElementById('toastIcon').textContent = icon;
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// 10. MOBILE SIDEBAR
// ============================================
var mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
if (mobileSidebarBtn) {
    mobileSidebarBtn.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('open');
    });
}

// ============================================
// 11. START
// ============================================
checkAuth();