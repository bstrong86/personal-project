const bcrypt = require('bcryptjs')
module.exports = {
    login: async (req, res) => {
        const {username, password} = req.body
        const {session} = req
        const db = req.app.get('db')
        let user = await db.login({ username })
        user = user[0]
            if(!user) {
                return res.sendStatus(404)
            }
        let authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
            session.user = user
            res.status(200).send(session.user)
        }else { res.sendStatus(401) 
        }
    },
    register: async (req, res) => {
        const {username, password, profile_pic} = req.body
        const {session} = req
        const db = req.app.get('db')
        let takenUsername = await db.check_username({username})
        takenUsername = +takenUsername[0].count
        if (takenUsername !== 0) {
            return res.sendStatus(409)
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let user = await db.register({username, password: hash, profile_pic})
        user = user[0]
        console.log(user)
        console.log(session)
        session.user = user
        console.log(session)
        res.status(200).send(session.user)
    },
    createWorkout: async (req, res) => {
        try{
            const {workout_name} = req.body
            const {id} = req.params
            let users_id = id
            const db = req.app.get('db')
            let takenWorkoutName = await db.check_workout_name({workout_name, users_id})
            console.log(takenWorkoutName)
            takenWorkoutName = +takenWorkoutName[0].count
            if (takenWorkoutName !== 0) {
                return res.sendStatus(401)
            }
            let workout = await db.create_workout(workout_name, users_id)
            workout = workout[0]
            res.status(200).send(workout)
        } catch (err) {
            console.log(err)
        }
    },
    addExercise:async (req, res) => {
        const {name, sets, reps} = req.body
        const db = req.app.get('db')
        let exercise = await db.add_exercise({name, sets, reps})
        exercise = exercise[0]
    },
    getUser: async (req, res) => {
        const {user} = req.session
            if(user) {
                res.status(200).send(user)
            } else {
                res.sendStatus(401)
            }
    },
    logout: (req, res) => {
        req.session.destroy(function(){
            res.sendStatus(200)
        })

    },
    getWorkouts: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            let workouts = await db.get_workouts(id)
            res.status(200).send(workouts)
        }catch (err) {
            console.log(err + ' get workoutserror')
        }
    },
    getExercises: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            let exercises = await db.get_exercises(id)
            res.status(200).send(exercises)
        } catch (err){
            console.log(err)
        }
    }
    
}