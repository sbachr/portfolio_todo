const Router = require('express').Router()
const { getUser, addUser} = require('../controllers/controllerUser')


Router.get('/data', getUser)
Router.post('/add', addUser)

module.exports = Router