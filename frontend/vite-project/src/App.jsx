import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "../src/blocks/Elements.css";
import successfulRegister from "../src/images/succesful-register.svg";
import errorLogin from "../src/images/error-login.svg";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import Popup from "./components/Popup.jsx";
import api from "./utils/api.js";
import auth from "./utils/auth.js";
import Card from "./components/Card.jsx";
import ImagePopup from "./components/ImagePopup.jsx";
import CurrentUserContext from "./components/contexts/CurrentUserContext.jsx";
import EditAvatarPopup from "./components/EditAvatarPopup.jsx";
import EditProfilePopup from "./components/EditProfilePopup.jsx";
import AddPlacePopup from "./components/AddPlacePopup.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import InfoTooltip from "./components/InfoToolTip.jsx";

function App() {
  const [initialCards, setInitialCards] = useState([]);
  const [currentUser, setUserInfo] = useState({});
  const [currentCard, setCurrentCard] = useState({
    name: "",
    link: "",
  });
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    useState(false);
  const [addCardPopupIsOpened, addCardSetPopoupIsOpened] = useState(false);
  const [editAvatarPopupIsOpened, editAvatarSetPopoupIsOpened] =
    useState(false);
  const [deleteCardPopupIsOpened, deleteCardSetPopoupIsOpened] =
    useState(false);
  const [imageCardPopupIsOpened, imageCardSetPopoupIsOpened] = useState(false);
  const [infoTooltipIsOpened, infoTooltipSetIsOpened] = useState(false);
  const [infoTooltipErrIsOpened, infoTooltipErrSetIsOpened] = useState(false);
  const [currentCardDelete, deleteCurrentCard] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      api.getUserInfo().then((currentUser) => setUserInfo(currentUser));
      api
        .getInitialCards()
        .then((initialCards) => setInitialCards(initialCards));
    }
  }, [isLogin]);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    console.log(token);
    if (token) {
      checkUserInfo();
    } else {
      navigate("/login");
    }
  }, []);

  function onEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function onAddPlaceClick() {
    addCardSetPopoupIsOpened(true);
  }

  function onEditAvatarClick() {
    editAvatarSetPopoupIsOpened(true);
  }

  function onDeleteCardClick(cardId) {
    deleteCardSetPopoupIsOpened(true);
    deleteCurrentCard(cardId);
  }

  function onImageCardClick(name, link) {
    imageCardSetPopoupIsOpened(true);
    setCurrentCard({ name, link });
  }

  function closeAllPopups() {
    imageCardSetPopoupIsOpened(false);
    deleteCardSetPopoupIsOpened(false);
    setIsEditProfilePopupOpened(false);
    editAvatarSetPopoupIsOpened(false);
    addCardSetPopoupIsOpened(false);
    infoTooltipSetIsOpened(false);
    infoTooltipErrSetIsOpened(false);
  }

  function onCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.handleCardLike(card._id, isLiked).then((newCard) => {
      if (newCard) {
        setInitialCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      }
    });
  }

  function onCardDelete(e, card) {
    e.preventDefault();
    api.deleteCard(currentCardDelete).then(() => {
      setInitialCards((state) =>
        state.filter((c) => (c._id === currentCardDelete ? false : true))
      );
    });
    closeAllPopups();
  }

  function handleUpdateUser({ name, about }) {
    api
      .changeProfile(name, about)
      .then(() =>
        setUserInfo((state) => ({ ...state, name: name, about: about }))
      );
    setIsEditProfilePopupOpened(false);
  }

  function handleUpdateAvatar({ link }) {
    api
      .changeAvatar(link)
      .then(() => setUserInfo((state) => ({ ...state, avatar: link })));
    editAvatarSetPopoupIsOpened(false);
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .createCard(newCard.name, newCard.link)
      .then((cardResponse) => setInitialCards([cardResponse, ...initialCards]));
    addCardSetPopoupIsOpened(false);
  }

  function checkUserInfo() {
    auth.getUserInfo().then((data) => {
      console.log(data);
      if (data) {
        setEmail(data.email);
        setIsLogin(true);
        navigate("/home");
      }
    });
  }

  function onLogin({ email, password }) {
    return auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt-token", data.token);
          checkUserInfo();
        }
      })
      .catch(() => {
        infoTooltipErrSetIsOpened(true);
      });
  }

  function onRegister({ email, password }) {
    return auth
      .register(email, password)
      .then((data) => {
        if (data && data._id) {
          infoTooltipSetIsOpened(true);
        }
      })
      .catch(() => {
        infoTooltipErrSetIsOpened(true);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("jwt-token");
    setUserInfo();
    setIsLogin(false);
    navigate("/login");
    setEmail("");
  }

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header handleLogOut={handleLogOut} email={email} />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route
                path="/home"
                element={
                  <>
                    <Main
                      handleEditProfileClick={onEditProfileClick}
                      handleAddPlaceClick={onAddPlaceClick}
                      handleEditAvatarClick={onEditAvatarClick}
                    >
                      <div className="elements__cards">
                        {initialCards.map((card) => {
                          return (
                            <Card
                              card={card}
                              cardLikes={card.likes}
                              cardOwnerId={card.owner._id}
                              cardName={card.name}
                              cardImage={card.link}
                              cardCounter={card.likes.length}
                              key={card._id}
                              cardId={card._id}
                              handleDeleteClick={onDeleteCardClick}
                              handleCardClick={onImageCardClick}
                              handleCardLike={onCardLike}
                            ></Card>
                          );
                        })}
                      </div>
                    </Main>
                    <EditProfilePopup
                      title="Editar Perfil"
                      isOpen={isEditProfilePopupOpened}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />
                    <EditAvatarPopup
                      title="Cambiar foto de perfil"
                      isOpen={editAvatarPopupIsOpened}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />

                    <AddPlacePopup
                      title="Nuevo Lugar"
                      isOpen={addCardPopupIsOpened}
                      onClose={closeAllPopups}
                      onAddCard={handleAddPlaceSubmit}
                    />
                    <Popup
                      id="delete-popup"
                      title="¿Estás seguro/a?"
                      buttonName="Sí"
                      onSubmit={onCardDelete}
                      card={currentCard}
                      onClose={closeAllPopups}
                      isOpen={deleteCardPopupIsOpened}
                    />
                    <ImagePopup
                      id="popup_image"
                      name={currentCard.name}
                      link={currentCard.link}
                      isOpen={imageCardPopupIsOpened}
                      onClose={closeAllPopups}
                    />
                  </>
                }
              ></Route>
              <Route
                path="register"
                element={
                  <>
                    <Register onRegister={onRegister}>
                      <InfoTooltip
                        id="registro exitoso"
                        title="¡Correcto ya estás registrado.!"
                        alt="Registro exitoso"
                        img={successfulRegister}
                        onClose={closeAllPopups}
                        isOpen={infoTooltipIsOpened}
                      ></InfoTooltip>
                    </Register>
                  </>
                }
              ></Route>
              <Route
                path="/login"
                element={
                  <>
                    <Login onLogin={onLogin}>
                      <InfoTooltip
                        id="inicio de sesion fallido"
                        title="Uy, algo salió mal. Por favor, inténtalo de nuevo."
                        alt="Inicio de sesión fallido"
                        onClose={closeAllPopups}
                        isOpen={infoTooltipErrIsOpened}
                        img={errorLogin}
                      ></InfoTooltip>
                    </Login>
                  </>
                }
              ></Route>
            </Route>
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
