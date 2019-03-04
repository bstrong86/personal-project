// const bcrypt = require('bcryptjs')
module.exports = {
    login: async (req, res) => {
        const {username, password} = req.body
        console.log(req.body)
        const db = req.app.get('db')
        let user = await db.login({ username })
        user = user[0]
            if(!user) {
                return res.sendStatus(404)
            }
        if (password === user.password) {
            delete user.password
            res.status(200).send(user)
        }
        // res.status(200).send()
    }
}