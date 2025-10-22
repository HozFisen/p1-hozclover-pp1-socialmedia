const {User, UserProfile, Post} = require('../models/index');
 
class Controller {
    static async posts (req, res) {
        try {
            let data = await Post.findAll()
            res.render('index', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async getRegister (req, res){
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }
    static async postRegister (req, res){
        try {
            const {email, username, password} = req.body;
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
    static async getLogin (req, res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async postLogin (req, res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async getUser (req, res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async postUser (req, res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async getPost (req, res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    static async postPost (req, res){
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = Controller;