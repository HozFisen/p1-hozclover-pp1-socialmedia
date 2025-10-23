const router = require('express').Router();
const userController = require('../controllers/userController');


// USERS ROUTER
router.get("/", userController.allUsers); 
router.get("/:id", userController.userProfile); 
// router.get("/:id/edit", Controller.editProfile); 

module.exports = router;
