export class FormValidator {

  constructor(form, submitButton, errorMessages) {

    this.form = form;
    this.inputs = Array.from(this.form.querySelectorAll('.popup__input'));

    this.submitButton = submitButton;
    this.errorMessages = errorMessages;



    this.setEventListeners();
    this.clearError();
  }

  clearError = () => {
    this.form.querySelectorAll('.error').forEach(function (elem) {
      elem.textContent = '';
    });
  }


  checkInputValidity(input) {

    input.setCustomValidity("");


    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
      return false
    }


    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
      return false
    }


    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.errorMessages.wrongUrl);
      return false
    }


    return input.checkValidity();




  }

  isFormValid = () => {
    this.inputs.forEach((input) => {

      if (input.type !== 'submit' && input.type !== 'button') {

        input.parentNode.querySelector(`#${input.id}-error`).textContent = this.checkInputValidity(input) ? '' : input.validationMessage;



      }
    }
    )
  }



  setSubmitButtonState = (state) => {

    if (state) {

      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.add('popup__button_valid');
      this.submitButton.classList.remove('popup__button_invalid');

    } else {
      this.submitButton.setAttribute('disabled', '');
      this.submitButton.classList.add('popup__button_invalid');
      this.submitButton.classList.remove('popup__button_valid');
    }


  }


  handlerInputForm = (evt) => {
    this.isFormValid(evt.target);
    if (this.form.checkValidity()) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false)
    }
  }




  setEventListeners() {
    this.form.addEventListener('input', this.isFormValid);
    this.form.addEventListener('input', this.handlerInputForm, true);

  }

}
