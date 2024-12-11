import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import CurrentUserContext from "./contexts/CurrentUserContext.jsx";
import { useState } from "react";

function EditProfilePopup({ onClose, isOpen, title, onUpdateUser }) {
  const [profileState, setProfileState] = useState({
    name: "",
    about: "",
  });
  const CurrentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (CurrentUser) {
      setProfileState({ name: CurrentUser.name, about: CurrentUser.about });
    }
  }, [CurrentUser]);

  const handleOnChangeInput = (evt) => {
    setProfileState((state) => ({
      ...state,
      [evt.target.name]: evt.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: profileState.name,
      about: profileState.about,
    });
  }

  return (
    <PopupWithForm
      id="profile"
      title={title}
      buttonName="Guardar"
      inputFirst={{
        type: "text",
        name: "name",
        placeholder: "Nombre",
        value: profileState.name,
      }}
      inputSecond={{
        type: "text",
        name: "about",
        placeholder: "Acerca de mí",
        value: profileState.about,
      }}
      onChangeInput={handleOnChangeInput}
      onUpdateUser={onUpdateUser}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    />
  );
}

export default EditProfilePopup;
