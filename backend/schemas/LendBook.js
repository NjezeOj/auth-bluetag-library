const mongoose = require('mongoose')

let LendBookSchema = mongoose.Schema({
    category: {
        type: String,
        required: false
    },

    title: {
        type: String,
        required: false,
        trim: true
    },

    callnumber: {  //primarykey
        type: String,
        required: false
    },

    author: {
        type: String,
        required: false,
        trim: true
    },

    pubyear: {
        type: Number,
        required: false
    },

    volume: {
        type: String,
        required: false
    },

    size: {
        type: String,
        required: false
    },

    lenddate: {
        type: Date,
        required: false
    },

    returndate: {
        type: Date,
        required: false
    },


    logtype: {
        type: Boolean,
        required: false
    },

    expectedreturndate: {
        type: Date,
        required: false
    },

    borrowertype: {
        type: String,
        required: false
    },

    comments: {
        type: String,
        required: false,
        trim: false
    },

    penalty: {
        type: Number,
        required: false //default 0 naira
    },

    defaulteddays: {
        type: Number,
        required: false
    },

    hasitbeenreturned: {
        type: Boolean,
        required: false
    },

    regno: {
        type: String,
        required: true
    }


    /*user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }*/

})

module.exports = mongoose.model('lendbook', LendBookSchema)