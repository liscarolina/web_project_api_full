require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../middlewares/errors/notfounderror");
const ReqError = require("../middlewares/errors/reqerror");
const { AuthError } = require("../middlewares/errors/autherror");

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Recurso no encontrado");
      }
      res.send({ data: user });
    })
    .catch(next);
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun usuario con ese Id");
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, hash });
    })
    .then((user) => {
      if (!user) {
        throw new ReqError("Datos inválidos o icompletos");
      }
      res.send({ data: user });
    })
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario o contraseña inválidos");
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );

      res.send({ token });
    })
    .catch(next);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      throw new ReqError("Datos inválidos o icompletos");
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      throw new new ReqError("Datos inválidos o icompletos")();
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
