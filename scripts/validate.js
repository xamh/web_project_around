//*******-----------validadicon perfil----------**********/
export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!errorElement) return;
  
  inputElement.classList.add("form__input_type_error");
  errorElement.classList.add("form__input-error_active");
  errorElement.textContent = errorMessage;
};

export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!errorElement) return;
  
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

export const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (!buttonElement) return;
  
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_inactive");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button_save");

  if (!buttonElement) return;

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formElement = document.querySelector('form[name="form"]');
  if (!formElement) return;
  
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  setEventListeners(formElement);
};

//******Restablecer validación al cerrar modales******
export const resetValidation = (formElement) => {
  if (!formElement) return;
  
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button_save");

  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement)
  );
  
  if (buttonElement) {
    toggleButtonState(inputList, buttonElement);
  }
};

//*****-----------Validacion de imagenes del formulario------------**********/
const showInputErrorImg = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!errorElement) return;
  
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputErrorImg = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!errorElement) return;
  
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidityImg = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputErrorImg(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputErrorImg(formElement, inputElement);
  }
};

const hasInvalidInputImg = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonStateImg = (inputList, buttonElement) => {
  if (!buttonElement) return;
  
  if (hasInvalidInputImg(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.disabled = true; 
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false;
  }
};

const setEventListenersImg = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".form__input-img")
  );
  const buttonElement = formElement.querySelector(".popup__button_save");

  if (!buttonElement) return;

  toggleButtonStateImg(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidityImg(formElement, inputElement);
      toggleButtonStateImg(inputList, buttonElement);
    });
  });
};

export const enableValidationImg = () => {
  const formElement = document.querySelector('form[name="formImg"]');
  if (!formElement) return;
  
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  setEventListenersImg(formElement);
};

enableValidation();
enableValidationImg();