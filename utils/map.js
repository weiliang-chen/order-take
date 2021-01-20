const request = require('request')

const distance = (lat1, long1, lat2, long2, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=meter&origins='+ encodeURIComponent(lat1)+','+encodeURIComponent(long1)+'&destinations='+encodeURIComponent(lat2)+','+encodeURIComponent(long2)+'&key='+process.env.MAP_API

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to google service!', undefined)
        } else if (body.rows[0].elements[0].status == "NOT_FOUND") {
            callback('Unable to find the location. Try another search', undefined)
        } else {
            callback(undefined, {
                distance: body.rows[0].elements[0].distance.text                  
            })  
        }
    })
}

module.exports = distance

