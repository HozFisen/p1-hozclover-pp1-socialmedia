const { User, UserProfile, Category, Post } = require('../models/index');

class Controller {

    // Dummy data
    static async posts(req, res) {
        try {
            let data = await User.findAll()
            res.send(data)                        // yang iniiiii
            // res.render('home', { data });
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

        } catch (error) {
            res.send(error)
        }
    }


    // ===========USER==========
    static async allUsers(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    static async userProfle(req, res) {
        try {
            const { id } = req.params;
            // const user = await User.findByPk(id, {
            //     include: Post
            // });
            const user = { id: 1, username: "DemoUser", tagLine: "this is tigline", profilePicture: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" }

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
            const categories = await Category.findAll()
            res.render('addPost', { categories })
        } catch (error) {
            res.send(error)
        }
    }

    static async postPost(req, res) {
        try {
            const { title, content, imageUrl, CategoryId } = req.body
            const UserId = req.session.userId  // asumsi user login

            await Post.create({
                title,
                content,
                imageUrl,
                CategoryId,
                UserId,
                date: new Date()
            })
            res.redirect('/')
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

module.exports = Controller;

