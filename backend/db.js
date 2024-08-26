const mongoose = require('mongoose')
const mongoupi = 'mongodb://localhost:27017/inotebook'

const connectTomongo = () => {
    mongoose.connect(mongoupi)
    console.log("connected");
}

module.exports = connectTomongo;