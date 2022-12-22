require('dotenv').config()
const express = require('express')
const { connect } = require('./config/db')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send({ message: 'Hello World' }))
app.listen(8080, async () => {
    await connect
    console.log('Database is connected')
    console.log('Listening on port 8080')
})