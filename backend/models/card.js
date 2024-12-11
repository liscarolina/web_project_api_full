const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: function (v) {
        const regex =
          /^(http|https):\/\/([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}(:\d+)?(\/[A-Za-z0-9\-._~:/?%#&=]*)?$/;
        return regex.test(v);
      },
      message: "Lo siento. Debes ingresar una URL valida",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
