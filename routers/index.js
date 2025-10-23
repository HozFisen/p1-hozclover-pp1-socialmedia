const router = require('express').Router();
const SessionController = require('../controllers/sessionController.js');
const users = require('./users');
const posts = require('./posts');
const session = require('express-session');

// LANDINGPAGE
router.get("/", SessionController.home);

// AUTH
router.get("/register", SessionController.getRegister);
router.post("/register", SessionController.postRegister);
router.get("/login", SessionController.getLogin);
router.post("/login", SessionController.postLogin);
router.get("/logout", SessionController.logout)

// USERS & POSTS ROUTES
router.use("/users", users);
router.use("/posts", posts);

module.exports = router;
