import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({ onRegister, children }) => {
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
    onRegister(data).catch(() => {});
  };

  return (
    <>
      {children}
      <div className="register__container">
        <h1 className="register__welcome">Regístrate</h1>
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
            Regístrate
          </button>
        </form>
        <div className="register__signin">
          <span>¿Ya eres miembro? </span>
          <Link to="/login" className="register__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
