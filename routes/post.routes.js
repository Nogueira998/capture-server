const router = require("express").Router();
const PostModel = require("../models/Post.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

// Crud (Create) => POST
router.post("/upload", async (req, res, next) => {
  try {
    const result = await PostModel.create(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// cRud (Create) => READ
router.get("/sync", async (req, res, next) => {
    try {
      const result = await PostModel.find();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

module.exports = router;
