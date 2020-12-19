const mongoose = require('mongoose')

let CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('category', CategorySchema)