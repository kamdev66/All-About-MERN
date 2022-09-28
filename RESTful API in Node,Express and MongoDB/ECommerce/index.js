const express = require('express')
const app = express()
const port = 5000

const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/ECOM')

//userRoute
const user_routes=require('./routes/userRoute')
app.use('api',user_routes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))