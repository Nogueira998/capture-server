const { Schema, model, Types  } = require("mongoose");

const PostSchema = new Schema({
  caption: { type: String },
  userOwner: [{ type: Types.ObjectId, ref: "User" }],
  image: { type: String },
  date: {type:Date , default: Date.now},
  comments: [{ type: Types.ObjectId, ref: "Comment" }]
});

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
