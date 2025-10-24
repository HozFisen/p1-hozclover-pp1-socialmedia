const { User, UserProfile, Category, Post } = require('../models/index');
const bcrypt = require('bcryptjs')
const {Op} = require('sequelize')
const salt = bcrypt.genSaltSync(10)
const getRegion = require('../helpers/helper')

class userController {
    // USER MANAGER
   static async allUsers(req, res) {
    try {
        const {search} = req.query// ambil query search
        console.log(req.query,'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
        
        let users = await User.findAll({
            include: UserProfile,
        });

        if(search){
            users = await User.findAll({
            include: UserProfile,
            where: {
                username: {
                    [Op.iLike]: `%${search}%` // untuk Postgres, case-insensitive
                }
            }
        });
        }

        res.render('users', { users });
    } catch (error) {
        res.send(error);
    }
}

    static async userProfile(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                include: [UserProfile, Post] 
            });
            const active = req.session
            const region = await getRegion(user.ip)
            res.render('userProfile', { user, active, region });
        } catch (error) {
            console.log(error)
            res.send(error);
        }
    }
    static async editProfile(req, res) {
        try {
            const id = req.session.userId
            // const { id } = req.params; 
            console.log(id, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            
            const data = await UserProfile.findOne({where:{UserId:id}})

            if (!data) {
                return res.status(404).send("Error 404 - Profile not found!");
            }
            
            
            res.render('editProfile', { data, error: null});

        } catch (error) {
            console.error("Unnown Error in editProfile", error);
            res.send(error);
        }
    }
    
   // userController.js

static async postEditProfile(req, res) {
    try {
        // Ambil ID dari URL params (ini adalah ID pengguna yang profilnya diedit)
        const { id } = req.params; 
        const { firstName, lastName, tagLine, isPrivate ,profilePicture} = req.body;

        // 1. Siapkan data yang akan diupdate
        const updatedProfileData = {
            firstName,
            lastName,
            tagLine,
            // Konversi 'on'/'off' dari checkbox menjadi boolean
            isPrivate: isPrivate === 'on' ? true : false, 
            // UserId tidak perlu diupdate, tapi pastikan ada jika diperlukan
            profilePicture
        };

        // 2. LAKUKAN UPDATE, TERMASUK OPSI { WHERE: ... } 🛠️
        await UserProfile.update(updatedProfileData, {
            // KRUSIAL: Memberi tahu Sequelize baris mana yang harus diupdate
            where: { 
                UserId: id 
            }
        });

        // Jika update berhasil
        res.redirect(`/users/${id}`); 

    } catch (error) {
        // ... (blok catch yang menangani render ulang form saat error)
        console.error("Error in postEditProfile:", error);

        // Ambil data profil lama
        const profileData = await UserProfile.findOne({ where: { UserId: req.params.id } });
        
        // Mengirim error validation Sequelize ke EJS (jika ada)
        let errorMessage = "Gagal menyimpan perubahan.";
        if (error.errors && error.errors.length > 0) {
             errorMessage = error.errors[0].message; 
        }

        res.render('editProfile', { 
            data: profileData,
            error: errorMessage,
            input: req.body // Kirim ulang input yang gagal
        });
    }
}
}

module.exports = userController;

