const User = require('../models/modelUser')

module.exports = {

    getUser : (req,res) => {

        User.find()
        .then(user => {
            res.status(200).json({
                msg : `User is available`,
                user : user
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : `User is not available`,
                error : err
            })
        })
    },

    addUser : (req,res) => {
        
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        .then(user => {
            res.status(200).json({
                msg : `User has been Created`,
                user : user
            })
        })
        .catch(err => {
            res.status(200).json({
                msg : `Error creating user`,
                err : err.message
            })
        })
    }
}