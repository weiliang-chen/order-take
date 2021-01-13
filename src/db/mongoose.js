///Users/user/mongodb/bin/mongod.exe --dbpath=/Users/user/mongodb-data
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

