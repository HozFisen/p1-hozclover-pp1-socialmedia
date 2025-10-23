const router = require('express').Router();
const userController = require('../controllers/userController');
const {auth} = require('../middleware/authentication')
const {authorize} = require('../middleware/authorization')
// USERS ROUTER

router.get("/", userController.allUsers);
router.get("/:id", userController.userProfile);  
router.get("/:id/edit", auth, userController.editProfile);
router.post("/:id/edit", userController.postEditProfile)


module.exports = router;
