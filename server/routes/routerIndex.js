const Router = require('express').Router()
const { getDataTask, createTask, removeTask, updateTask } = require('../controllers/controllerTodo')

Router.get('/', getDataTask)
Router.post('/create', createTask)
Router.delete('/remove/:id', removeTask)
Router.put('/update/:id', updateTask)


module.exports = Router