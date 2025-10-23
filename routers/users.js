const router = require('express').Router();
const Controller = require('../controllers/controller');


// USERS ROUTER
router.get("/", Controller.allUsers); 
router.get("/:id", Controller.userProfle); 
// router.get("/:id/edit", Controller.editProfile); 

module.exports = router;
