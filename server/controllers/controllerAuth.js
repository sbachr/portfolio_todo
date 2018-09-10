const User = require('../models/modelUser')
const axios = require('axios')
const FB = require('fb')
var jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

    login: (req, res) => {

        let email = req.body.email
        let password = req.body.password

        User
            .findOne({
                email: email
            })
            .then(function (user) {
                if (user) {
                    let hash = user.password
                    user
                        .comparePassword(password, function (err, isMatch) {
                            if (isMatch) {
                                var token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.tokenSecretKey);
                                console.log("dari server token :", token)
                                res
                                    .status(200)
                                    .json({
                                        msg: "login successfully",
                                        token: token,
                                    })
                            } else {
                                res
                                    .status(401)
                                    .json({
                                        msg: "wrong password"
                                    })
                            }

                        })
                } else {
                    res
                        .status(400)
                        .json("email unregister")
                }
            })
            .catch(function (err) {
                res
                    .status(401)
                    .json({
                        msg: err.message
                    })
            })
        console.log(email, password)
    },

    loginFacebook: (req, res) => {
        console.log('ini headers ==========================================>',req.headers)
        let tokenFb = req.body.accessToken
        console.log("<=======================================", tokenFb)
        FB.api('me', {
            fields: ['id', 'name', 'email'],
            access_token: tokenFb
        },
            function (resFb) {
                console.log(resFb.email)
                let email = resFb.email
                User
                    .findOne({ email: email })
                    .then(function (user) {
                        console.log(user)
                        if (user) {
                            console.log("ada user nya", user)
                            var token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.tokenSecretKey);

                            console.log("dari server token (ada user):", token)
                            res
                                .status(200)
                                .json(token)
                        } else {
                            let name = resFb.name.split(' ')
                            let password = name[0] + 'hacktiv8'
                            console.log("password====>", password)
                            User
                                .create({
                                    name: resFb.name,
                                    email: resFb.email,
                                    password: password,
                                })
                                .then(function (user) {
                                    var token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.tokenSecretKey);
                                    console.log("dari server token (user baru):", token)
                                    res
                                        .status(200)
                                        .json(token)
                            
                                })
                                .catch(function (err) {
                                    res
                                        .status(400)
                                        .json(err)
                                })
                        }
                    })
                    .catch(function (err) {
                        res
                            .status(400)
                            .json({
                                msg: err.message
                            })
                    })
            })
    },

    findUser : function(req,res){
        //*Axios Request
        axios({
          method:'get',
          url:`https://graph.facebook.com/me?fields=id,name,email&&access_token=${req.body.token}`
        })
        .then((response)=> {
          //*Check if user already in database
          User.find({},(err,users)=>{
            if(!err){
              if(users.length===0){
                User.create({
                  name : response.data.name,
                  email : response.data.email
                }, (err,instance)=>{
                  if(!err){
    
                  }
    
                  else{
                    res.status(500).json({
                      msg : "failed adding data"
                    });
                  }
                });
              }
    
              else{
                console.log()
                User.findOne({ email: response.data.email }, function (err, data) {
                  if(!err){
                    jwt.sign({
                      email : data.email,
                      role : data.role,
                      name : data.name
                    }, process.env.JWT_SECRET,( err,token )=>{
                      if( err ){
                        res.status( 500 ).json({
                          msg : err.message
                        });
                      }
                      else{
                        console.log(token);
                        res.status( 200 ).json({
                          mesg : 'login success',
                          token : token,
                          email : data.email
                        });
                      }
                    });
                  }
                });
              }
            }
    
            else{
              res.status(500).json({
                msg : "error connecting to database"
              });
            }
          });
    
        })
        .catch(err=>{
          console.log('error ey');
          res.send(err);
        });
      }
}