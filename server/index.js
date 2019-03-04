require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    ctrl = require('./controllers/controller')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

app.use(bodyParser.json())
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected to db')
})

app.post('/auth/login', ctrl.login)




app.listen(SERVER_PORT, () => console.log(`Working on port ${SERVER_PORT}`))
