const router = require('express').Router();
const Controller = require('../controllers/controller');
const {auth} = require('../middleware/authentication')

router.get("/", Controller.posts); 
router.get("/:id/like", auth ,Controller.like); 
router.get("/add", auth, Controller.getPost); 
router.post("/add", auth, Controller.postPost); 
// router.get("/:id", Controller.userProfle); 

module.exports = router;
