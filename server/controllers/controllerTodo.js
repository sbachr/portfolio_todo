const Task = require('../models/modelTodo')


module.exports = {

    getDataTask: (req, res) => {

        Task.find()
            .then(task => {
                res.status(200).json({
                    msg: `Find all Tasks`,
                    task: task
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Can't find any Tasks`,
                    err: err.message
                })
            })
    },

    createTask: (req, res) => {

        Task.create({
                task: req.body.task,
                description: req.body.description,
                status: false,
                deadline: new Date(req.body.deadline),
            })
            .then(task => {
                console.log(task)
                res.status(200).json({
                    msg: `Task has been created`,
                    task: task
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: `Creating task has been failed`,
                    error: err.message
                })
            })
    },

    removeTask: (req, res) => {

        Task.deleteOne({__id : req.body.id} )
        .then(task => {
            res.status(200).json({
                msg : `data has been deleted`,
                task : task
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : `Delete data has been failed`,
                error : err.message
            })
        })
    },

    updateTask : (req,res) => {
        let where = {_id : req.params.id}
        let value = {
            $set : {
                task: req.body.task,
                description: req.body.description,
                status: req.body.status,
                deadline: new Date(req.body.deadline),
            }
        }
        Task.updateOne(where, value)
        .then(task => {
            res.status(200).json({
                msg : `Task has been updated`,
                task : task
            })
        })
        .catch(err => {
            res.status(200).json({
                error : err.message
            })
        })
    }
}