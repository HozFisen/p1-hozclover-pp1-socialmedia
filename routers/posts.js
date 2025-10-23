const router = require('express').Router();
const postController = require('../controllers/postController');
const {auth} = require('../middleware/authentication')

// router.get("/", postController.posts); 
router.get("/:id/like", auth ,postController.like); 
router.get("/add", auth, postController.getPost); 
router.post("/add", auth, postController.postPost); 
router.post("/:id/delete", auth, postController.delete); 

module.exports = router;
