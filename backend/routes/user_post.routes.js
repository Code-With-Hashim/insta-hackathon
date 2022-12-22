routes.patch("/:id", async (req, res) => {
  const { id } = req.params;

  //   const token = req.headers.authorization?.split(" ")[1];

  //   if (token) {
  //     const decoded = jwt.verify(token, SECRET_KEY, function (err, decoded) {
  //       if (err) {
  //         res.status(404).send("Please login to access the endpoint");
  //       } else {
  //         return decoded;
  //       }
  //     });
  //   }
  //   if (decoded) {
  //     const { userID } = decoded;

  //     req.body.userID = userID;
  //   }

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
