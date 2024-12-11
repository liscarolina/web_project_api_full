const userRouter = require("express").Router();
const auth = require("./middlewares/auth");
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
} = require("../controllers/users");

userRouter.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().min(3),
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

userRouter.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

userRouter.use(auth);

userRouter.get("/users", getUsers);

userRouter.get(
  "/users/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum(),
    }),
  }),
  getUserById
);

userRouter.get(
  "/users/me",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum(),
    }),
  }),
  getUserById
);

userRouter.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser
);

userRouter.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().min(3),
    }),
  }),
  updateUserAvatar
);

module.exports = userRouter;
