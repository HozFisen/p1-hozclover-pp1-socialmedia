const { User, UserProfile, Category, Post } = require('../models/index');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

class userController {
    // SESSION MANAGER
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
                role: 'user'
            })
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.send(error)
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
                res.redirect("/")
            } else {
                res.redirect("/login")
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    static logout(req,res) {
        req.session.destroy(() => {
            res.redirect('/login')
        });
    }
}

module.exports = userController;

