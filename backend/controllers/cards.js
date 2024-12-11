const Card = require("../models/card");
const NotFoundError = require("../middlewares/errors/notfounderror");
const ReqError = require("../middlewares/errors/reqerror");
const AuthError = require("../middlewares/errors/autherror");

const getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Recurso no encontrado");
      }
      res.send({ data: card });
    })
    .catch(next);
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new ReqError("Datos invalidos o incompletos");
      }
      res.send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun tarjeta con ese Id");
    })
    .then((card) => res.send({ status: true }))
    .catch(next);
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )

    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun tarjeta con ese Id");
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new AuthError("Se requiere autorizacion");
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
