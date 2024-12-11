import headerLogo from "../images/header-logo.svg";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ handleLogOut, email }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  useEffect(() => {
    console.log("useLocation", location.pathname);
  }, [location]);

  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Logo de Alrededor de los EEUU"
      />
      {currentUser && currentUser._id && (
        <>
          <div className="header__container">
            <p className="header__email">{email}</p>
            <a className="header__logout-link" onClick={handleLogOut}>
              Cerrar sesión
            </a>
          </div>
        </>
      )}
      {location.pathname === "/login" && (
        <Link to="/register" className="header__register-link">
          Regístrate
        </Link>
      )}
      {location.pathname === "/register" && (
        <Link to="/login" className="header__login-link">
          Iniciar sesión
        </Link>
      )}
    </header>
  );
}

export default Header;
