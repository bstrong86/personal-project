const bcrypt = require('bcryptjs')
const CryptoJS = require('react-native-crypto-js')
const axios = require('axios')

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
        session.user = user
        res.status(200).send(session.user)
    },
    createWorkout: async (req, res) => {
        try{
            const {workout_name} = req.body
            const {id} = req.params
            let users_id = id
            const db = req.app.get('db')
            let takenWorkoutName = await db.check_workout_name({workout_name, users_id})
            takenWorkoutName = +takenWorkoutName[0].count
            if (takenWorkoutName !== 0) {
                return res.sendStatus(401)
            }
            let workout = await db.create_workout({workout_name, users_id})
            workout = workout[0]
            res.status(200).send(workout)
        } catch (err) {
            console.log(err)
        }
    },
    addExercise:async (req, res) => {
        const {exercise_name, sets, reps, weight} = req.body
        const {id} = req.params
        const db = req.app.get('db')
        let exercise = await db.create_exercise({exercise_name, sets, reps, weight, workouts_id: id})
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
            let users_id = id
            let workouts = await db.get_workouts({users_id})
            res.status(200).send(workouts)
        }catch (err) {
            console.log(err + ' get workoutserror')
        }
    },
    getExercises: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            let exercises = await db.get_exercises({id})
            res.status(200).send(exercises)
        } catch (err){
            console.log(err)
        }
    },
    editExercise: async (req, res) => {
        try{
            const db= req.app.get('db')
            const {sets, reps, weight} = req.body
            const {id} = req.params
            let exercise_id = id
            let exercise = await db.edit_exercise({exercise_id, sets, reps, weight})
            res.status(200).send(exercise)


        } catch (err) { console.log(err) }
    },
    getRecentWorkouts: async (req, res) => {
        try{
            const db = req.app.get('db')
            let workouts = await db.get_recent_workouts()
            res.status(200).send(workouts)
        } catch (err) {
            console.log(err)
        }
    },
    deleteExercise: async (req, res) => {
        try{
            const db = req.app.get('db')
            const {id} = req.params
            let exercise_id = id
            await db.delete_exercise({exercise_id})
        } catch (err){console.log(err)}
    },
    deleteWorkout: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            let workout_id = id
            await db.delete_workout({workout_id})
        } catch (err) {
            console.log(err)
        }
    },
    getMarvelPic: async (req, res) =>{
        const {id} = req.params
        let url =`https://gateway.marvel.com:443/v1/public/characters/${id}?`
        let ts = new Date().getTime()
        let hash = CryptoJS.MD5(ts+process.env.REACT_APP_PRIVATE_API_KEY+process.env.REACT_APP_PUBLIC_API_KEY)
        url +="&ts="+ts+"&apikey="+process.env.REACT_APP_PUBLIC_API_KEY+"&hash="+hash
        image = await axios.get(url)
            res.status(200).send(image.data.data.results[0].thumbnail)
    }
   
}