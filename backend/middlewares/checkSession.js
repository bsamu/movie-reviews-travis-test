const jwt = require('jsonwebtoken');

const checkSession = () => (req, res, next) => {
    const sessionToken = req.body.token;
    console.log(`checking session with the following sessionToken: ${sessionToken}`)
    if (!sessionToken) return res.sendStatus(401);
    const verified = jwt.verify(sessionToken, process.env.JWT_SECRET);
    if (!verified) return res.sendStatus(401);
    next();
}

module.exports = checkSession;