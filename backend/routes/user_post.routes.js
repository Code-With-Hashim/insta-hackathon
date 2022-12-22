const express= require('express');
const {user_post_modal} = require("../modals/user_post.modal");
const PostRouter = express.Router();
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