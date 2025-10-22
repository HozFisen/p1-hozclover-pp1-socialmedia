const router = require('express').Router();
const Controller = require('../Controllers/controller')
const users = require('./users') 
const posts = require('./posts')

// Display semua posts
router.use("/", Controller.posts)

// Register Dulu
router.get("/register", Controller.getRegister);
router.post("/register", Controller.postRegister);

// Login
// router.get("/login", Controller.getLogin)
// router.post("/login", Controller.postLogin)

// router.get("/users", users);
// router.get("/posts", posts);

module.exports = router;