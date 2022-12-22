const express= require('express');
const {user_post_modal} = require("../modals/user_post.modal");
const PostRouter = express.Router();

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
