const express = require('express')
const app = express()
// const fbLogin = require('./routes/fbLogin');
const RouterIndex = require('./routes/routerIndex')
const RouterUser = require('./routes/routerUser')
const RouterAuth = require('./routes/routerAuth')

const port = 3000

// cors
const cors = require('cors')
app.use(cors())

// mongoose database
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/db_todo_portfolio`, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on(`error`, console.error.bind(console, `connect error:`))
db.once(`open`, function (){
    console.log(`Database is connect to mongo`);
})

// express 
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// app.use('/fb-login', fbLogin)
app.use('/user', RouterUser)
app.use('/signin', RouterAuth)
app.use('/home', RouterIndex)


app.listen(port, () => console.log(`Server Running at port ${port}`)) 