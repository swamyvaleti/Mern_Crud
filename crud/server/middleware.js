const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        // tokens ni header lo send cheskuntam
        let token = req.header('x-token');
        if (!token) {
            return res.status(400).send('token not found');
        }
        let decode = jwt.verify(token, 'jwtSecret');
        req.user = decode.user;
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
    }
}