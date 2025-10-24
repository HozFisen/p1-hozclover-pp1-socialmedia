const { User, Post, UserProfile, Category } = require('../models/index');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class SessionController {
    // SESSION MANAGER
    static async home(req, res) {
        try {
            // Akan menjadi string (misal: '1') atau undefined
            const { category } = req.query; // Akan menjadi string (misal: '1') atau undefined

            let filterOptions = {
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        include: [UserProfile]
                    }
                ]
            };

            // 2. Tambahkan kondisi WHERE jika kategori dipilih
            if (category) {
                // Pastikan CategoryId adalah angka (jika disimpan sebagai integer di DB)
                filterOptions.where = {
                    CategoryId: +category // Mengubah string menjadi integer
                };
            }

            // 3. Ambil data Post dengan filter yang diterapkan
            let posts = await Post.findAll(filterOptions);

            // 4. Ambil kategori untuk dropdown (sudah benar)
            const categories = await Category.findAll({
                attributes: ['id', 'name']
            });


            const active = req.session

            res.render('home', { posts, active, categories });
        } catch (error) {
            console.log(error)
            res.send(error);
        }
    }
    static async getRegister(req, res) {
        try {
            res.render('register', { errors: null });
        } catch (error) {
            res.send(error);
        }
    }
    static async postRegister(req, res) {
        try {
            const { email, username, password } = req.body;

            await User.create({
                email,
                password,
                username,
                role: 'user'
            });

            res.redirect('/login');
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errorMessages = error.errors.map(err => err.message);
                res.status(400).render('register', { errors: errorMessages });
            } else {
                console.log(error);
                res.status(500).send(error);
            }
        }
    }
    static async getLogin(req, res) {
        try {
            /*
            TODO: Display Error jika:
            Email tidak adak,
            Email ada, password salah.
            */
            res.render('login', { error: null }); // default null
        } catch (err) {
            res.send(err);
        }
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ where: { email } })
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (isValidPassword) {
                // Start session here.
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.role = user.role;
                // console.log("CURRENT",req.session)
                res.redirect("/")
            } else {
                res.redirect("/login")
            }
        } catch (error) {
            console.log(error)
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errorMessages = error.errors.map(err => err.message);
                res.status(400).render('login', { errors: errorMessages });
            } else {res.send(error)}
        }
    }
    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/login')
        });
    }
}

module.exports = SessionController;

