const mongoose = require('mongoose')
const  {ObjectId}  = mongoose.Schema.Types

const user_post_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{ type: ObjectId, ref: "user_collection" }],
    comments: [{ type: ObjectId, ref: "user_collection" }],
    postedBy: {
        type: ObjectId,
        ref: "user_collection"
    }

}, {
    versionKey: false,
    timestamps: true
})

const user_post_modal = mongoose.model("user_post_collection", user_post_schema)

module.exports = { user_post_modal }