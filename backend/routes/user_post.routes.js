const express = require('express');
const { user_post_modal } = require("../modals/user_post.modal");
const PostRouter = express.Router();

// creating a PostRouter
var multer = require('multer');
const { verify_middleware } = require('../middlewares/user_verify.middlewares');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;


PostRouter.use(verify_middleware)
// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

// upload.single('post_image')

PostRouter.post("/create", async (req, res) => {
    const { title, body, photo } = req.body;

    try {

        const post_create = new user_post_modal({
            title,
            body,
            photo,
            postedBy: req.user
        })

        post_create.save().then((post) => res.json(post))

    } catch (error) {
        console.log(error)
    }

})
PostRouter.get("/allUserPost", async (req, res) => {

    const params = req.query
    try {
        const users = await user_post_modal.find(params)
        res.status(200).json(users)
    }
    catch (err) {
        console.log(err)
        res.status(401).send({
            message: "Users Data not found",
            status: "Failed"
        })
    }

})

// creating a PostRouter

PostRouter.put("/likes", async (req, res) => {

    try {

        const data = await user_post_modal.findOne({ _id: req.body.postId, likes: req.user._id })

        if (data) {
            res.status(422).json({
                msg: 'You re already liked it'
            })
        } else {

            await user_post_modal.findByIdAndUpdate({ _id: req.body.postId }, {
                $push: { likes: req.user._id }
            }, {
                new: true
            }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(422).json({ msg: 'Something went wrong' })
                }
                res.json(result)
            })

        }


    } catch (error) {
        console.log(error)
    }

})

PostRouter.put("/unlikes", async (req, res) => {

    try {

        const data = await user_post_modal.updateOne({ _id: req.body.postId }, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ msg: 'Something went wrong, please try again' })
            }

            res.json({ msg: 'You Disliked it' })
        })

    } catch (error) {
        console.log(error)
    }

})

PostRouter.put("/comments", async (req, res) => {

    try {
        
        await user_post_modal.findByIdAndUpdate({ _id: req.body.postId }, {
            $push:  {comments: {
                _id : new mongoose.Types.ObjectId,
                username : req.user.username,
                name : req.user.full_name,
                text : req.body.text
            }} 
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                console.log(err)
                return res.status(422).json({ msg: 'Something went wrong' })
            }
            res.json(result)
        })

    } catch (error) {
        console.log(error)
    }

})

PostRouter.put("/uncomments", async (req, res) => {

    try {
        
        await user_post_modal.updateOne({ _id: req.body.postId }, {
             $pull : {
                comments : {
                    _id : req.body.comments_id,
                    username : req.user.username
                }
             }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                console.log(err)
                return res.status(422).json({ msg: 'Something went wrong' })
            }
            res.json(result)
        })

    } catch (error) {
        console.log(error)
    }

})

module.exports = { PostRouter };
