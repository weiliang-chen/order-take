const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = new mongoose.Schema({
    origin: {
        type: Array,
        required: true,
        length: 2,
        validate (value) {
            if (!validate_latlong(value)) {
                throw new Error('Please enter correct coordinate')    
            }
        }       
    },
    destination: {
        type: Array,
        required: true,
        length: 2,
        validate (value) {
            if (!validate_latlong(value)) {
                throw new Error('Please enter correct coordinate')    
            }
        }    
    },
    status: {
        type: String
    },
    distance: {
        type: String
    }
})

function validate_latlong(value) {
    if (typeof value[0] !== "string" || typeof value[1] !== "string") {
        return false              
    }

    if (!validator.isLatLong(value[0] +","+ value[1])) {
        return false
    }

    return true
}

orderSchema.methods.toJSON = function () {
    const order = this
    const orderObject = order.toObject()

    delete orderObject.__v

    return orderObject
}

const Order = mongoose.model('Order', orderSchema)

module.exports = Order