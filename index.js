const _ = require('lodash')
const async = require('async')
const geocoder = require('node-geocoder').getGeocoder('google', 'http')

var city

async.whilst(
  // () => city === undefined || city.state !== 'Germany',
  () => city === undefined,
  (callback) => {
    async.parallelLimit(_.times(9, () => geo), 3, callback)
  },
  (err) => {
    console.log(err || city)
  }
)

function geo (callback) {
  const lat = Math.random() * 360
  const long = Math.random() * 360

  console.log(`Trying ${lat}, ${long}`)

  geocoder.reverse(lat, long, (err, res) => {
    if (!err) {
      city = res
      return callback(null, res)
    }
    if (err && err.message.match(/ZERO_RESULTS/)) return callback(null)
    callback(err)
  })
}
