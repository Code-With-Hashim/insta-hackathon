require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { connect } = require("./config/db");
const fs = require("fs");
const { getUser, adduser } = require("./chat_app_user");
const {
  User_Authenticated_Router,
} = require("./routes/user_Authenticate.routes");
const { verify_middleware } = require("./middlewares/user_verify.middlewares");

const { PostRouter } = require("./routes/user_post.routes");
const app = express();
app.use(cors());
const http_Server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const io = new Server(http_Server);

io.on("connection", (socket) => {
  socket.on("join", ({ name }, callback) => {
    const { error, user } = adduser({ id: socket.id, name });
    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "server",
      text: `${user.name} welcome in our app`,
    });
    callback();
  });
  socket.on("sendMessage", ({ user_id, Message }, callback) => {
    let user = getUser(socket.id);
    io.to(user_id).emit("userData", {
      username: user.name,
      Message,
    });
    callback();
  });

  socket.on("newText", (message) => {
    io.to(socket.id).emit("newText", message);
  });
});

app.use("/", User_Authenticated_Router);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use("/", PostRouter);
http_Server.listen(8080, async () => {
  try {
    await connect;
    console.log("Database is connected Successfully");
    console.log("Listening on port 8080");
  } catch (error) {}
});
