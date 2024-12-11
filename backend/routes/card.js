const cardRouter = require("express").Router();
const { auth } = require("../middlewares/auth");
const { celebrate, Joi } = require("celebrate");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");

cardRouter.use(auth);

cardRouter.get("/cards", getCards);
cardRouter.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(3),
    }),
  }),
  createCard
);
cardRouter.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum(),
    }),
  }),
  deleteCard
);
cardRouter.put(
  "/cards/likes/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum(),
    }),
  }),
  likeCard
);
cardRouter.delete(
  "/cards/likes/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum(),
    }),
  }),
  unlikeCard
);

module.exports = cardRouter;
