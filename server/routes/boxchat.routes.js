const UserController = require('../controller/boxchat.controller')

module.exports = app => {
    app.get('/users', UserController.getAll)
    app.get('/user/:username', UserController.findOne)
    app.post("/user", UserController.addUser)
}
