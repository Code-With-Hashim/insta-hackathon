const mongoose = require('mongoose')

const user_post_schema = mongoose.Schema({
    username: { type: String, required: true },
    user_id: { type: String, required: true },
    video: { type: String },
    img: { type: String },
    caption: { type: String },
    location: { type: String },
}, {
    versionKey: false,
    timestamps: true
})

const user_post_modal = mongoose.Schema("user_post_collection", user_post_schema)

module.exports = { user_post_modal }