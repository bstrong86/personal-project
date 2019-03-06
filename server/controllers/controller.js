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
        const {name} = req.body
        const db = req.app.get('db')
        let workout = await db.create_workout({name})
        workout = workout[0]
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
    }
    
}