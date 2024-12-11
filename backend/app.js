const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/card");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const app = express();
app.listen(PORT, () => {});

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(express.json()); // para parsear application/json
app.use(express.urlencoded({ extended: true })); // para parsear application/x-www-form-urlencoded, el formato de datos tradicional GET form

app.use(requestLogger);
app.use(userRoutes);
app.use(cardRoutes);

app.all("*", (req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado prueba",
  });
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});
