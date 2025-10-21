const router = require('express').Router;
const users = require('./users') 
const posts = require('./posts')


router.get("/register");

router.get("/users", users);
router.get("/posts", posts);

module.exports = router;