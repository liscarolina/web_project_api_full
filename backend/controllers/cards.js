const Card = require("../models/card");
const { NotFoundError } = require("../middlewares/errors/notfounderror");
const { ReqError } = require("../middlewares/errors/reqerror");
const { AuthError } = require("../middlewares/errors/autherror");

const getCards = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Recurso no encontrado");
      }
      res.send(card);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new ReqError("Datos invalidos o incompletos");
      }
      Card.findById(card._id)
        .populate(["owner", "likes"])
        .then((cardFull) => {
          res.send(card);
        });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun tarjeta con ese Id");
    })
    .then((card) => res.send({ status: true }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])

    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun tarjeta con ese Id");
    })
    .then((card) => res.send(card))
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .orFail(() => {
      throw new AuthError("Se requiere autorizacion");
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard, likeCard, unlikeCard };
