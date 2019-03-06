require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    sessions = require('express-session'),
    massive = require('massive'),
    ctrl = require('./controllers/controller')
    
const app = express()
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

app.use(bodyParser.json())
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected to db')
})
app.use(sessions({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000000000}
}))

app.get('/auth/current', ctrl.getUser)
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)
app.post('/auth/register', ctrl.register)
app.post('/auth/workouts/:userid', ctrl.createWorkout)
app.post('/auth/exercise/:workoutid', ctrl.addExercise)


app.listen(SERVER_PORT, () => console.log(`Working on port ${SERVER_PORT}`))
