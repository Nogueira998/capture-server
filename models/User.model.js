const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
  pictureUrl: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/df3hkyurq/image/upload/v1633033999/user_pictures/avatar_rgbw6g.png",
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
