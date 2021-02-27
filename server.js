const express = require('express')
const app = express()
const env = require('dotenv')
const route = require('./route')
const cors = require('cors')

const options = {
    origin: 'http://localhost:3000/api/*'
}
app.use(cors(options))
env.config();

const bodyParser = require('body-parser')
app.use(bodyParser.json({ }))
app.use(bodyParser.urlencoded({ extended: false }))


const port = process.env.PORT || 4500

app.use('/api', route);


app.listen(port, () => {
    console.log('taskList is listening...')
})