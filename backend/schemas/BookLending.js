const mongoose = require('mongoose')

let BookLending = mongoose.Schema({
    maxnobooksstudent: {
        type: Number,
        required: true
    },

    maxnobookslecturer: {
        type: Number,
        required: true
    },

    maxnodaysstudent: {
        type: Number,
        required: true
    },

    maxnodayslecturer: {
        type: Number,
        required: true
    },

    penaltystudent: {
        type: Number,
        required: true
    },

    penaltylecturer: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('booklending', BookLending)