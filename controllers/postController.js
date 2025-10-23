const { User, PostReaction, Category, Post } = require('../models/index');
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
    static async like(req, res) {
        const userId = req.session.userId;
        const postId = Number(req.params.id)
        console.log(postId, "<<< POST ID")
        console.log(userId, "<<< USER")

        try {
        // Check if user already reacted
        const existingReaction = await PostReaction.findOne({
            where: { UserId: userId, PostId: postId }
        });

        if (existingReaction) {
            return res.status(400).json({ message: "You have already reacted to this post." });
        }

        // Create reaction
        await PostReaction.create({
            UserId: userId,
            PostId: postId
        });

        // Increment likesCount atomically
        await Post.increment('likes', { by: 1, where: { id: postId } });

        res.redirect('/')
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong." });
        }
    }


    static delete(req, res) {
    const { id } = req.params;
    const {userId} = req.query;
    // Doesn't go back to users/id, sad.
    Post.destroy({ where: { id } })
        .then(() => {
        res.redirect(`/users/${userId}`);
        })
        .catch((err) => {
        console.log(err)
        res.send(err);
        });
    }
}

module.exports = postController;

