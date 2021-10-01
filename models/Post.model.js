const { Schema, model } = require("mongoose");

const PostModel = new Schema({
  caption: { type: String },
  user: { type: String },
  image: { type: String },
  comments: [],
});

const PostModel = model("Post", UserSchema);

module.exports = PostModel;
