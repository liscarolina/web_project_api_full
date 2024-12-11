import React from "react";
import editProfileButtonLayover from "../images/edit-profile.svg";
import editProfileButtonIcon from "../images/profile-edit-button.svg";
import addCardButtonIcon from "../images/profile-add-button.svg";
import CurrentUserContext from "./contexts/CurrentUserContext";

function Main(props) {
  const CurrentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <img
            className="profile__avatar"
            src={CurrentUser?.avatar}
            alt="Imagen de Jacques Costeau"
            onClick={props.handleEditAvatarClick}
          />
          <img
            className="profile__layover"
            src={editProfileButtonLayover}
            alt="Editar"
          />
          <div className="profile__info">
            <h1 className="profile__name">{CurrentUser?.name}</h1>
            <h2 className="profile__description">{CurrentUser?.about}</h2>
          </div>
          <button
            className="profile__button profile__button_type_edit"
            type="button"
            id="edit-button"
            onClick={props.handleEditProfileClick}
          >
            <img
              className="profile__icon profile__icon_type_edit"
              src={editProfileButtonIcon}
              alt="Botón de editar"
            />
          </button>
        </div>
        <button
          className="profile__button profile__button_type_add"
          type="button"
          id="add-button"
          onClick={props.handleAddPlaceClick}
        >
          <img
            className="profile__icon profile__icon_type_add"
            src={addCardButtonIcon}
            alt="Botón de añadir"
          />
        </button>
      </section>
      <section className="elements">{props.children}</section>
    </main>
  );
}

export default Main;
