const router = require("express").Router();
const PostModel = require("../models/Post.model");
const CommentModel = require("../models/Comment.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { ObjectId } = require("mongoose").Types;
/* --------------------------------------------------------------------------------- */
// Crud (Create) => POST
router.post("/upload", isAuthenticated, attachCurrentUser, (req, res, next) => {
  // Os dados enviados pelo cliente (pode ser o Insomnia ou o Axios no React) estarão no objeto req.body
  console.log(req.body);
  // Inserindo os dados no banco
  PostModel.create({ ...req.body, userOwner: req.user._id }) // req.user é um objeto criado pelo middleware isAuthenticated e o nome 'user' é definido pela chave "userProperty"
    .then((result) => {
      // Result vai ser o objeto criado no MongoDB
      return res.status(201).json(result);
    })
    // Repassando o erro para o route listener de captura de erros padrão
    .catch((err) => next(err));
});
/* --------------------------------------------------------------------------------- */
// cRud (Read) => GET (Lista)
router.get("/sync", isAuthenticated, (req, res, next) => {
  console.log(req.user);
  PostModel.find()
    .populate("comments")
    .populate({
      path: "userOwner",
      model: "User",
      select: { _id: 1, name: 1, pictureUrl: 1 },
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => next(err));
});
/* --------------------------------------------------------------------------------- */
// cruD (Delete) => DELETE
router.delete(
  "/remove/:id",
  isAuthenticated,
  attachCurrentUser,
  (req, res, next) => {
    PostModel.deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        if (result.deletedCount < 1) {
          return res.status(404).json({ msg: "Projeto não encontrado" });
        }
        // Deletar todas os comentários relacionados
        CommentModel.deleteMany({ postId: ObjectId(req.params.id) })
          // Por convenção do HTTP, devemos retornar um objeto vazio no sucesso da deleção
          .then(() => res.status(200).json({}));
        // Por convenção do HTTP, devemos retornar um objeto vazio no sucesso da deleção
      })
      .catch((err) => next(err));
  }
);
/* --------------------------------------------------------------------------------- */
module.exports = router;

