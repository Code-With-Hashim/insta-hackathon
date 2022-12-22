const express= require('express');
const {user_post_modal} = require("../modals/user_post.modal");
const PostRouter = express.Router();

PostRouter.get("/users", async (req, res) => {
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

//.......... patch Request

PostRouter.patch("/patch/:id", async (req, res) => {
  const { id } = req.params;

  const { video, img, caption, location, userID } = req.body;
  try {
    const isValid = await user_modal.findOne({ _id: userID });
    var getPost = await user_post_modal.findOne({ postID: id });
    if (isValid) {
      var isUpdate = await user_post_modal.updateOne(
        { postID: id },
        {
          $set: {
            video: video ? video : getPost.video,
            img: img ? img : getPost.img,
            caption: caption ? caption : getPost.caption,
            location: location ? location : getPost.location,
          },
        }
      );
    } else {
      res.status(401).send({
        message: "You're not authorized",
      });
    }
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong",
    });
  }
});



module.exports = {PostRouter};
