const fs = require('fs');
const path = require('path');

// ============================================
// This script creates the admin panel files
// ============================================

// Make sure directories exist
const dirs = [
    'public/admin',
    'public/admin/css',
    'public/admin/js'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log('Created directory:', dir);
    }
});

// ============================================
// ADMIN HTML
// ============================================
const adminHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Yogentix</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/admin/css/admin.css">
</head>
<body>

    <!-- LOGIN PAGE -->
    <div class="login-page" id="loginPage">
        <div class="login-container">
            <div class="login-card">
                <div class="login-header">
                    <div class="login-logo">
                        <div class="logo-mark">Y</div>
                        <span class="logo-text">Yogentix</span>
                    </div>
                    <h1 class="login-title">Admin Dashboard</h1>
                    <p class="login-subtitle">Sign in to manage your articles</p>
                </div>
                <form class="login-form" id="loginForm">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required>
                    </div>
                    <div class="login-error" id="loginError" style="display:none;">
                        <span>&#10060;</span> <span id="loginErrorText">Invalid credentials</span>
                    </div>
                    <button type="submit" class="login-btn" id="loginBtn">Sign In</button>
                </form>
                <a href="/" class="back-to-site">&#8592; Back to website</a>
            </div>
        </div>
    </div>

    <!-- DASHBOARD -->
    <div class="dashboard" id="dashboard" style="display:none;">

        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <a href="/" class="logo">
                    <div class="logo-mark">Y</div>
                    <span class="logo-text">Yogentix</span>
                </a>
            </div>
            <nav class="sidebar-nav">
                <button class="sidebar-link active" data-section="articles-section" onclick="showSection('articles-section', this)">
                    <span class="sidebar-icon">&#128196;</span>
                    All Articles
                </button>
                <button class="sidebar-link" data-section="create-section" onclick="showSection('create-section', this)">
                    <span class="sidebar-icon">&#9997;&#65039;</span>
                    Create Article
                </button>
            </nav>
            <div class="sidebar-footer">
                <a href="/" class="sidebar-link" target="_blank">
                    <span class="sidebar-icon">&#127760;</span>
                    View Website
                </a>
                <button class="sidebar-link logout-link" onclick="logout()">
                    <span class="sidebar-icon">&#128682;</span>
                    Logout
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">

            <header class="topbar">
                <div class="topbar-left">
                    <button class="mobile-sidebar-btn" id="mobileSidebarBtn">&#9776;</button>
                    <h2 class="page-title" id="pageTitle">All Articles</h2>
                </div>
                <div class="topbar-right">
                    <span class="admin-badge">&#128100; Admin</span>
                </div>
            </header>

            <!-- Articles Section -->
            <section class="content-section" id="articles-section">
                <div class="section-top">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">&#128196;</div>
                            <div class="stat-info">
                                <span class="stat-number" id="totalArticles">0</span>
                                <span class="stat-label">Total Articles</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">&#129496;</div>
                            <div class="stat-info">
                                <span class="stat-number" id="yogaCount">0</span>
                                <span class="stat-label">Yoga</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">&#127793;</div>
                            <div class="stat-info">
                                <span class="stat-number" id="herbsCount">0</span>
                                <span class="stat-label">Herbs</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">&#10024;</div>
                            <div class="stat-info">
                                <span class="stat-number" id="wellnessCount">0</span>
                                <span class="stat-label">Wellness</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="articles-table-container">
                    <table class="articles-table" id="articlesTable">
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="articlesTableBody"></tbody>
                    </table>
                    <div class="loading" id="adminLoading">
                        <div class="spinner"></div>
                        <p>Loading articles...</p>
                    </div>
                    <div class="no-data" id="noData" style="display:none;">
                        <p>No articles yet. Create your first one!</p>
                    </div>
                </div>
            </section>

            <!-- Create / Edit Article Section -->
            <section class="content-section" id="create-section" style="display:none;">
                <div class="form-card">
                    <h3 class="form-card-title" id="formTitle">Create New Article</h3>
                    <form id="articleForm">
                        <input type="hidden" id="editArticleId" value="">
                        <div class="form-group">
                            <label for="articleTitle">Article Title *</label>
                            <input type="text" id="articleTitle" placeholder="Enter a compelling title..." required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="articleCategory">Category *</label>
                                <select id="articleCategory" required>
                                    <option value="">Select a category</option>
                                    <option value="yoga">Yoga</option>
                                    <option value="herbs">Herbs</option>
                                    <option value="wellness">Wellness</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="articleAuthor">Author</label>
                                <input type="text" id="articleAuthor" placeholder="Yogentix Team" value="Yogentix Team">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="articleImage">Image URL</label>
                            <input type="text" id="articleImage" placeholder="https://images.unsplash.com/photo-...">
                            <span class="form-hint">Paste an image URL from Unsplash or any image hosting</span>
                        </div>
                        <div class="form-group">
                            <label for="articleSummary">Summary</label>
                            <textarea id="articleSummary" rows="3" placeholder="A brief summary for the article card..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="articleContent">Content *</label>
                            <textarea id="articleContent" rows="15" placeholder="Write your full article content here..." required></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="resetForm()">Cancel</button>
                            <button type="submit" class="btn btn-primary" id="submitBtn">Publish Article</button>
                        </div>
                    </form>
                </div>
            </section>

        </main>
    </div>

    <!-- Delete Modal -->
    <div class="modal-overlay" id="deleteModal" style="display:none;">
        <div class="modal-card">
            <div class="modal-icon">&#9888;&#65039;</div>
            <h3 class="modal-title">Delete Article?</h3>
            <p class="modal-desc">This action cannot be undone.</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeDeleteModal()">Cancel</button>
                <button class="btn btn-danger" onclick="confirmDelete()">Delete</button>
            </div>
        </div>
    </div>

    <!-- Toast -->
    <div class="toast" id="toast">
        <span class="toast-icon" id="toastIcon">&#10004;</span>
        <span class="toast-message" id="toastMessage">Success!</span>
    </div>

    <script src="/admin/js/admin.js"></script>
</body>
</html>`;

// ============================================
// ADMIN CSS
// ============================================
const adminCSS = `/* YOGENTIX ADMIN DASHBOARD */
:root {
    --primary: #3d7a4a;
    --primary-light: #5a9e62;
    --primary-dark: #2d5a38;
    --primary-fade: rgba(61,122,74,0.08);
    --accent: #c8a96e;
    --bg-main: #f4f1ec;
    --bg-sidebar: #1a1f1c;
    --bg-white: #ffffff;
    --bg-card: rgba(255,255,255,0.85);
    --text-dark: #1a2e1f;
    --text-body: #4a5a4e;
    --text-light: #7a8a7e;
    --text-white: #ffffff;
    --danger: #d94444;
    --danger-light: #fce8e8;
    --border: rgba(0,0,0,0.08);
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.06);
    --shadow-lg: 0 8px 40px rgba(0,0,0,0.08);
    --font-heading: 'Playfair Display', Georgia, serif;
    --font-body: 'Inter', -apple-system, sans-serif;
    --radius: 16px;
    --radius-sm: 10px;
    --transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
body{font-family:var(--font-body);background:var(--bg-main);color:var(--text-body);line-height:1.6;-webkit-font-smoothing:antialiased;}
a{text-decoration:none;color:inherit;}
ul{list-style:none;}

/* LOGIN */
.login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#1a3a25 0%,#2d5a3d 40%,#3d7a4a 100%);padding:20px;position:relative;overflow:hidden;}
.login-page::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 25% 30%,rgba(200,169,110,0.12) 0%,transparent 50%),radial-gradient(ellipse at 75% 70%,rgba(90,158,98,0.15) 0%,transparent 50%);}
.login-container{position:relative;z-index:2;width:100%;max-width:420px;}
.login-card{background:rgba(255,255,255,0.95);backdrop-filter:blur(24px);border-radius:var(--radius);padding:48px 40px;box-shadow:var(--shadow-lg);border:1px solid rgba(255,255,255,0.5);}
.login-header{text-align:center;margin-bottom:36px;}
.login-logo{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:24px;}
.logo-mark{width:44px;height:44px;background:linear-gradient(135deg,var(--primary),var(--primary-light));border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:22px;font-weight:700;color:white;box-shadow:0 4px 12px rgba(61,122,74,0.3);}
.logo-text{font-family:var(--font-heading);font-size:26px;font-weight:700;color:var(--text-dark);}
.login-title{font-family:var(--font-heading);font-size:24px;font-weight:600;color:var(--text-dark);margin-bottom:6px;}
.login-subtitle{font-size:14px;color:var(--text-light);}
.form-group{margin-bottom:20px;}
.form-group label{display:block;font-size:13px;font-weight:600;color:var(--text-dark);margin-bottom:8px;}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:14px 16px;font-family:var(--font-body);font-size:14px;color:var(--text-dark);background:var(--bg-main);border:1px solid var(--border);border-radius:var(--radius-sm);transition:var(--transition);outline:none;}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-fade);background:white;}
.form-group input::placeholder,.form-group textarea::placeholder{color:var(--text-light);}
.form-hint{display:block;font-size:12px;color:var(--text-light);margin-top:6px;}
.login-error{display:flex;align-items:center;gap:8px;padding:12px 16px;background:var(--danger-light);border-radius:var(--radius-sm);font-size:13px;color:var(--danger);margin-bottom:20px;}
.login-btn{width:100%;padding:16px;background:linear-gradient(135deg,var(--primary),var(--primary-light));color:white;font-family:var(--font-body);font-size:15px;font-weight:600;border:none;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);box-shadow:0 4px 12px rgba(61,122,74,0.3);}
.login-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(61,122,74,0.4);}
.login-btn:disabled{opacity:0.6;cursor:not-allowed;transform:none;}
.back-to-site{display:block;text-align:center;margin-top:24px;font-size:13px;color:var(--text-light);transition:var(--transition);}
.back-to-site:hover{color:var(--primary);}

/* DASHBOARD */
.dashboard{display:flex;min-height:100vh;}
.sidebar{width:260px;background:var(--bg-sidebar);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;transition:var(--transition);}
.sidebar-header{padding:28px 24px;border-bottom:1px solid rgba(255,255,255,0.06);}
.sidebar-header .logo{display:flex;align-items:center;gap:12px;}
.sidebar-header .logo-text{font-family:var(--font-heading);font-size:22px;font-weight:700;color:var(--text-white);}
.sidebar-nav{flex:1;padding:20px 12px;display:flex;flex-direction:column;gap:4px;}
.sidebar-link{display:flex;align-items:center;gap:12px;padding:12px 16px;font-family:var(--font-body);font-size:14px;font-weight:500;color:rgba(255,255,255,0.55);background:transparent;border:none;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);width:100%;text-align:left;}
.sidebar-link:hover{color:rgba(255,255,255,0.9);background:rgba(255,255,255,0.08);}
.sidebar-link.active{color:white;background:var(--primary);box-shadow:0 4px 12px rgba(61,122,74,0.3);}
.sidebar-icon{font-size:18px;width:24px;text-align:center;}
.sidebar-footer{padding:16px 12px;border-top:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:4px;}
.logout-link:hover{color:#ff6b6b!important;background:rgba(255,107,107,0.1)!important;}
.main-content{flex:1;margin-left:260px;min-height:100vh;}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:20px 36px;background:rgba(255,255,255,0.7);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:50;}
.topbar-left{display:flex;align-items:center;gap:16px;}
.mobile-sidebar-btn{display:none;background:none;border:none;font-size:24px;cursor:pointer;padding:4px;}
.page-title{font-family:var(--font-heading);font-size:22px;font-weight:600;color:var(--text-dark);}
.admin-badge{font-size:13px;padding:8px 16px;background:var(--primary-fade);color:var(--primary);border-radius:50px;font-weight:500;}
.content-section{padding:32px 36px;}

/* STATS */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:32px;}
.stat-card{background:var(--bg-card);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.6);border-radius:var(--radius);padding:24px;display:flex;align-items:center;gap:16px;box-shadow:var(--shadow-sm);transition:var(--transition);}
.stat-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);}
.stat-icon{font-size:32px;width:56px;height:56px;display:flex;align-items:center;justify-content:center;background:var(--primary-fade);border-radius:14px;}
.stat-info{display:flex;flex-direction:column;}
.stat-number{font-family:var(--font-heading);font-size:28px;font-weight:700;color:var(--text-dark);}
.stat-label{font-size:13px;color:var(--text-light);}

/* TABLE */
.articles-table-container{background:var(--bg-card);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.6);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-sm);}
.articles-table{width:100%;border-collapse:collapse;}
.articles-table th{text-align:left;padding:16px 24px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-light);background:rgba(0,0,0,0.02);border-bottom:1px solid var(--border);}
.articles-table td{padding:16px 24px;font-size:14px;border-bottom:1px solid var(--border);vertical-align:middle;}
.articles-table tbody tr{transition:var(--transition);}
.articles-table tbody tr:hover{background:var(--primary-fade);}
.articles-table tbody tr:last-child td{border-bottom:none;}
.table-article-info{display:flex;align-items:center;gap:16px;}
.table-article-thumb{width:56px;height:56px;border-radius:var(--radius-sm);overflow:hidden;flex-shrink:0;background:var(--bg-main);}
.table-article-thumb img{width:100%;height:100%;object-fit:cover;}
.table-article-thumb-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;background:linear-gradient(135deg,#e8f0e4,#f0ece2);}
.table-article-title{font-weight:600;color:var(--text-dark);font-size:14px;line-height:1.4;}
.table-category-badge{display:inline-block;padding:4px 12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;border-radius:50px;background:var(--primary-fade);color:var(--primary);}
.table-actions{display:flex;gap:8px;}
.action-btn{padding:8px 14px;font-family:var(--font-body);font-size:12px;font-weight:600;border:none;border-radius:8px;cursor:pointer;transition:var(--transition);}
.action-btn-edit{background:#e8f4ea;color:var(--primary);}
.action-btn-edit:hover{background:var(--primary);color:white;}
.action-btn-delete{background:var(--danger-light);color:var(--danger);}
.action-btn-delete:hover{background:var(--danger);color:white;}

/* FORM */
.form-card{background:var(--bg-card);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.6);border-radius:var(--radius);padding:40px;box-shadow:var(--shadow-sm);max-width:800px;}
.form-card-title{font-family:var(--font-heading);font-size:22px;font-weight:600;color:var(--text-dark);margin-bottom:32px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.form-group textarea{resize:vertical;min-height:60px;}
.form-actions{display:flex;gap:12px;justify-content:flex-end;margin-top:32px;padding-top:24px;border-top:1px solid var(--border);}
.btn{padding:12px 28px;font-family:var(--font-body);font-size:14px;font-weight:600;border:none;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);}
.btn-primary{background:linear-gradient(135deg,var(--primary),var(--primary-light));color:white;box-shadow:0 4px 12px rgba(61,122,74,0.3);}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(61,122,74,0.4);}
.btn-primary:disabled{opacity:0.6;cursor:not-allowed;transform:none;}
.btn-secondary{background:var(--bg-main);color:var(--text-body);border:1px solid var(--border);}
.btn-secondary:hover{background:#e8e4dc;}
.btn-danger{background:var(--danger);color:white;}
.btn-danger:hover{background:#c33;}

/* MODAL */
.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;}
.modal-card{background:white;border-radius:var(--radius);padding:40px;max-width:420px;width:100%;text-align:center;box-shadow:var(--shadow-lg);}
.modal-icon{font-size:48px;margin-bottom:16px;}
.modal-title{font-family:var(--font-heading);font-size:22px;font-weight:600;color:var(--text-dark);margin-bottom:8px;}
.modal-desc{font-size:14px;color:var(--text-light);margin-bottom:28px;}
.modal-actions{display:flex;gap:12px;justify-content:center;}

/* TOAST */
.toast{position:fixed;bottom:-80px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;padding:16px 28px;background:var(--bg-sidebar);color:white;border-radius:var(--radius-sm);font-size:14px;font-weight:500;box-shadow:var(--shadow-lg);transition:var(--transition);z-index:2000;}
.toast.show{bottom:32px;}

/* LOADING */
.loading{text-align:center;padding:48px;color:var(--text-light);}
.spinner{width:36px;height:36px;border:3px solid rgba(61,122,74,0.1);border-top-color:var(--primary);border-radius:50%;margin:0 auto 12px;animation:spin 0.8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.no-data{text-align:center;padding:48px;color:var(--text-light);font-size:15px;}

/* RESPONSIVE */
@media(max-width:1024px){.stats-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:768px){
.sidebar{transform:translateX(-100%);}
.sidebar.open{transform:translateX(0);}
.main-content{margin-left:0;}
.mobile-sidebar-btn{display:block;}
.topbar{padding:16px 20px;}
.content-section{padding:20px;}
.stats-grid{grid-template-columns:1fr 1fr;gap:12px;}
.stat-card{padding:16px;}
.form-card{padding:24px;}
.form-row{grid-template-columns:1fr;}
.articles-table th:nth-child(3),.articles-table td:nth-child(3){display:none;}
.table-article-thumb{display:none;}
.login-card{padding:32px 24px;}
}`;

// ============================================
// ADMIN JS
// ============================================
const adminJS = `// YOGENTIX ADMIN DASHBOARD
var API_URL = '/api';
var authToken = localStorage.getItem('yogentix_token') || '';
var deleteArticleId = '';

function checkAuth() {
    if (authToken) {
        showDashboard();
        loadAdminArticles();
    }
}

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
        document.getElementById('totalArticles').textContent = articles.length;
        document.getElementById('yogaCount').textContent = articles.filter(function(a){return a.category==='yoga';}).length;
        document.getElementById('herbsCount').textContent = articles.filter(function(a){return a.category==='herbs';}).length;
        document.getElementById('wellnessCount').textContent = articles.filter(function(a){return a.category==='wellness';}).length;
        if (articles.length === 0) { noData.style.display = 'block'; return; }
        articles.forEach(function(article) {
            var date = new Date(article.createdAt);
            var formattedDate = date.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});
            var emoji = article.category==='yoga'?'\\u{1F9D8}':article.category==='herbs'?'\\u{1F331}':'\\u{2728}';
            var thumbHTML = article.image ? '<img src="'+article.image+'" alt="">' : '<div class="table-article-thumb-placeholder">'+emoji+'</div>';
            var row = '<tr>'
                +'<td><div class="table-article-info"><div class="table-article-thumb">'+thumbHTML+'</div><span class="table-article-title">'+article.title+'</span></div></td>'
                +'<td><span class="table-category-badge">'+article.category+'</span></td>'
                +'<td>'+formattedDate+'</td>'
                +'<td><div class="table-actions"><button class="action-btn action-btn-edit" onclick="editArticle(\\''+article._id+'\\')">Edit</button><button class="action-btn action-btn-delete" onclick="openDeleteModal(\\''+article._id+'\\')">Delete</button></div></td>'
                +'</tr>';
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error loading articles:', error);
        loading.style.display = 'none';
        noData.style.display = 'block';
    }
}

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
        if (articleId) { url = API_URL + '/articles/' + articleId; method = 'PUT'; }
        var response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
            body: JSON.stringify(articleData)
        });
        var data = await response.json();
        if (response.ok) {
            showToast('Success', articleId ? 'Article updated!' : 'Article published!');
            resetForm();
            showSection('articles-section', document.querySelector('[data-section="articles-section"]'));
            loadAdminArticles();
        } else {
            showToast('Error', data.message || 'Failed to save article');
        }
    } catch (error) {
        showToast('Error', 'Connection error. Please try again.');
    }
    submitBtn.textContent = articleId ? 'Update Article' : 'Publish Article';
    submitBtn.disabled = false;
});

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
        document.getElementById('formTitle').textContent = 'Edit Article';
        document.getElementById('submitBtn').textContent = 'Update Article';
        showSection('create-section', document.querySelector('[data-section="create-section"]'));
    } catch (error) {
        showToast('Error', 'Failed to load article');
    }
}

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
            headers: { 'Authorization': 'Bearer ' + authToken }
        });
        if (response.ok) {
            showToast('Success', 'Article deleted!');
            loadAdminArticles();
        } else {
            showToast('Error', 'Failed to delete');
        }
    } catch (error) {
        showToast('Error', 'Connection error');
    }
    closeDeleteModal();
}

function showSection(sectionId, btn) {
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function(s){ s.style.display = 'none'; });
    document.getElementById(sectionId).style.display = 'block';
    var sidebarLinks = document.querySelectorAll('.sidebar-nav .sidebar-link');
    sidebarLinks.forEach(function(l){ l.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    var pageTitle = document.getElementById('pageTitle');
    pageTitle.textContent = sectionId === 'articles-section' ? 'All Articles' : 'Create Article';
    var sidebar = document.getElementById('sidebar');
    if(sidebar) sidebar.classList.remove('open');
}

function resetForm() {
    document.getElementById('articleForm').reset();
    document.getElementById('editArticleId').value = '';
    document.getElementById('articleAuthor').value = 'Yogentix Team';
    document.getElementById('formTitle').textContent = 'Create New Article';
    document.getElementById('submitBtn').textContent = 'Publish Article';
}

function showToast(icon, message) {
    var toast = document.getElementById('toast');
    document.getElementById('toastIcon').textContent = icon === 'Success' ? '\\u2705' : '\\u274C';
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    setTimeout(function(){ toast.classList.remove('show'); }, 3000);
}

var mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
if (mobileSidebarBtn) {
    mobileSidebarBtn.addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

checkAuth();`;

// ============================================
// WRITE FILES
// ============================================
fs.writeFileSync('public/admin/index.html', adminHTML);
console.log('✅ Created: public/admin/index.html (' + adminHTML.length + ' bytes)');

fs.writeFileSync('public/admin/css/admin.css', adminCSS);
console.log('✅ Created: public/admin/css/admin.css (' + adminCSS.length + ' bytes)');

fs.writeFileSync('public/admin/js/admin.js', adminJS);
console.log('✅ Created: public/admin/js/admin.js (' + adminJS.length + ' bytes)');

console.log('');
console.log('🎉 All admin files created successfully!');
console.log('Now run: git add . && git commit -m "Add admin" && git push');