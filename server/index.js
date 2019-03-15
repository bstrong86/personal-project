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
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 1000000000}
}))

app.get('/auth/current', ctrl.getUser)

app.post('/auth/login', ctrl.login)

app.post('/auth/logout', ctrl.logout)

app.post('/auth/register', ctrl.register)

app.get('/auth/workouts/:id', ctrl.getWorkouts)

app.post('/auth/workout/:id', ctrl.createWorkout)

app.post('/auth/exercise/:id', ctrl.addExercise)

app.get('/auth/exercises/:id', ctrl.getExercises)

app.put('/auth/exercise/:id', ctrl.editExercise)

app.get('/auth/workouts', ctrl.getRecentWorkouts)

app.delete('/auth/exercise/:id', ctrl.deleteExercise)


app.listen(SERVER_PORT, () => console.log(`Working on port ${SERVER_PORT}`))
