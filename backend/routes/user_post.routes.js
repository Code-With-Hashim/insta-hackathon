const express= require('express');
const {user_post_modal} = require("../modals/user_post.modal");
const PostRouter = express.Router();

// creating a PostRouter
var multer  = require('multer')
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name :process.env.cloud_name,
  api_key:process.env.api_key,
  api_secret:process.env.api_secret
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

PostRouter.post("/create",upload.single('post_image'),async(req,res)=>{
    const payload = req.body;
    console.log(payload);
    if(payload.username &&  payload.user_id){
        let result = await cloudinary.uploader.upload(req.file.path);
        // console.log(result);
        payload.img = result.url;
        let data = await user_post_modal(payload);
        data.save();
        // res.send(payload);
        res.send({msg:"Post created successfully!"})
    }else{
        res.status(400).send({msg:"Something wents wrong"});
    }
})
PostRouter.get("/", async (req, res) => {
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
PostRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    console.log(payload);
    if(payload.username &&  payload.user_id){
        let data = await user_post_modal(payload);
        data.save();
        res.send({msg:"Post created successfully!"})
    }else{
        res.status(400).send({msg:"Something wents wrong"});
    }
})

module.exports = {PostRouter};
