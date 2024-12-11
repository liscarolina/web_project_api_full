import React from "react";
import Popup from "./Popup.jsx";
import { useRef } from "react";

function EditAvatarPopup({ title, onClose, isOpen, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: inputRef.current.value,
    });
  }

  return (
    <Popup
      id="avatar-popup"
      title={title}
      buttonName="Guardar"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onUpdateAvatar={onUpdateAvatar}
    >
      <input
        className="popup__item popup__item_type_about"
        id="link-input"
        type="url"
        name="link"
        ref={inputRef}
        placeholder="Enlace a la imagen"
        required
      />
      <span className="popup__error popup__error-link"></span>
    </Popup>
  );
}

export default EditAvatarPopup;
