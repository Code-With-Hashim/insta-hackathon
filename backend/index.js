require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const http = require('http')
const { connect } = require('./config/db')
const { User_Authenticated_Router } = require('./routes/user_Authenticate.routes')
const { verify_middleware } = require('./middlewares/user_verify.middlewares')

const app = express()

const http_Server = http.createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/", User_Authenticated_Router)

app.get('/', verify_middleware, (req, res) => {
    
})
http_Server.listen(8080, async () => {
    try {

        await connect
        console.log('Database is connected Successfully')
        console.log('Listening on port 8080')

    } catch (error) {

    }
})