const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get("/", Controller.allUsers); 
router.get("/:id", Controller.userProfle); 
// router.get("/:id/edit", Controller.editProfile); 

module.exports = router;
