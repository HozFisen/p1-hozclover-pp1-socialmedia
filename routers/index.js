const router = require('express').Router();
const Controller = require('../controllers/controller');
const users = require('./users');
const posts = require('./posts');

// LANDINGPAGE
router.get("/", Controller.posts);

// AUTH
router.get("/register", Controller.getRegister);
router.post("/register", Controller.postRegister);
router.get("/login", Controller.getLogin);
router.post("/login", Controller.postLogin);
router.get("/logout", Controller.logout)

// USERS & POSTS ROUTES
router.use("/users", users);
router.use("/posts", posts);

module.exports = router;
