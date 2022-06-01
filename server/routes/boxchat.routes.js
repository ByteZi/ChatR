const UserController = require('../controller/boxchat.controller')
const { authenticate } = require ('../config/jwt.config')

module.exports = app => {
    app.get('/test', UserController.getAll)
    app.get('/user/:username', UserController.findOne)
    app.post("/user/", UserController.register)
    app.get('/user/:user',UserController.login)
}
