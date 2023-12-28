// Token middleware
const jwt = require('jsonwebtoken');

function authAdminToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: 'Unauthorized' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err || !payload || payload.role != 'admin') {
            return res.status(403).json({ msg: 'Forbidden' });
        }

        req.user = payload;
        next();
    });
}

function authUserToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: 'Unauthorized' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err || !payload || payload.role != 'user') {
            return res.status(403).json({ msg: 'Forbidden' });
        }

        req.user = payload;
        next();
    });
}

module.exports = {
    authAdminToken,
    authUserToken,
};
