const express = require('express');
const session = require('express-session');
const router = require('./routers/index'); // pastikan file router udah ada
const app = express();
const port = 3000;

// EJS setup
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // folder untuk gambar/css/js

// Session setup (nanti bisa disambungkan ke sistem login)
app.use(session({
  secret: 'rahasia-echoz',
  resave: false,
  saveUninitialized: false
}));

// Simulasi user login sementara (sementara aja, biar tampil di UI)
app.use((req, res, next) => {
  res.locals.user = {
    username: "DemoUser",
    profilePicture: "/images/default-avatar.png"
  };
  next();
});

// Routes
app.use('/', router);

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
