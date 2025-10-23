const { User, UserProfile, Category, Post } = require('../models/index');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class Controller {

    // Dummy data
    static async posts(req, res) {
        try {
            let posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        include: [UserProfile]
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.render('home', { posts });
        } catch (error) {
            res.send(error);
        }
    }

    // ==========AUTH============

    static async getRegister(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }
    static async postRegister(req, res) {
        try {
            const { email, username, password } = req.body;
            console.log(req.body, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            await User.create({
                email,
                password,
                username,
                role: 'User'
            })
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }
    static async getLogin(req, res) {
        try {

            res.render('login', { error: null }); // default null
        } catch (err) {
            res.send(err);
        }
    }

    static async postLogin(req, res) {
        try {
            const { username, password } = req.body;
            let user = await User.findOne({ where: { username } })
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (isValidPassword) {
                res.redirect("/")
            } else {
                res.redirect("/login")
            }
        } catch (error) {
            res.send(error)
        }
    }
    static async logout(req,res) {
        try {

        } catch {
            
        }
    }

    // ===========USER==========
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
    static async userProfle(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                include: [UserProfile, Post] 
            });

            // const loggedInUserId = req.session.userId; 
            const loggedInUserId = 3; 

        res.render('userProfile', { 
            user,
            loggedInUserId: loggedInUserId 
        });
        } catch (error) {
            res.send(error);
        }
    }

    // static async getUser(req, res) {
    //     try {

    //     } catch (error) {
    //         res.send(error)
    //     }
    // }
    // static async postUser(req, res) {
    //     try {

    //     } catch (error) {
    //         res.send(error)
    //     }
    // }
    static async getPost(req, res) {
        try {
            // Ambil kategori untuk dropdown di form
            const categories = await Category.findAll({
                 attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt']
            })
            res.render('addPost', { categories })
        } catch (error) {
            res.send(error)
        }
    }

    static async postPost(req, res) {
        try {
            const { title, content, imageUrl, date, CategoryId } = req.body;
            // const UserId = req.session.userId; // dari user login
            console.log(req.body,'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            
            await Post.create({
                title,
                content,
                imageUrl,
                date,
                CategoryId,
                UserId:1 // sementara dulu
            });

            res.redirect('/');
        } catch (error) {
            res.send(error)
        }
    }


    // ==========LOGIC===========

    // static async addReaction(req, res) {
    //     // Dummy handler untuk tombol reaction
    //     res.send(`Reaction ${req.body.reaction} added to post ${req.body.postId}`);
    // };


    // static async formProfile(req, res) {
    //     try {
            
    //         const { id } = req.params; 
    //         const data = await UserProfile.findByPk(id);

    //         if (!data) {
    //             return res.status(404).send("Profil tidak ditemukan.");
    //         }

           
    //         console.log(data,'TTTTTTTTTTTTTTTTTTTTTTTTTTTT');
            
    //         res.render('editProfile', { 
    //             data,
    //             error: null
    //         });

    //     } catch (error) {
    //         console.error("Error di getEditProfile:", error);
    //         res.send(error);
    //     }
    // }
    
    // static async editProfile(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { firstName, lastName, tagLine, isPrivate, profilePicture} = req.body;
    //         console.log(req.body,'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');

    //         const updatedProfileData = {
    //             firstName: firstName,
    //             lastName: lastName,
    //             tagLine: tagLine,
    //             isPrivate: isPrivate === 'on' ? true : false,
    //             UserId: id,
    //             profilePicture
    //         };
            
    //         await UserProfile.update(updatedProfileData, {
    //             where: { UserId: id }
    //         });

    //         // Note: Jika kolom UserProfile memiliki 'UserId' sebagai Foreign Key ke User,
    //         // Anda mungkin perlu memastikan ID dimasukkan:
    //         /* await UserProfile.upsert({ ...updatedProfileData, UserId: id }); 
    //         */


    //         res.redirect(`/users/${id}`); 

    //     } catch (error) {
    //         console.error("Error di putEditProfile:", error);
    //         // Jika ada error (misalnya validasi), render ulang form dengan pesan error
    //         const userProfileData = await User.findByPk(id, { include: [UserProfile] });
    //         res.render('editProfile', { 
    //             userProfile: userProfileData,
    //             error: error.message || "Gagal menyimpan perubahan."
    //         });
    //     }
    // }

    static async formProfile(req, res) {
        try {
            const { id } = req.params; 
            const data = await UserProfile.findOne({ where: { UserId: id } });

            if (!data) {
                return res.status(404).send("Profile not found.");
            }

            res.render('editProfile', { 
                data,    // data profile lengkap
                error: null
            });

        } catch (error) {
            console.error("Error in formProfile:", error);
            res.send(error);
        }
    }

    // POST: Submit edit profile
    static async editProfile(req, res) {
        try {
            const { id } = req.params;
            const { firstName, lastName, tagLine, isPrivate } = req.body;

            // Jika menggunakan upload file (foto), req.file akan tersedia via multer
            // Contoh: profilePicture: req.file?.filename
            let profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

            const updatedProfileData = {
                firstName,
                lastName,
                tagLine,
                isPrivate: isPrivate === 'on' ? true : false
            };

            if (profilePicture) updatedProfileData.profilePicture = profilePicture;

            await UserProfile.update(updatedProfileData, {
                where: { UserId: id }
            });

            res.redirect(`/users/${id}`); // balik ke halaman profile

        } catch (error) {
            console.error("Error in editProfile:", error);

            // Render ulang form dengan pesan error dan data lama
            const data = await UserProfile.findOne({ where: { UserId: req.params.id } });
            res.render('editProfile', { 
                data,
                error: error.message || "Failed to save changes."
            });
        }
    }


    static async like(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.session.userId;

            // Cari reaction "like"
            const likeReaction = await Reaction.findOne({ where: { name: 'like' } });

            // Cek apakah user sudah like post ini
            const existing = await PostReaction.findOne({
                where: {
                    UserId: userId,
                    PostId: postId,
                    ReactionId: likeReaction.id
                }
            });

            if (existing) {
                // sudah like -> unlike
                await existing.destroy();
            } else {
                // belum -> like
                await PostReaction.create({
                    UserId: userId,
                    PostId: postId,
                    ReactionId: likeReaction.id
                });
            }

            res.redirect('back');
        } catch (error) {
            console.error(error);
        }
    }


}

module.exports = Controller;

