const router = require('express').Router();
const postController = require('../controllers/postController');
const {auth} = require('../middleware/authentication')

// router.get("/", postController.posts); 

router.get("/add", auth, postController.getPost); 
router.post("/add", auth, postController.postPost);
router.get("/:id/like", auth ,postController.like); 
router.post("/:id/delete", auth, postController.delete); 

module.exports = router;
