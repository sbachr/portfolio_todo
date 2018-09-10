const Router = require('express').Router()
const { login, loginFacebook , findUser} = require('../controllers/controllerAuth')

Router.post('/sign', login)
// Router.post('/fb', loginFacebook )
Router.post('/fb', findUser)


module.exports = Router