function auth(req, res, next) {
    if (req.session.userId) {console.log("AUTHENTICATED!"); return next()};
    res.redirect('/login')
}

module.exports = {auth}