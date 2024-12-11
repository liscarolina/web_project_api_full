import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

import { useState } from "react";

function AddPlacePopup({ title, onClose, isOpen, onAddCard }) {
  const [newPlaceState, setNewPlaceState] = useState({
    place: "",
    link: "",
  });

  const handleOnChangeInput = (evt) => {
    setNewPlaceState((state) => ({
      ...state,
      [evt.target.name]: evt.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: newPlaceState.place,
      link: newPlaceState.link,
    });
  }
  return (
    <PopupWithForm
      id="add-popup"
      title={title}
      buttonName="Guardar"
      inputFirst={{
        type: "text",
        name: "place",
        placeholder: "Título",
        value: newPlaceState.place,
      }}
      inputSecond={{
        type: "url",
        name: "link",
        placeholder: "Enlace a la imagen",
        value: newPlaceState.link,
      }}
      onChangeInput={handleOnChangeInput}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onAddCard={onAddCard}
    />
  );
}

export default AddPlacePopup;
