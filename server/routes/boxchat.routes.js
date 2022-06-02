const UserController = require('../controller/boxchat.controller')
const { authenticate } = require ('../config/jwt.config')

module.exports = app => {
    app.get('/test', UserController.getAll)

    app.post("/user/", UserController.register)
    app.get('/login/', UserController.login)
    app.get('/logout', UserController.logout)

    // app.get('/user/:userName', UserController.testFind)
}
