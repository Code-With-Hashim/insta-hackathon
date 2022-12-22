const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { JSONCookies } = require('cookie-parser')
const SECRET_KEY = process.env.SECRET_KEY

const verify_middleware = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]

    const decoded = jwt.verify(token, SECRET_KEY, function (err, decoded) {

        if (decoded) {
            return decoded
        } else {
            res.status(401).send({
                message: "Something went wrong Please try again"
            })
        }

    });

    if (decoded) {
        res.cookie('user_data', JSON.stringify(decoded))
        next()
    } else {
        res.status(404).send({
            message: "Something went wrong please try again"
        })
    }

}

module.exports = { verify_middleware }