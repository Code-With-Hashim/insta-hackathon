require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const http = require('http')
const { Server } = require('socket.io')
const { connect } = require('./config/db')
const fs = require('fs')

const { User_Authenticated_Router } = require('./routes/user_Authenticate.routes')
const { verify_middleware } = require('./middlewares/user_verify.middlewares')

const { PostRouter } = require("./routes/user_post.routes");
const app = express()

const http_Server = http.createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

const io = new Server(http_Server)

io.on('connection' , (socket) => {
    socket.on('newText'  ,(message) => {
        io.emit('newText' , message)
    })
    
})

app.use("/", User_Authenticated_Router)

app.get('/',  (req, res) => {
   
    res.sendFile(__dirname + "/index.html")

})
app.use("/",PostRouter)
http_Server.listen(8080, async () => {
    try {
        await connect
        console.log('Database is connected Successfully')
        console.log('Listening on port 8080')

    } catch (error) {

    }
})
