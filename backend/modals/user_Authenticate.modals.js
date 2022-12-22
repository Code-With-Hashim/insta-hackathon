const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    profile_img : {type : String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    full_name: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

const user_modal = mongoose.Schema("user_collection", user_schema)

module.exports = { user_modal }