export default class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }

  _setEventListeners(formSelector) {
    let formItems = Array.from(formSelector.querySelectorAll(".popup__item"));
    let submitButtonSelector = formSelector.querySelector(
      ".popup__button_type_send"
    );
    this._toggleButtonState(formItems, submitButtonSelector);
    formItems.forEach((formItem) => {
      formItem.addEventListener("input", (evt) => {
        evt.preventDefault();
        if (!formItem.validity.valid) {
          this._showInputError(formSelector, formItem);
        } else {
          this._hideInputError(formSelector, formItem);
        }
        this._toggleButtonState(formItems, submitButtonSelector);
      });
    });
  }

  _showInputError(formSelector, formItem) {
    let formError = formSelector.querySelector(
      `.popup__error-${formItem.name}`
    );
    formError.textContent = formItem.validationMessage;
    formItem.classList.add("popup__item_invalid");
  }

  _hideInputError(formSelector, formItem) {
    let formError = formSelector.querySelector(
      `.popup__error-${formItem.name}`
    );
    formError.textContent = "";
    formItem.classList.remove("popup__item_invalid");
  }

  _toggleButtonState(formItems, submitButtonSelector) {
    if (this._hasInvalidInput(formItems)) {
      submitButtonSelector.classList.add("popup__button_type_send-inactive");
    } else {
      submitButtonSelector.classList.remove("popup__button_type_send-inactive");
    }
  }

  _hasInvalidInput(formItems) {
    return formItems.some((formItem) => {
      return !formItem.validity.valid;
    });
  }
}
