const User = require('../model/boxchat.model')

module.exports = {

    getAll: (req, res) =>{
        User.find({})
            .then(allUsers => res.json({allUsers}))
    },
    findOne:(req, res) => {
        User.findOne({userName : req.params.username})
            .then(user=> res.json(user))
            .catch(err => res.json(err))
    },
    addUser: (req, res) => {
        User.create(req.body)
            .then(newUser => res.json({newUser}))
            .catch(err => res.status(400).json(err))
    },
}