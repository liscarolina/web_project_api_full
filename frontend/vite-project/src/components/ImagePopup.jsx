import popupCloseIcon from "../images/popup-close-icon.svg";

function ImagePopup({ id, link, name, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={id}>
      <div className="popup__container popup__container-window">
        <button
          className="popup__button popup__button_type_close"
          type="button"
          id="window-close-button"
          onClick={onClose}
        >
          <img
            className="popup__icon popup__icon_type_close"
            src={popupCloseIcon}
            alt="Cerrar"
          />
        </button>
        <img
          className="popup__window-image"
          src={link}
          alt="imagen del lugar"
        />
        <h3 className="popup__window-name">{name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
