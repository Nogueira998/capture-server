const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema({
  description: { type: String , required: true},
  author:{ type: String , required: true},
  commentOwner: { type: Types.ObjectId, ref: "User" , required:true},
  postId: { type: Types.ObjectId, ref: "Post", required: true},
});

const CommentModel = model("Comment", CommentSchema);

module.exports = CommentModel;
