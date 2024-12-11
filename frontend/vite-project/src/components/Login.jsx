import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({ onLogin, children }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data).catch((error) => {
      console.error("Credenciales inválidas");
      console.error(error);
    });
  };

  return (
    <>
      {children}
      <div className="register__container">
        <h1 className="register__welcome">Inicia Sesión</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            className="register__input"
            placeholder="Correo electrónico"
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
          />

          <input
            className="register__input"
            placeholder="Contraseña"
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />

          <button type="submit" className="register__button">
            Inicia sesión
          </button>
        </form>
        <div className="register__signin">
          <span>¿Aún no eres miembro? </span>
          <Link to="/register" className="register__login-link">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
