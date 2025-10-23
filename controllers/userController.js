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
    static async editProfile(req, res) {
        try {
            
            const { id } = req.params; 
            const data = await UserProfile.findByPk(id);

            if (!data) {
                return res.status(404).send("Profil tidak ditemukan.");
            }

           
            console.log(data,'TTTTTTTTTTTTTTTTTTTTTTTTTTTT');
            
            res.render('editProfile', { 
                data,
                error: null
            });

        } catch (error) {
            console.error("Error di getEditProfile:", error);
            res.send(error);
        }
    }
    
    static async postEditProfile(req, res) {
        try {
            const { id } = req.params;
            const { firstName, lastName, tagLine, isPrivate } = req.body;

            const updatedProfileData = {
                firstName,
                lastName,
                tagLine,
                isPrivate: isPrivate === 'on' ? true : false 
            };
            
            await UserProfile.update(updatedProfileData, {
                where: { UserId: id }
            });

            // Note: Jika kolom UserProfile memiliki 'UserId' sebagai Foreign Key ke User,
            // Anda mungkin perlu memastikan ID dimasukkan:
            /* await UserProfile.upsert({ ...updatedProfileData, UserId: id }); 
            */


            res.redirect(`/users/${id}`); 

        } catch (error) {
            console.error("Error di putEditProfile:", error);
            // Jika ada error (misalnya validasi), render ulang form dengan pesan error
            const userProfileData = await User.findByPk(id, { include: [UserProfile] });
            res.render('editProfile', { 
                userProfile: userProfileData,
                error: error.message || "Gagal menyimpan perubahan."
            });
        }
    }
}

module.exports = userController;

