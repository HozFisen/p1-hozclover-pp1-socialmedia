const { User, UserProfile, Category, Post } = require('../models/index');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class postController {

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
                order: [['date', 'DESC']]
            });

            res.render('home', { posts });
        } catch (error) {
            console.log(error)
            res.send(error);
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

            res.render('userProfile', { user });
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

module.exports = postController;

