const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    origin: {
        type: Array,
        required: true,
        length: 2,
        validate (value) {
            if (typeof value[0] !== "string" || typeof value[1] !== "string") {
                throw new Error('Please enter correct coordinate')                
            }

            if (!validator.isLatLong(value[0] +","+ value[1])) {
                throw new Error('Please enter correct coordinate')
            }
        }       
    },
    destination: {
        type: Array,
        required: true,
        length: 2,
        validate (value) {
            if (typeof value[0] !== "string" || typeof value[1] !== "string") {
                throw new Error('Please enter correct coordinate')                
            }

            if (!validator.isLatLong(value[0] +","+ value[1])) {
                throw new Error('Please enter correct coordinate')
            }
        }    
    },
    status: {
        type: String
    }
})

const Order = mongoose.model('Order', userSchema)

module.exports = Order