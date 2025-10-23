const { User, UserProfile, Category, Post, PostReaction } = require('../models/index');
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
                order: [['createdAt', 'DESC']]
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
            }) // bisa di trim attributes... mungkin?
            res.render('addPost', { categories })
        } catch (error) {
            res.send(error)
        }
    }

    static async postPost(req, res) {
        try {
            const { title, content, imageUrl, date, CategoryId } = req.body;
            const UserId = req.session.userId; // dari user login
            // console.log(req.body,'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');

            await Post.create({
                title,
                content,
                imageUrl,
                date,
                CategoryId,
                UserId // sementara dulu
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
            const UserId = req.session.userId;
            const id = req.params.id;

            if (!UserId) return res.status(401).send("Login dulu!");

            // Ambil reaction default like/unlike (misal Reaction id=1 = like, id=2 = unlike)
            const likeReaction = await Reaction.findOne({ where: { name: 'like' } });
            const unlikeReaction = await Reaction.findOne({ where: { name: 'unlike' } });

            // Cek apakah user sudah punya reaction di post ini
            let postReact = await PostReaction.findOne({ where: { UserId, id } });

            if (!postReact) {
                // belum ada reaction, kasih like default
                await PostReaction.create({ UserId, id, ReactionId: likeReaction.id });
                likeReaction.point += 1;
                await likeReaction.save();
                current = 'like';
            } else {
                // sudah ada reaction, toggle
                if (postReact.ReactionId === likeReaction.id) {
                    // ubah ke unlike
                    postReact.ReactionId = unlikeReaction.id;
                    await postReact.save();

                    likeReaction.point -= 1;
                    await likeReaction.save();

                    current = 'unlike';
                } else {
                    // ubah ke like
                    postReact.ReactionId = likeReaction.id;
                    await postReact.save();

                    likeReaction.point += 1;
                    await likeReaction.save();

                    current = 'like';
                }
            }

            // Hitung total point like
            const totalLikes = await PostReaction.count({ where: { id, ReactionId: likeReaction.id } });

            res.json({ totalLikes, current });

        } catch (error) {
            console.error(error);
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await Post.destroy({
                where: id
            })
            res.redirect(`/users/${id}`)
        } catch (err) {
            res.send(err);
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            let data = await Post.findByPk(id);
            await data.destroy()
            res.redirect(`/users/${id}`)
        } catch (err) {
            res.send(err);
        }
    }
}

module.exports = postController;

