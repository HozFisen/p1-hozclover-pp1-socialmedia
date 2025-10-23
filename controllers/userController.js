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
            const active = req.session
            res.render('userProfile', { user, active });
        } catch (error) {
            res.send(error);
        }
    }
    static async editProfile(req, res) {
        try {
            const id = req.session.userId
            // const { id } = req.params; 
            const data = await UserProfile.findOne({where:{UserId:id}})

            if (!data) {
                return res.status(404).send("Error 404 - Profile not found!");
            }
            console.log(data,'000000000000000000000000000000000');
            
            
            res.render('editProfile', { data, error: null});

        } catch (error) {
            console.error("Unnown Error in editProfile", error);
            res.send(error);
        }
    }
    
    static async postEditProfile(req, res) {
        try {
            const id = req.session.userId;
            console.log("EDIT PROFILE",id)
            const { firstName, lastName, tagLine, isPrivate, profilePicture } = req.body;

            const updatedProfileData = {
                firstName,
                lastName,
                profilePicture,
                tagLine,
                isPrivate: isPrivate === 'on' ? true : false 
            };
            
            await UserProfile.update(updatedProfileData, {
                where: { UserId: id }
            });


            res.redirect(`/users/${id}`); 

        } catch (error) {
            console.error("Error di postEditProfile:", error);
            res.render('editProfile')
        }
    }
}

module.exports = userController;

