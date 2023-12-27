const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

// Function to parse cookies
function getCookies(req) {
  if (req.headers.cookie == null) return {};

  const rawCookies = req.headers.cookie.split('; ');
  const parsedCookies = {};
  rawCookies.forEach(rawCookie => {
    const parsedCookie = rawCookie.split('=');
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });

  return parsedCookies;
}

// Middleware to check authentication token
function authAdminToken(req, res, next) {
  const cookies = getCookies(req);
  const token = cookies['token'];
  
  if (!token) {
    return res.redirect('/admin/login');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err || !payload || payload.role !== 'admin') {
      return res.redirect('/admin/login');
    }
    
    req.user = payload;
    next();
  });
}

// Route for admin login page
app.get('/admin/login', (req, res) => {
  res.sendFile('login.html', { root: './static/admin_app' });
});

// Protected route for admin panel requiring authentication
app.get('/admin', authAdminToken, (req, res) => {
  res.sendFile('index.html', { root: './static' });
});

// Serve static files for user app
app.use('/user', express.static(path.join(__dirname, 'static', 'user_app')));
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'user_app', 'index.html'));
});

// Serve static files for admin app
app.use('/admin', express.static(path.join(__dirname, 'static', 'admin_app')));
app.get('/admin/*', authAdminToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'admin_app', `${req.params[0]}.html`));
});

// Default route for user app
app.use(express.static(path.join(__dirname, 'static', 'user_app')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'user_app', 'index.html'));
});

// Start the server
app.listen(8000);
