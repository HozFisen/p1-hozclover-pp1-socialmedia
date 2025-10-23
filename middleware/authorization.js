const { User } = require('../models');

async function authorized(req, res, next) {
    try {
        const targetId = req.params.id;
        const viewerId = req.session.userId;
        const viewerRole = req.session.role;

        const targetUser = await User.findByPk(targetId);

        if (!targetUser) {
            return res.send('User not found');
        }

        // ROLE CHECK
        const isAdmin = viewerRole === 'admin';
        const isOwner = viewerId === targetUser.id;

        if (!isAdmin && !isOwner && targetUser.isPrivate) {
            return res.render('private-profile', { targetUser });
        }

        req.targetUser = targetUser;
        next();
    } catch (error) {
        res.send(error)
    }
}

module.exports = { authorized };
