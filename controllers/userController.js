const { User, UserProfile, Category, Post } = require('../models/index');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class userController {
    // USER MANAGER
    static async allUsers(req, res) {
        try {
            const users = await User.findAll({
                include: UserProfile
            })
            // console.log(users.UserProfiles[0].profilePicture, 'sssssssssssssssssaaaaaaaaa');

            res.render('users', { users })
        } catch (error) {
            res.send(error)
        }
    }
    static async userProfile(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                include: [UserProfile, Post] 
            });

            res.render('userProfile', { user });
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = userController;

