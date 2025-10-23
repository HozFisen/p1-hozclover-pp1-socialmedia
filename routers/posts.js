const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get("/", Controller.posts); 
router.get("/:id/like", Controller.like); 
router.get("/:id/add", Controller.getPost); 
router.post("/:id/add", Controller.postPost); 
// router.get("/:id", Controller.userProfle); 

module.exports = router;
