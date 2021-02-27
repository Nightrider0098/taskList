const env = require('dotenv');
env.config();
const mongoose = require('mongoose')
const mongo_URL = process.env.MONGO_URI


mongoose.connect(mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(e => {
    console.log('sucessfully connected')
});

module.exports = mongoose