const express = require('express');
const path = require('path');

const app = express();

// User app
app.use('/user', express.static(path.join(__dirname, 'static', 'user_app')));
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'user', 'index.html'));
});

// Admin app
app.use('/admin', express.static(path.join(__dirname, 'static', 'admin_app')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'admin_app', `${req.params[0]}.html`));
});

// Default route - user app
app.use(express.static(path.join(__dirname, 'static', 'user_app')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'user_app', 'index.html'));
});

app.listen(8000);
