const express = require('express')
const app = express()
const RouterIndex = require('./routes/routerIndex')
const RouterUser = require('./routes/routerUser')
const port = 4000

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

app.use('/user', RouterUser)
app.use('/todo', RouterIndex)


app.listen(port, () => console.log(`Server Running at port ${port}`)) 