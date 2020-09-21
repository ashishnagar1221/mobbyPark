const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();
const PORT = process.env.PORT || 3600

app.use(bodyParser.json())

console.log(process.env.DATABASE)
mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed", err));


app.use('/',require('./routes/routes'))

app.listen(PORT,() =>{
    console.log(`Server running at ${PORT}`)
})