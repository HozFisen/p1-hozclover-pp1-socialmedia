const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get("/", Controller.posts); 
router.get("/:id/like", Controller.like); 
router.get("/add", Controller.getPost); 
router.post("/add", Controller.postPost); 
// router.get("/:id", Controller.userProfle); 

module.exports = router;
