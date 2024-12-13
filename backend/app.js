const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/card");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors("*"));
app.listen(PORT, () => {});

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(userRoutes);
app.use(cardRoutes);

app.all("*", (req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado prueba1",
  });
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    err,
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});
