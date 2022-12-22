const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { JSONCookies } = require('cookie-parser')
const { user_modal } = require('../modals/user_Authenticate.modals')
const SECRET_KEY = process.env.SECRET_KEY

const verify_middleware = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]

    const decoded = jwt.verify(token, SECRET_KEY, async function (err, decoded) {

        if (err) {
            return res.status(401).json({ error: 'You Must be logged in first' })
        }

        await user_modal.findById({ _id: decoded.User_id }).then((userdata) => {
            req.user = userdata

            req.user.password = undefined

            next()
        })


    });



}

module.exports = { verify_middleware }